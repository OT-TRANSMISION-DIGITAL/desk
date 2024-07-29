// Configurar Router de Vue
import { createWebHistory, createRouter, useRouter, createWebHashHistory } from "vue-router";
import { verifyToken } from "./guards/ValidateSession.js";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./Pages/Home.vue"),
        children: [
            {
                path: "/",
                name: "Dashboard",
                components:{
                    default: () => import("./components/Title.vue"),
                    title: () => import("./components/Title.vue"),
                },
                props: {
                    title: {
                        title: "Dashboard",
                    },
                    default: {
                        title: "Hola, Bienvenido",
                        clasStyle: "!text-black",
                    }
                },
            },
            {
                path: "/visitas",
                name: "Visitas",
                components: {
                    default: () => import("./Pages/Visitas/Visitas.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Visitas"
                    }
                }
            },
            {
                path: "/visitas/crear",
                name: "CrearVisitas",
                components: {
                    default: () => import("./Pages/Visitas/Crear.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Crear Visita"
                    }
                }
            },
            {
                path: "/visitas/:id",
                name: "EditarVisitas",
                components: {
                    default: () => import("./Pages/Visitas/Edit.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Editar Visita"
                    }
                }
            },
            {
                path: "/ordenes",
                name: "Ordenes",
                components: {
                    default: () => import("./Pages/Ordenes/Ordenes.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Ordenes"
                    }
                }
            },
            {
                path: "/ordenes/:id",
                name: "OrdenesEdit",
                components: {
                    default: () => import("./Pages/Ordenes/Edit.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Crear Orden"
                    }
                }
            },
            {
                path: "/ordenes/crear",
                name: "CrearOrdenes",
                components: {
                    default: () => import("./Pages/Ordenes/Crear.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Editar Orden"
                    }
                }
            },
        ],
        beforeEnter: verifyToken,
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("./Pages/Auth/Logging.vue"),
        beforeEnter: verifyToken,
    },

    // Otras rutas definidas aquí
  {
    path: '/:pathMatch(.*)*', // Ruta comodín para manejar 404
    redirect: '/'
  }
]



const router = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes,
});
export default router;