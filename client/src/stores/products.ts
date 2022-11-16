import { IProduct } from '@/interfaces/product';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useEventStore } from './event';
import config from '../resusables/config'

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
        async getProducts(query?: any): Promise<any> {
            const defaultQuery = "http://localhost:3000/products?page=1&limit=5&sortBy=createdAt:DESC";
            const store = useEventStore();
            store.loading = true;

            try {
                const { data: { data, links, meta } } = await axios(query ? query : defaultQuery);
                this.products = data
                this.metas.links = links;
                this.metas.meta = meta;
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