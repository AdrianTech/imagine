import { IUser } from "./user";

export interface IProduct {
    id: number,
    description: string,
    gallery: string[],
    price: number,
    title: string,
    discount_price: number,
    discount_start: string,
    discount_end: string;
    dimension_x: string;
    dimension_y: string;
    isAvailable: boolean;
    base: string;
    production_year: Date;
    isPromotion: boolean;
    quantity: number;
    style: string;
    technique: string;
    createdAt: Date,
    updatedAt: Date;
    userId?: number
    user?: IUser | null,
}

export interface Metas {
    meta: object;
    links: object;
}