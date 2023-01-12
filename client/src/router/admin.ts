import { RouteRecordRaw } from "vue-router";
import { routeGuard } from "./guards/routeGuard";
import AdminProducts from "@/views/Admin/AdminProducts.vue";
import Orders from "@/views/Admin/Orders.vue";
import Users from "@/views/Admin/Users.vue";
// import CreateEdit from "@/components/admin/CreateEdit.vue";
import OrderDetails from "@/components/admin/oders/OrderDetails.vue";


export const admin: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        meta: { access: 'admin' },
        children: [
            {
                path: '/',
                name: 'admin',
                redirect: { name: 'orders' },
                // beforeEnter: [routeGuard]
            },
            {
                path: 'zamowienia',
                name: 'orders',
                component: Orders,
                beforeEnter: [routeGuard]
            },
            {
                path: 'zamowienia/:id',
                name: 'orderDetails',
                component: OrderDetails,
                props: true,
                beforeEnter: [routeGuard]
            },
            {
                path: 'produkty',
                name: "adminProducts",
                component: AdminProducts,
                beforeEnter: [routeGuard]
            },
            {
                path: 'uzytkownicy',
                name: "adminUsers",
                component: Users,
                beforeEnter: [routeGuard]
            },
            // {
            //     path: 'akcja/:type/:name',
            //     name: "adminCreateEdit",
            //     component: CreateEdit,
            //     beforeEnter: [routeGuard]
            // },

        ],
    },
    // {
    //     path: '/admin/produkty',
    //     name: "adminProducts",
    //     component: AdminProducts,
    //     beforeEnter: [routeGuard]
    // },


]