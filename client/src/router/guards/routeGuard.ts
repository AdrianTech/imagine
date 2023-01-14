import { ROLES } from "@/resusables/enums";
import { useAuthStore } from "@/stores/auth"
import { useEventStore } from "@/stores/event";

export const routeGuard = (to: any, from: any, next: any) => {
    const store = useAuthStore();
    const eventStore = useEventStore()

    if (!store.isLogged || store.user?.role !== ROLES.ADMIN && store.user?.role !== ROLES.MODERATOR) {
        console.log('here');


        eventStore.eventMessageHelper('Brak uprawnień')

        return next({ name: 'login' })
    }
    return next()
}