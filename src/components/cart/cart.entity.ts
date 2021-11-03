import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseProjectEntity } from "../base/base-project.entity";
import { Product } from "../product/entities/product.entity";
import { User } from "../user/user.entity";

@Entity({ name: 'CART' })
export class Cart extends BaseProjectEntity {

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'PRODUCT_FK', referencedColumnName: 'id' })
    product: Product;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'USER_FK', referencedColumnName: 'id' })
    user: User;

    @Column({ name: 'QUANTITY' })
    quantity: number;
}