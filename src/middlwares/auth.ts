import { useAuthStore } from "@/modules/auth/store/auth-store"
import { MiddlewareContext, MiddlewareSignature } from "./index"

const auth: MiddlewareSignature = ({from, to, next}: MiddlewareContext) => {
    const authStore = useAuthStore()
    if(! authStore.token || ! authStore.user){
        return next({name: 'auth.login'})
    }
    return true
}

export default auth