import { defineStore } from 'pinia';

export const useEventStore = defineStore('main', {
    state: () => ({ eventMessage: "" as string, loading: false as boolean, errors: [] as Array<string> }),

    actions: {
        eventMessageHelper(msg: string) {
            this.eventMessage = msg;
            setTimeout(() => {
                this.eventMessage = "";
            }, 3000)
        },
    }
})