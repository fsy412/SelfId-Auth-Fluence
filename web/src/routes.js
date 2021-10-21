import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import("./views/Index.vue")
    },
    {
        path: "/admin",
        name: "Admin",
        component: () => import("./views/Permission.vue")
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;