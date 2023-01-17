import { defineStore } from 'pinia';
//@ts-ignore
import * as translations from "@/translations";
interface customWindow extends Window {
    setValue?: Function;
}
declare const window: customWindow;

export const useTranslationStore = defineStore('translations', {
    state: () => ({ lang: 'pl' as string }),

    actions: {
        setLang() {
            this.lang = window.navigator.language === 'pl' ? 'pl' : 'en';
            window.setValue = this.setValue;
        },

        setValue(key: string) {
            return translations[this.lang][key]
        }
    }
})