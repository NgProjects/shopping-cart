import { BaseProjectEntity } from "src/components/base/base-project.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'PRODUCT_CATEGORY' })
export class ProductCategory extends BaseProjectEntity {

    @Column({ name: 'NAME' })
    name: string;

    @Column({ name: 'DESCRIPTION' })
    description: string;

}