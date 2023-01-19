import { HttpRequester, Setup } from '@/interfaces/methods';
import { httpRequester } from '@/resusables/methods';
import { defineStore } from 'pinia';
import { useEventStore } from './event';
import { useTranslationStore } from './translation';

export const useDeliveryStore = defineStore('delivery', {
    state: () => ({ deliveryOptions: [] as object[] }),

    actions: {
        async getAllDelivers(setup: Setup) {
            const { data }: HttpRequester = await httpRequester(setup);
            this.deliveryOptions = data || [];
        },
        async deliverAction(setup: Setup, id: number) {
            const { setValue } = useTranslationStore();
            const { eventMessageHelper } = useEventStore();
            try {
                const { data }: HttpRequester = await httpRequester(setup);
                eventMessageHelper(setValue('Akcja powiodła się'));
                if (setup.method === 'delete') {
                    return this.deliveryOptions = this.deliveryOptions.filter((deliver: any) => deliver.id !== id)
                }
                if (setup.method === 'patch') {
                    return this.deliveryOptions = this.deliveryOptions.map((deliver: any) => deliver.id === id ? deliver = data : deliver) as any;
                }
                this.deliveryOptions.push(data || {});
                return true
            } catch (error) {
                return false
            }
        }
    }
})