import { DeliveryOption } from "src/admin/delivery-options/entities/delivery-option.entity";
import { Product } from "src/products/entities/product.entity";
import { DELIVERY } from "src/shared/variables/enums";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProductsDto } from "../dto/order-products.dto";

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    surname: string;

    @Column('text')
    city: string;

    @Column('text')
    voivodeship: string;

    @Column('text')
    phone: string;

    @Column('varchar')
    email: string;

    @Column('text')
    address: string;

    @Column('varchar')
    zipcode: string;

    @Column('bool', { default: false })
    finalized: boolean;

    @Column('date', { nullable: true })
    finalizationDate: Date;

    @Column('float', { default: 0.00 })
    totalPrice: number;

    @Column('int')
    totalItems: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('jsonb', { nullable: true })
    productsList: OrderProductsDto[];

    @ManyToOne(() => DeliveryOption, delivery => delivery.orders, { eager: true, onDelete: "SET NULL" })
    deliver: DeliveryOption
}
