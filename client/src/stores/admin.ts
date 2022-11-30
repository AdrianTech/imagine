import { HttpRequester, Setup } from "@/interfaces/methods";
import { IProduct, Metas } from "@/interfaces/product";
import config from "@/resusables/config";
import { httpRequester } from "@/resusables/methods";
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
        navBar: false as boolean,
        deliveryOptions: [] as object[],
        metas: { links: {}, meta: {} } as Metas,
    }),

    actions: {
        async getProducts(query: string) {
            const store = useProductsStore();
            this.products = await store.getProducts(query);
        },
        async getOrders(setup: Setup) {
            try {
                const { data }: any = await httpRequester(setup);
                this.orders = data.data;
                this.metas.meta = data.meta;
                this.metas.links = data.links;
            } catch (error) {
                console.log(error);

            }
        },
        async updateOrder(setup: Setup) {
            try {
                const { data }: HttpRequester = await httpRequester(setup);
                return data;
            } catch (err) {
                console.log(err)
            }
        },
    }
})