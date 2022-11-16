import { RouteRecordRaw } from "vue-router";
import { routeGuard } from "./guards/routeGuard";
import AdminProducts from "@/views/Admin/AdminProducts.vue";
import Orders from "@/views/Admin/Orders.vue";
import OrderDetails from "@/components/admin/oders/OrderDetails.vue";


export const admin: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        // name: "admin",
        // component: Admin,
        beforeEnter: [routeGuard],
        meta: { access: 'admin' },
        children: [
            {
                path: '',
                name: 'admin',
                redirect: { name: 'orders' }
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
                props: true
            },
            {
                path: 'produkty',
                name: "adminProducts",
                component: AdminProducts,
                // beforeEnter: [routeGuard]
            },

        ],
    },
    // {
    //     path: '/admin/produkty',
    //     name: "adminProducts",
    //     component: AdminProducts,
    //     beforeEnter: [routeGuard]
    // },


]