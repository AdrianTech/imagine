import { Expose, Type } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../../orders/entities/order.entity";

@Entity()
export class DeliveryOption {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    price: number;

    @Column('text')
    @Expose()
    name: string;

    @Column('bool', { default: false })
    @Expose()
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Order, order => order.deliver, { onDelete: "SET NULL" })
    orders: Order[]
}
