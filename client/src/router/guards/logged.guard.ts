import { useAuthStore } from "@/stores/auth"
import { nextTick } from "vue";

export const loggedGuard = (to: any, from: any, next: any) => {
    const store = useAuthStore();
    return store.isLogged ? next() : next({ name: 'login' })
};