import { defineStore } from "pinia"
import { useAxios } from "@/services/use-axios"
import { setAuthorizationHeader } from '@/services/use-axios'
import { router } from "@/router"
import authConfig from '../config'

interface AuthStoreStateInterface {
    token: string | null,
    user: any
    [key: string]: any
}

interface LoginResponse {
    access_token: string,
    token_type: string,
    expires_in: number,
    [key: string]: any
}


export const useAuthStore = defineStore('auth',{
    state: (): AuthStoreStateInterface => ({
        user: null,
        token: null
    }),
    actions: {
        restToken() {
            this.token = null
        },
        async login(credentials: {email: string, password: string}) {
            const { data, fetch, error } = useAxios<LoginResponse>(authConfig.loginEndpoint, {
                method: 'post',
                data: {
                    ...credentials
                }
            })

            await fetch().catch((err) => {
                if(err.response){
                    if(err.response.status && err.response.status == 401){
                        throw 'Invalid credentials, try again.'
                    } else if(err.response.data.message) {
                        throw err.response.data.message
                    } else if(err.response.data.error) {
                        throw err.response.data.error
                    }
                }
                if(err.message){
                    throw err.message
                }
            })
            if(!(data) || !(data.value)){
                throw 'Failed to get token, try again.'
            }

            this.token = data.value.access_token

            return this.attemptAuth(this.token)
        },
        async attemptAuth(token: string | null) {
            // Setting Bearer token in axios
            token && setAuthorizationHeader(token)
            if(! token) {
                throw 'can\'t attempt auth request wihtout token'
            }

            const { data, fetch } = useAxios<any>(authConfig.tokenVerificationEndpoint, {
                method: 'post'
            })

            await fetch()
            if(!(data) || !(data.value)){
                this.restToken()
                throw 'failed to auth user'
            }

            this.user = data.value
            this.token = token
        },

        async logout() {
            const { fetch } = useAxios(authConfig.logoutEndpoint, {method: 'post'})
            await fetch().then(() => {
                this.token = null
                this.user = null
                router.push({name: 'home'})
            })
        },

        async register(credentials: {name: string, email: string, password: string, password_confimration: string}) {
            const { data, fetch, error } = useAxios<LoginResponse>(authConfig.registerEndpoint, {
                method: 'post',
                data: {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    "password_confirmation": credentials.password_confimration
                }
            })

            await fetch().catch((err) => {
                if(err.response){
                    if(err.response.status && err.response.status == 401){
                        throw 'Invalid credentials, try again.'
                    } else if(err.response.data.message) {
                        throw err.response.data.message
                    } else if(err.response.data.error) {
                        throw err.response.data.error
                    }
                }
                if(err.message){
                    throw err.message
                }
            })
            if(!(data) || !(data.value)){
                throw 'Failed to get token, try again.'
            }

            this.token = data.value.access_token

            return this.attemptAuth(this.token)
        }
    }
})