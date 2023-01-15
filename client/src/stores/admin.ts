import { HttpRequester, Setup } from "@/interfaces/methods";
import { IProduct, Metas } from "@/interfaces/product";
import { httpRequester } from "@/resusables/methods";
import { defineStore } from "pinia";
import { useEventStore } from "./event";
import { useProductsStore } from "./products";

type Params = {
    storeData: 'products' | 'orders' | 'users';
}

export const useAdminStore = defineStore('admin', {
    state: () => ({
        products: [] as IProduct[],
        orders: [] as object[],
        navBar: false as boolean,
        deliveryOptions: [] as object[],
        users: [],
        metas: { links: {}, meta: {} } as Metas,
    }),

    actions: {
        async getProducts(setup: Setup) {
            const store = useProductsStore();
            const data = await store.getProducts(setup);
            this.products = data.data;
            this.metas.links = data.links;
            this.metas.meta = data.meta;
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
        async removeElement(setup: Setup, id: number | string, dataName: Params['storeData']) {
            const eventStore = useEventStore();
            try {
                const res: any = await httpRequester(setup);
                this[dataName] = this[dataName].filter((item: any) => item.id !== id) as any;
                eventStore.eventMessageHelper('Użytkownik usunięty');

            } catch (error) {
                console.log(error);

            }
        },
        async createOrUpdate(setup: Setup, dataName: Params['storeData'], id?: string | number) {
            try {
                const res: any = await httpRequester(setup);
                if (setup.method === 'put' || setup.method === 'patch') {
                    this[dataName] = this[dataName].map((item: any) => item.id === id ? item = res.data : item) as any;
                }
                //@ts-ignore
                else this[dataName].push(res.data);
                return true
            } catch (error: any) {
                const { message } = error.response.data;
                const eventStore = useEventStore();
                eventStore.eventMessageHelper(message)
                return false
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
        async getAll(setup: Setup, property: Params['storeData']) {
            try {
                const { data }: any = await httpRequester(setup);
                this[property] = data.hasOwnProperty('data') ? data.data : data;
                this.metas.links = data.links;
                this.metas.meta = data.meta;
            } catch (err) {
                console.log(err)
            }
        }
    },

})