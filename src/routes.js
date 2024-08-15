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
                path: "/usuarios",
                components:{
                    default: () => import("./Pages/Usuarios/Usuarios.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Usuarios"
                    }
                }
            },
            {
                path: "/usuarios/crear",
                name: "CrearUsuario",
                components: {
                    default: () => import("./Pages/Usuarios/Crear.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Crear Usuario"
                    }
                }
            },
            {
                path: "/usuarios/:id",
                name: "UpdateUsuario",
                components: {
                    default: () => import("./Pages/Usuarios/Edit.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Actualizar Usuario"
                    }
                }
            },
            {
                path: "/clientes",
                components: {
                    default: () => import("./Pages/Clientes/Clientes.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Clientes"
                    }
                }
            },
            {
                path: "/clientes/:id",
                components: {
                    default: () => import("./Pages/Clientes/Edit.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Editar Cliente"
                    }
                }
            },
            {
                path: "/clientes/crear",
                name: "CrearClientes",
                components: {
                    default: () => import("./Pages/Clientes/Crear.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Crear Cliente"
                    }
                }
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
            {
                path: "/productos",
                name: "Productos",
                components: {
                    default: () => import("./Pages/Productos/Productos.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Producto / Servicio"
                    }
                }
            },
            {
                path: "/productos/:id",
                name: "ProductosEdit",
                components: {
                    default: () => import("./Pages/Productos/Edit.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Editar Producto / Servicio"
                    }
                }
            },
            {
                path: "/productos/crear",
                name: "CrearProducto",
                components: {
                    default: () => import("./Pages/Productos/Crear.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Crear Producto / Servicio"
                    }
                }
            },
            {
                path: "/sucursales",
                name: "Sucursales",
                components: {
                    default: () => import("./Pages/Sucursales/Sucursales.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Sucursales"
                    }
                }
            },
            {
                path: "/sucursales/:id",
                name: "SucursalesEdit",
                components: {
                    default: () => import("./Pages/Sucursales/Edit.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Editar Sucursal"
                    }
                }
            },
            {
                path: "/sucursales/crear",
                name: "CrearSucursales",
                components: {
                    default: () => import("./Pages/Sucursales/Crear.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Crear Sucursal"
                    }
                }
            },
            {
                path: "/agenda",
                name: "Agenda",
                components: {
                    default: () => import("./Pages/Agenda/Agenda.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Agenda"
                    }
                }
            },
            {
                path: "/perfil",
                name: "Perfil",
                components: {
                    default: () => import("./Pages/User/Perfil.vue"),
                    title: () => import("./components/Title.vue"),
                } ,
                props:{
                    title:{
                        title: "Perfil"
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