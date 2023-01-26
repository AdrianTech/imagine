import { HttpRequester, Setup } from "@/interfaces/methods";
import { IProduct, Metas } from "@/interfaces/product";
import { errorMessagesHelper, httpRequester } from "@/resusables/methods";
import { defineStore } from "pinia";
import { useEventStore } from "./event";
import { useTranslationStore } from "./translation";
import Confirm from '@/components/commons/confirm/Confirm.vue';
import { createConfirmDialog } from 'vuejs-confirm-dialog'

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
        async removeElement(setup: Setup, id: number | string, dataName: Params['storeData']) {
            const eventStore = useEventStore();
            const { t } = useTranslationStore()
            const dialog = createConfirmDialog(Confirm, { question: t("Wykonać tę akcję?") })
            const { isCanceled } = await dialog.reveal();
            if (isCanceled) return;
            try {
                const res: any = await httpRequester(setup);
                this[dataName] = this[dataName].filter((item: any) => item.id !== id) as any;
                eventStore.eventMessageHelper(t('Usunięto z zasobów'));

            } catch (error: any) {
                const { statusCode } = error.response.data;
                errorMessagesHelper(statusCode)

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
                const { statusCode } = error.response.data;
                errorMessagesHelper(statusCode)
                return false
            }
        },
        async getAll(setup: Setup, property: Params['storeData']) {
            try {
                const { data }: any = await httpRequester(setup);
                this[property] = data.data;
                this.metas.links = data.links;
                this.metas.meta = data.meta;
            } catch (error: any) {
                const { statusCode } = error.response.data;
                errorMessagesHelper(statusCode)
            }
        }
    },

})