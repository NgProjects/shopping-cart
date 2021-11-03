import { 
  BeforeInsert, 
  BeforeUpdate, 
  Column, 
  CreateDateColumn, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn } from 'typeorm';

export abstract class BaseProjectEntity {

  @PrimaryGeneratedColumn({ name: 'ID' })
  public id: number;

  @Column({
    name: 'DELETED',
    nullable: false,
  })
  deleted: boolean;

  @UpdateDateColumn({
    name: 'LAST_MODIFIED',
    type: 'timestamp',
    nullable: false
  })
  lastModified: Date;

  @CreateDateColumn({
    name: 'CREATE_DATE',
    type: 'timestamp',
    nullable: false
  })
  createDate: Date;

  @Column({
    name: 'ACTIVE',
    nullable: false,
  })
  active: boolean;

  @BeforeInsert()
  setInitialValues = (): void => {
    this.active = true;
    this.deleted = false;
    this.createDate = new Date();
    this.lastModified = new Date();
  }

  @BeforeUpdate()
  setUpdatedValues = (): void => {
    this.lastModified = new Date();
  }
}
