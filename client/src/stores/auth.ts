import { IAuth } from "@/interfaces/stores/auth";
import axios from "axios";
import { defineStore } from "pinia";
import { useEventStore } from "./event";
import config from '../resusables/config'

const instance = axios.create({
    withCredentials: true,
    baseURL: config.nestApiPath,
})

export const useAuthStore = defineStore('auth', {
    state: (): IAuth => ({
        isLogged: false,
        user: null,
    }),
    actions: {
        async users() {
            try {
                const res = await axios.get('http://localhost:3000/users', { withCredentials: true });
            } catch (err) {

            }
        },
        async login(email: string, password: string, remember: boolean): Promise<boolean> {
            const event = useEventStore();
            try {
                const res = await axios.post('http://localhost:3000/users/login', {
                    password,
                    email
                }, {
                    withCredentials: true
                })
                if (remember) this.setRemember();
                this.isLogged = true;
                this.user = res.data;
                return true;
            } catch (err) {
                event.eventMessageHelper('Something went wrong')
                return false
            }
        },
        logout() {
            const event = useEventStore();
            try {
                instance.get('/users/logout')
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