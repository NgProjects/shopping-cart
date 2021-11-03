import { Test, TestingModule } from '@nestjs/testing';
import { PageRequest } from '../../components/pagination/page.request';
import { ProductMapper } from '../../components/product/mapper/product.mapper';
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
    findOne: (): any => entityMock,
    find: (): any => []
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService,ProductRepository,ProductMapper]
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

  let samplePageRequest : PageRequest  = {
    page : 0,
    size : 10
  }

  it("should retrieve available products", async () => {
    jest.spyOn(repositoryMock, "find");

    await service.getAllProducts(samplePageRequest);
    expect(repositoryMock.find).toHaveBeenCalled();
  });
  
});
