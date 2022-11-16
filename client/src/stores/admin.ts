import { IProduct } from "@/interfaces/product";
import config from "@/resusables/config";
import axios from "axios";
import { defineStore } from "pinia";
import { useProductsStore } from "./products";

const instance = axios.create({
    withCredentials: true,
    baseURL: config.nestApiPath
})

export const useAdminStore = defineStore('admin', {
    state: () => ({
        products: [] as IProduct[],
        orders: [] as object[],
        navBar: false as boolean
    }),

    actions: {
        async getProducts(query: string) {
            const store = useProductsStore();
            this.products = await store.getProducts(query);
        },
        async getOrders() {
            try {
                const res = await instance.get(`${config.nestApiPath}/orders`);
                this.orders = res.data;
            } catch (error) {
                console.log(error);

            }
        }
    }
})