import { RouteRecordRaw } from "vue-router";
import { routeGuard } from "./guards/routeGuard";
import AdminProducts from "@/views/Admin/AdminProducts.vue";
import Orders from "@/views/Admin/Orders.vue";
import Users from "@/views/Admin/Users.vue";
import Delivery from "@/views/Admin/Delivery.vue";
import OrderDetails from "@/components/admin/oders/OrderDetails.vue";


export const admin: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        meta: { access: 'admin' },
        beforeEnter: [routeGuard],
        redirect: { name: 'orders' },
        children: [
            {
                path: '/',
                name: 'admin',
                redirect: { name: 'orders' },
            },
            {
                path: 'zamowienia',
                name: 'orders',
                component: Orders,
            },
            {
                path: 'zamowienia/:id',
                name: 'orderDetails',
                component: OrderDetails,
                props: true,
            },
            {
                path: 'produkty',
                name: "adminProducts",
                component: AdminProducts,
            },
            {
                path: 'uzytkownicy',
                name: "adminUsers",
                component: Users,
            },
            {
                path: 'delivery',
                name: "delivery",
                component: Delivery,
            },

        ],
    },
]