import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ROLES } from '../../shared/variables/enums';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        type: "enum",
        enum: ROLES,
        default: ROLES.User
    })
    role: ROLES

    @Column()
    password: string;

    @Column({ unique: true })
    email: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    productId: number

    @OneToMany(() => Product, product => product.user, { eager: true })
    products: Product[]
}
