import { OrderProductsDto } from "./dto/order-products.dto";

export interface IproductListHandle {
    purchases: OrderProductsDto[],
    totalPrice: number,
    totalItems: number
}