import { Exclude } from "class-transformer";
import { BaseProjectEntity } from "../../components/base/base-project.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'USER' })
export class User extends BaseProjectEntity {

    @Column({ nullable: false, unique: true, name: 'EMAIL_ADDRESS' })
    emailAddress: string;

    @Column({ nullable: false, name: 'PHONE_NUMBER' })
    phoneNumber: string;

    @Exclude({ toPlainOnly: true })
    @Column({ name: 'PASSWORD' })
    password: string;

    @Column({ nullable: false, name: 'FULL_NAME' })
    fullName: string;
}