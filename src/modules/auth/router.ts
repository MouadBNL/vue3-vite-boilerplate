import { RouteRecordRaw } from "vue-router"
import Module from './Module.vue'
/**
 * Pages
 */
import LoginPage from './views/LoginPage.vue'
import AuthPage from './views/AuthPage.vue'

export const router: RouteRecordRaw[] = [
    {
        path: '/login',
        component: LoginPage,
        name: 'auth.login',
    },
    // {
    //     path: '/register',
    //     component: RegisterPage,
    //     name: 'auth.register',
    // },
    {
        path: '/auth',
        component: Module,
        children: [
            {
                path: '',
                component: AuthPage,
                name: 'auth.auth'
            }
        ]
    }
]