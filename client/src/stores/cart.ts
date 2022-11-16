import { IProduct } from '@/interfaces/product';
import { IOrder } from '@/interfaces/stores/cart';
import config from '@/resusables/config';
import { getItem, setItem } from '@/resusables/localStorages';
import { dialog } from '@/resusables/methods';
import axios from 'axios';
import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { useEventStore } from './event';

export const useCartStore = defineStore('cart', {
    state: () => ({ cart: JSON.parse(localStorage.getItem('cart') || "[]") as IProduct[] }),

    getters: {
        cartTotalSum: ({ cart }) => (
            cart.reduce((acc, curr) => {
                if (curr.isPromotion) {
                    return acc = acc + curr.discount_price * curr.quantity!
                }
                return acc = acc + curr.price * curr.quantity!
            }, 0)
        )
    },

    actions: {
        addToCart(product: any): void {
            const filtered: IProduct[] = this.getAndFilter(product.id);
            product.quantity = 1;
            !product.isPromotion && delete product.discount_price;
            filtered.push(product)
            setItem('cart', filtered);
            this.cart = filtered;
        },

        updateCart(quantity: Ref<number>, index: number): void {
            this.cart[index].quantity = +quantity;
            setItem('cart', this.cart);
        },

        removeFromCart(id: number | string) {
            const filtered: IProduct[] = this.getAndFilter(id)
            setItem('cart', filtered);
            this.cart = filtered;
        },

        getAndFilter(id: number | string) {
            const cart: IProduct[] = getItem('cart');
            return cart.filter((item: any) => item.id !== id);
        },

        async orderComplete({ name, surname, zipcode, deliveryOption, totalPrice, cart, city, phone, voivodeship, email, address }: IOrder) {

            try {

                const totalItems: number = this.cart.reduce((acc, current) => acc + current.quantity, 0)
                const res = await axios.post(`${config.nestApiPath}/orders`, {
                    name, surname, zipcode, city, phone, voivodeship, deliveryOption, totalPrice, productsList: cart, email, address, totalItems
                })

            } catch ({ response: { data: { message } } }) {
                const store = useEventStore();
                store.errors = message as any;
                dialog(true, 'errors');

            }
        }
    }
})