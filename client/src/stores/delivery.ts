import { HttpRequester, Setup } from '@/interfaces/methods';
import { httpRequester } from '@/resusables/methods';
import { defineStore } from 'pinia';

export const useDeliveryStore = defineStore('delivery', {
    state: () => ({ deliveryOptions: [] as object[] }),

    actions: {
        async getAllDelivers(setup: Setup) {
            const { data }: HttpRequester = await httpRequester(setup);
            this.deliveryOptions = data || [];
        }
    }
})