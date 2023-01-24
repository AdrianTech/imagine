import { defineStore } from 'pinia';
//@ts-ignore
import * as translations from "@/translations";

export const useTranslationStore = defineStore('translations', {
    state: () => ({ lang: 'pl' as string }),
    actions: {
        setLang() {
            this.lang = window.navigator.language === 'pl' ? 'pl' : 'en';
        },
        t(key: string) {
            return translations[this.lang][key]
        }
    }
})