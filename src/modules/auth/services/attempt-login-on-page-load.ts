import { AxiosError } from "axios"
import { useAuthStore } from "../store/auth-store"

export const attemptLoginOnPageLoad = async () => {
    const authStore = useAuthStore()
    const token = localStorage.getItem('jwt_token')
    
    if(token){
        await authStore.attemptAuth(token)
        .catch((err: AxiosError<any>) => {
            localStorage.removeItem('jwt_token')
        })
    } 
}