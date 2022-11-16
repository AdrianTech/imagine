import { IProduct } from "./product";

export interface IUser {
    id: number,
    username: string,
    role: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    product?: IProduct
}