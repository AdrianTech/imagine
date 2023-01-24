import { HttpRequester, Setup } from '@/interfaces/methods';
import { errorMessagesHelper, httpRequester } from '@/resusables/methods';
import { defineStore } from 'pinia';
import { useEventStore } from './event';
import { useTranslationStore } from './translation';
import Confirm from '@/components/commons/confirm/Confirm.vue';
import { createConfirmDialog } from 'vuejs-confirm-dialog'


export const useDeliveryStore = defineStore('delivery', {
    state: () => ({ deliveryOptions: [] as object[] }),

    actions: {
        async getAllDelivers(setup: Setup) {
            const { data }: HttpRequester = await httpRequester(setup);
            this.deliveryOptions = data || [];
        },
        async deliverAction(setup: Setup, id: number) {
            const { t } = useTranslationStore();
            const { reveal } = createConfirmDialog(Confirm, { question: t('Wykonać tę akcję?') });
            const { eventMessageHelper } = useEventStore();

            try {
                const { isCanceled } = await reveal();
                if (isCanceled) return;
                const { data }: HttpRequester = await httpRequester(setup);
                eventMessageHelper(t('Akcja powiodła się'));
                if (setup.method === 'delete') {
                    return this.deliveryOptions = this.deliveryOptions.filter((deliver: any) => deliver.id !== id)
                }
                if (setup.method === 'patch') {
                    return this.deliveryOptions = this.deliveryOptions.map((deliver: any) => deliver.id === id ? deliver = data : deliver) as any;
                }
                this.deliveryOptions.push(data || {});
                return true
            } catch (error: any) {
                const { statusCode } = error.response.data;
                errorMessagesHelper(statusCode);
            }
        }
    }
})