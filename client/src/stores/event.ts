import { defineStore } from 'pinia';

export const useEventStore = defineStore('main', {
    state: () => ({ eventMessage: "" as string, isError: false as boolean, errors: [] as Array<string> }),

    actions: {
        eventMessageHelper(msg: string, error?: boolean) {
            this.eventMessage = msg;
            if (error) this.isError = true;
            // console.log(this.isError);

            setTimeout(() => {
                this.eventMessage = "";
                this.isError = false;
            }, 3000)
        },
    }
})