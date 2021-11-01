import { ProductCategory } from "src/components/product/entities/product-category.entity";
import { Product } from "src/components/product/entities/product.entity";
import { User } from "src/components/user/user.entity";
import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from 'bcrypt';

export class populateProducts1635719188205 implements MigrationInterface {

    salt: string = bcrypt.genSaltSync(10);

    public async up(queryRunner: QueryRunner): Promise<void> {

        const conn = queryRunner.connection;

        //Create product category
        const electronicCategory : ProductCategory = new ProductCategory();
        electronicCategory.name = 'ELECTRONICS'
        electronicCategory.description = 'All electronics gadgets eg laptops, phones etc'

        const foodCategory : ProductCategory = new ProductCategory();
        foodCategory.name = 'FOOD'
        foodCategory.description = 'All types of food eg Amala, Rice etc'

        await conn
            .createQueryBuilder()
            .insert()
            .into(ProductCategory)
            .values([electronicCategory, foodCategory])
            .execute();

        //Create product
        const foodProduct : Product = new Product();
        foodProduct.name = 'Potato chips';
        foodProduct.description = 'Very delicious Potato chips';
        foodProduct.imageUrl = 'https://potatoimage.png';
        foodProduct.price = 5000;
        foodProduct.productCategory = foodCategory;
        foodProduct.availableQuantity = 10;
        foodProduct.sku = '427872872728';
        foodProduct.expiryDate = new Date();

        const foodProduct2 : Product = new Product();
        foodProduct2.name = 'Rice';
        foodProduct2.description = 'Very delicious Rice';
        foodProduct2.imageUrl = 'https://riceimage.png';
        foodProduct2.price = 5000;
        foodProduct2.productCategory = foodCategory;
        foodProduct2.availableQuantity = 10;
        foodProduct2.sku = '327828728728';
        foodProduct2.expiryDate = new Date();

        const laptop : Product = new Product();
        laptop.name = 'MacBook Pro';
        laptop.description = 'Brand new Macbook pro';
        laptop.imageUrl = 'https://macbook.png';
        laptop.price = 10000;
        laptop.productCategory = electronicCategory;
        laptop.availableQuantity = 10;
        laptop.sku = '6127872872308';
        laptop.expiryDate = new Date();

        const iphone : Product = new Product();
        iphone.name = 'Iphone';
        iphone.description = 'Brand new Macbook pro';
        iphone.imageUrl = 'https://macbook.png';
        iphone.price = 10000;
        iphone.productCategory = electronicCategory;
        iphone.availableQuantity = 10;
        iphone.sku = '61278728728728';
        iphone.expiryDate = new Date();
        
        await conn
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values([foodProduct, foodProduct2, laptop, iphone])
        .execute();

        //Create first user
        const firstUser: User = new User();
        firstUser.emailAddress = 'test@email.com';
        firstUser.fullName = 'Test User';
        firstUser.phoneNumber = '+2345673877887';
        firstUser.password = bcrypt.hashSync('password', this.salt);

        await conn
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([firstUser])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
