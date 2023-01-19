import { IProduct } from '@/interfaces/product';
import { IOrder } from '@/interfaces/stores/cart';
import config from '@/resusables/config';
import { getItem, setItem } from '@/resusables/localStorages';
import { dialog } from '@/resusables/methods';
import axios from 'axios';
import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { useEventStore } from './event';
import { useTranslationStore } from './translation';

export const useCartStore = defineStore('cart', {
    state: () => ({ cart: JSON.parse(localStorage.getItem('cart') || "[]") as IProduct[], message: useEventStore().eventMessageHelper, t: useTranslationStore().t }),

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
            const cart: IProduct[] = getItem('cart');
            if (cart.some((item: IProduct) => product.id === item.id)) return this.message(this.t('Już dodano do koszyka'));
            product.quantity = 1;
            !product.isPromotion && delete product.discount_price;
            cart.push(product)
            setItem('cart', cart);
            this.cart = cart;
            this.message(this.t('Dodano do koszyka'))
        },

        updateCart(quantity: Ref<number>, index: number): void {
            this.cart[index].quantity = +quantity;
            setItem('cart', this.cart);
        },

        removeFromCart(id: number | string) {
            const filtered: IProduct[] = this.getAndFilter(id)
            setItem('cart', filtered);
            this.cart = filtered;
            useEventStore().eventMessageHelper(this.t('Usunięto z koszyka'))
        },

        getAndFilter(id: number | string) {
            const cart: IProduct[] = getItem('cart');
            return cart.filter((item: any) => item.id !== id);
        },

        async orderComplete({ name, surname, zipcode, deliveryOption, totalPrice, cart, city, phone, voivodeship, email, address }: IOrder) {

            try {

                const totalItems: number = this.cart.reduce((acc, current) => acc + current.quantity, 0)
                const res = await axios.post(`${config.nestApiPath}/orders`, {
                    name, surname, zipcode, city, phone, voivodeship, deliver: deliveryOption, totalPrice, productsList: cart, email, address, totalItems
                })
                this.cart = [];
                localStorage.removeItem('cart');
                return true
            } catch ({ response: { data: { message } } }) {
                const store = useEventStore();
                store.errors = message as any;
                dialog(true, 'errors');
                return false
            }
        }
    }
})