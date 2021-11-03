import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../../components/product/entities/product.entity';
import { ProductRepository } from '../../components/product/product.repository';
import { ProductService } from '../../components/product/product.service';

describe('ProductService', () => {
  let service: ProductService;
   //Mock product
   const entityMock : Product = new Product();
   entityMock.id = 12345;
   entityMock.name = 'Rice';
   entityMock.price = 300;

  const repositoryMock = {
    findOne: (): any => entityMock
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService,ProductRepository]
    })
    .overrideProvider(ProductRepository)
    .useValue(repositoryMock)
    .compile();

    service = module.get<ProductService>(ProductService);
  });

  it("should find product by id", async () => {
    jest.spyOn(repositoryMock, "findOne");

    expect(await service.getProductById(entityMock.id)).toBe(entityMock);
    expect(repositoryMock.findOne).toHaveBeenCalled();
  });
  
});
