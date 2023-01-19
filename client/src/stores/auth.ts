import { IAuth } from "@/interfaces/stores/auth";
import axios from "axios";
import { defineStore } from "pinia";
import { useEventStore } from "./event";
import config from '../resusables/config'
import { IUser } from "@/interfaces/user";
import { useTranslationStore } from "./translation";

const instance = axios.create({
    withCredentials: true,
    baseURL: config.nestApiPath,
})

export const useAuthStore = defineStore('auth', {
    state: (): IAuth => ({
        isLogged: false,
        user: {} as IUser,
    }),
    actions: {
        async login(email: string, password: string, remember: boolean): Promise<boolean> {
            const event = useEventStore();
            const { t } = useTranslationStore()
            try {
                const res = await axios.post(`${config.nestApiPath}/users/login`, {
                    password,
                    email
                }, {
                    withCredentials: true
                })
                if (remember) this.setRemember();
                this.isLogged = true;
                this.user = res.data;
                event.eventMessageHelper(t('Logowanie powiodło się'));
                return true;
            } catch (err: any) {
                const status: string = err.response.status === 401 ? 'Nieprawidłowe hasło lub email' : 'Coś poszło nie tak';
                event.eventMessageHelper(t(status), true)
                return false
            }
        },
        logout() {
            const event = useEventStore();
            try {
                instance.get('/users/logout', { withCredentials: true })
                this.deleteRemember();
                this.isLogged = false;
                this.user = null;

            } catch (err) {
                event.eventMessageHelper('Coś poszło nie tak')
            }
        },
        /**
         * Get request it's invoke every time when function getRemember return true
         */
        async rememberLogin() {

            try {
                const res = await instance.get('/auth/login');
                this.isLogged = true;
                this.user = res.data;
            } catch (err) {

            }
        },
        setRemember(): void {
            localStorage.setItem('remember', '1');
        },

        deleteRemember(): void {
            localStorage.removeItem('remember')
        },

        getRemember: () => localStorage.getItem('remember') === '1' ? true : false,
    }
})