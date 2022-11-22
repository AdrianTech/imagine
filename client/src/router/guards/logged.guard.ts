import { useAuthStore } from "@/stores/auth"

export const loggedGuard = (to: any, from: any, next: any) => {
    const store = useAuthStore();
    return store.isLogged ? next() : next({ name: 'login' })
};