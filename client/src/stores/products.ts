import { IProduct } from '@/interfaces/product';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useEventStore } from './event';
import config from '../resusables/config'
import { httpRequester } from '@/resusables/methods';
import { Setup } from '@/interfaces/methods';

const httClient = axios.create({
    baseURL: config.nestApiPath
})

export const useProductsStore = defineStore('products', {
    state: () => ({ products: [] as Array<IProduct>, metas: { meta: {}, links: {} } }),

    actions: {
        removeFirstImage(images: string[]): string[] {
            const arrayCopy = [...images];
            arrayCopy.shift();
            return arrayCopy;
        },
        async getProducts(setup: Setup): Promise<any> {
            try {
                const { data }: any = await httpRequester(setup);
                this.products = data.data
                this.metas.links = data.links;
                this.metas.meta = data.meta;
                return data;
            } catch (error) {
                const eventStore = useEventStore();
                eventStore.eventMessageHelper('Something went wrong')
            }
        },

        getSingleProductFromStore(productID: number): IProduct {
            return this.products.find(({ id }: IProduct) => id === productID) as IProduct
        },

        async getSingleProduct(id: number): Promise<any> {
            try {
                let product = this.getSingleProductFromStore(id);
                if (!product) {
                    const res = await httClient.get(`/products/${id}`);
                    product = res.data;
                }
                return product;
            } catch (error) {
                const eventStore = useEventStore();
                eventStore.eventMessageHelper('Something went wrong')
            }
        }
    }
})