import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expose } from "class-transformer";
import { Order } from "src/orders/entities/order.entity";
import Helpers from '../../shared/classes/Helpers'

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('text', { array: true, nullable: true })
    gallery: string[];

    @Column('float')
    price: number;

    @Column('float', { nullable: true })
    discount_price: number;

    @Column('date', { nullable: true })
    discount_start: Date;

    @Column('date', { nullable: true })
    discount_end: Date;

    @Column()
    dimension_x: number;

    @Column()
    dimension_y: number;

    @Column()
    production_year: string

    @Column({ default: true })
    isAvailable: boolean;

    @Column()
    technique: string;

    @Column()
    style: string;

    @Column()
    base: string;

    @Column({ select: false, update: false })
    userId: number

    @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Expose()
    get isPromotion(): boolean {
        return Helpers.checkIfPromotion(this.discount_start, this.discount_end)
    }
}
