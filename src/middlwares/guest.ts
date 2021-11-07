import { useAuthStore } from "@/modules/auth/store/auth-store"
import { MiddlewareContext, MiddlewareSignature } from "."

const guest: MiddlewareSignature = ({from, to, next}: MiddlewareContext) => {
    const authStore = useAuthStore()
    if(authStore.token || authStore.user){
        return false
    }

    return true
}

export default guest