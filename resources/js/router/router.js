import { createRouter, createWebHistory} from 'vue-router';
import Container from "../views/layout/Container";
import Register from "../views/Auth/Register";
import Login from "../views/Auth/Login";
import Dashboard from "../views/pages/Dashboard";
import UserProfile from "../views/pages/UserProfile";
import Middleware from "../store/modules/middleware";
import store from "../store";
import middlewarePipeline from "./middlewarePipeline";




const routes = [
    {
        path: "/",
        name: Container,
        component: Container
    },
    {
        path: "/login",
        name: Login,
        component: Login,

    },
    {
        path: "/register",
        name: Register,
        component: Register,

    } ,
    {
        path: "/settings",
        name: Settings,
        component: Settings,
        meta: {
            middleware: [Middleware.auth]
        },
        roles: ['admin']

    } ,
    {
        path: "/dashboard",
        name: Dashboard,
        component: Dashboard,
        meta: {
            middleware: [Middleware.auth, Middleware.checkRole]
        },
        roles: ['admin']

    },

    {
        path: "/profile",
        name: UserProfile,
        component: UserProfile,
        meta: {
            middleware: [Middleware.auth,  Middleware.admin]
        },
        // beforeEnter: (to, from, next) => {
        //     if (store.getters["auth/isAdmin"]) next();
        //     else next(false);
        // }

    },

    {
        path: "/forgot-password",
        name: ForgotPassword,
        component: ForgotPassword,

    } ,

    {
        path: "/reset-password/:token",
        name: ResetPassword,
        component: ResetPassword,
        props: (route) => ({ query: route.query.token })

    } ,

    {   path: '/reset-password/:token',
        name: 'ResetPassword',
        component: ResetPassword,
    },
    {   path: '/verify-email',
        name: 'VerifyEmail',
        component: VerifyEmail,
    },


]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})


export default router
