import { Test, TestingModule } from '@nestjs/testing';
import { CartMapper } from '../../components/cart/mapper/cart.mapper';
import { CartRepository } from '../../components/cart/cart.repository';
import { CartService } from '../../components/cart/cart.service';
import { ProductRepository } from '../../components/product/product.repository';
import { ProductService } from '../../components/product/product.service';
import { ProductMapper } from '../../components/product/mapper/product.mapper';
import { AddToCartRequest } from '../../components/cart/dto/cart-request.dto';
import { ApiError } from '../../components/errors/APIError';
import { CartItemCountUpdateDto } from '../../components/cart/dto/item-count-update.dto';
import { User } from '../../components/user/user.entity';
import { Product } from '../../components/product/entities/product.entity';
import { Cart } from '../../components/cart/cart.entity';

describe('CartService', () => {
  let service: CartService;

  //mocks
  const productQuantity = 6;

  //Mock user
  const mockUser: User = new User();
  mockUser.id = 1;
  mockUser.emailAddress= 'test@email.com';
  mockUser.phoneNumber= '+234544441234';
  mockUser.fullName= 'Full Name';

  //Mock product
  const productMock : Product = new Product();
  productMock.id = 1;
  productMock.name = 'Rice';
  productMock.price = 300;

  //Mock cart entry
  const cartEntryMock = new Cart();
  cartEntryMock.id = 1;
  cartEntryMock.product = productMock;
  cartEntryMock.quantity = productQuantity;

  //Sample request body
  let testAddToCart: AddToCartRequest = {
      productId : 1,
      quantity: productQuantity
  };
  //mocks
  
  describe('Test Add to cart', () => {
    //Test case 1
    describe('Test that product is added to cart successfully When product entity exists and product has not been added to cart before', () => {

        let entityList = [];

        const cartRepositoryMock = {
          findOne: (): any => null,
          save: (entity: any): any => {
            entityList.push(entity);
            return entity;
          },
          find: (): any => [cartEntryMock]
        };

        //mock product service
        const productServiceMock = {
            getProductById: (): any => productMock
        };

        beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
            providers: [
              CartService,
              CartRepository,
              ProductService,
              CartMapper,
              ProductRepository,
              ProductMapper]
          })
          .overrideProvider(CartRepository)
          .useValue(cartRepositoryMock)
          .overrideProvider(ProductService)
          .useValue(productServiceMock)
          .compile();

          service = module.get<CartService>(CartService);
        });

        it("should successfully add product to cart", async () => {
          jest.spyOn(productServiceMock, "getProductById");
          jest.spyOn(cartRepositoryMock, "find");
          jest.spyOn(cartRepositoryMock, "save");
          
          const result = await service.addToCart(testAddToCart, mockUser);
          expect(result.cartItems).toHaveLength(1);
          expect(result.cartItems[0].product.price).toBe(productMock.price);
          expect(result.totalAmount).toBe(productMock.price * productQuantity);
          expect(entityList).toHaveLength(1);

          expect(cartRepositoryMock.find).toHaveBeenCalled();
          expect(cartRepositoryMock.save).toHaveBeenCalled();
          expect(productServiceMock.getProductById).toHaveBeenCalled();
        });
        
      });

      //Test case 2
      describe('Test that an error is thrown when product has been added to cart before', () => {

        const cartRepositoryMock = {
          findOne: (): any => cartEntryMock,
          find: (): any => [cartEntryMock]
        };

        //mock product service
        const productServiceMock = {
            getProductById: (): any => productMock
        };

        beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
            providers: [
              CartService,
              CartRepository,
              ProductService,
              CartMapper,
              ProductRepository,
              ProductMapper]
          })
          .overrideProvider(CartRepository)
          .useValue(cartRepositoryMock)
          .overrideProvider(ProductService)
          .useValue(productServiceMock)
          .compile();
      
          service = module.get<CartService>(CartService);
        });

        it("should throw when product already exists in cart", async () => {
          jest.spyOn(productServiceMock, "getProductById");

          expect(service.addToCart(testAddToCart, mockUser)).rejects.toThrowError(ApiError);
          expect(productServiceMock.getProductById).toHaveBeenCalled();
        });
        
      });

      //Test case 3
      describe('Test that an error is thrown when the product does not exist', () => {

        const cartRepositoryMock = {
          findOne: (): any => cartEntryMock,
          find: (): any => [cartEntryMock]
        };

        //mock product service
        const productServiceMock = {
            getProductById: (): any => null
        };

        beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
            providers: [
              CartService,
              CartRepository,
              ProductService,
              CartMapper,
              ProductRepository,
              ProductMapper]
          })
          .overrideProvider(CartRepository)
          .useValue(cartRepositoryMock)
          .overrideProvider(ProductService)
          .useValue(productServiceMock)
          .compile();
      
          service = module.get<CartService>(CartService);
        });

        it("should throw when the product does not exist", async () => {
          jest.spyOn(productServiceMock, "getProductById");

          expect(service.addToCart(testAddToCart, mockUser)).rejects.toThrowError(ApiError);
          expect(productServiceMock.getProductById).toHaveBeenCalled();
        });
        
      });
  });

  describe('Test Get all cart Items', () => {

    //Test case 4
    describe('should return valid list of cart items', () => {

      const cartRepositoryMock = {
        find: (): any => [cartEntryMock]
      };

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            CartService,
            CartRepository,
            ProductService,
            CartMapper,
            ProductRepository,
            ProductMapper]
        })
        .overrideProvider(CartRepository)
        .useValue(cartRepositoryMock)
        .compile();

        service = module.get<CartService>(CartService);
      });

      it("should return valid list of cart items", async () => {
        jest.spyOn(cartRepositoryMock, "find");
        
        const result = await service.getAllCartItems(mockUser);
        expect(result.cartItems).toHaveLength(1);
        expect( result.cartItems[0].product.price).toBe(productMock.price);
        expect(result.totalAmount).toBe(productMock.price * productQuantity);

        expect(cartRepositoryMock.find).toHaveBeenCalled();
      });
      
    });

    //Test case 5
    describe('should return empty list when user does not have any cart item', () => {

      const cartRepositoryMock = {
        find: (): any => []
      };

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            CartService,
            CartRepository,
            ProductService,
            CartMapper,
            ProductRepository,
            ProductMapper]
        })
        .overrideProvider(CartRepository)
        .useValue(cartRepositoryMock)
        .compile();

        service = module.get<CartService>(CartService);
      });

      it("Should return empty list", async () => {
        jest.spyOn(cartRepositoryMock, "find");
        
        const result = await service.getAllCartItems(mockUser);
        expect(result.cartItems).toHaveLength(0);

        expect(cartRepositoryMock.find).toHaveBeenCalled();
      });
      
    });
  });

  describe('Test remove cart item', () => {

    //Test case 6
    describe('test that the deleted is set to true', () => {

      const deleteProductMock = new Product()
      deleteProductMock.id = 1;

      let entityList = [];

      const cartRepositoryMock = {
        findOne: (): any => deleteProductMock,
        find: (): any => [],
        save: (entity: any): any => {
          entityList.push(entity);
          return entity;
        },
      };

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            CartService,
            CartRepository,
            ProductService,
            CartMapper,
            ProductRepository,
            ProductMapper
          ]
        })
        .overrideProvider(CartRepository)
        .useValue(cartRepositoryMock)
        .compile();

        service = module.get<CartService>(CartService);
      });

      it("should set item deleted to true", async () => {
        jest.spyOn(cartRepositoryMock, "findOne");
        jest.spyOn(cartRepositoryMock, "find");
        
        await service.removeCartItem(mockUser,cartEntryMock.id);
        expect( entityList[0].deleted).toBe(true);

        expect(cartRepositoryMock.findOne).toHaveBeenCalled();
        expect(cartRepositoryMock.find).toHaveBeenCalled();
      });
      
    });

  });

  describe('Test update cart item', () => {

    //Test case 7
    describe('Test update cart item', () => {

      let newProductQuantity = 15;

      const updateProductMock = new Product()
      updateProductMock.id = 1;

      let updateProductDto: CartItemCountUpdateDto = {
        productCount: newProductQuantity
      };

      let entityList = [];

      const cartRepositoryMock = {
        findOne: (): any => updateProductMock,
        find: (): any => [],
        save: (entity: any): any => {
          entityList.push(entity);
          return entity;
        },
      };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            CartService,
            CartRepository,
            ProductService,
            CartMapper,
            ProductRepository,
            ProductMapper
          ]
        })
        .overrideProvider(CartRepository)
        .useValue(cartRepositoryMock)
        .compile();

        service = module.get<CartService>(CartService);
      });

      it("should update cart item count", async () => {
        jest.spyOn(cartRepositoryMock, "findOne");
        jest.spyOn(cartRepositoryMock, "find");
        
        await service.updateProductCount(mockUser,cartEntryMock.id,updateProductDto);
        expect( entityList[0].quantity).toBe(newProductQuantity);

        expect(cartRepositoryMock.findOne).toHaveBeenCalled();
        expect(cartRepositoryMock.find).toHaveBeenCalled();
      });
      
    });

  });
  
});
