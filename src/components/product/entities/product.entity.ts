import { BaseProjectEntity } from "../../../components/base/base-project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductCategory } from "./product-category.entity";

@Entity({ name: 'PRODUCT' })
export class Product extends BaseProjectEntity {

    @Column({ name: 'NAME' , unique: true})
    name: string;

    @Column({ name: 'IMAGE_URL' })
    imageUrl: string;

    @Column({ name: 'DESCRIPTION' })
    description: string;

    @Column({ name: 'PRICE' })
    price: number;

    @ManyToOne(() => ProductCategory)
    @JoinColumn({ name: 'PRODUCT_CATEGORY_FK', referencedColumnName: 'id' })
    productCategory: ProductCategory;

    @Column({
        name: 'EXPIRY_DATE',
        nullable: false
      })
    expiryDate: Date;

    @Column({ 
        name: 'AVAILABLE_STOCK' , 
        nullable: false
    })
    availableQuantity: number;

    @Column({ 
        name: 'SKU' , 
        nullable: false,
        unique: true
    })
    sku: string;
}