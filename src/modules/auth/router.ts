import { RouteRecordRaw } from "vue-router"
import Module from './Module.vue'
import checkMiddlewares from "@/middlwares"
import auth from "@/middlwares/auth"
import guest from "@/middlwares/guest"
/**
 * Pages
 */
import LoginPage from './views/LoginPage.vue'
import AuthPage from './views/AuthPage.vue'
import RegisterPage from './views/RegisterPage.vue'

export const router: RouteRecordRaw[] = [
    {
        path: '/login',
        component: LoginPage,
        name: 'auth.login',
        beforeEnter: (to, from, next) => {
            return checkMiddlewares({to, from, next}, [guest])
        }
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'auth.register',
        beforeEnter: (to, from, next) => {
            return checkMiddlewares({to, from, next}, [guest])
        }
    },
    {
        path: '/auth',
        component: Module,
        beforeEnter: (to, from, next) => {
            return checkMiddlewares({to, from, next}, [auth])
        },
        children: [
            {
                path: '',
                component: AuthPage,
                name: 'auth.auth'
            }
        ]
    }
]