import { ref } from 'vue'
import axios, { AxiosResponse } from "axios"

const apiClinet = axios.create({
    baseURL: 'http://localhost:8000/api/v1'
})

export const useAxios = <T = any>(url: string, config: Object= {}) => {

    const response = ref<AxiosResponse<T>>()
    const data = ref<T>()
    const error = ref<any>()
    const isLoading = ref<boolean>(false)

    const fetch = async () => {
        isLoading.value = true
        try {
            const res = await apiClinet.request({
                url,
                ...config
            })
            response.value = res
            data.value = res.data
        } catch (err: any) {
            error.value = err
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return { response, data, error, isLoading, fetch }
}

export const setAuthorizationHeader = (token: string | null) => {
    apiClinet.defaults.headers.common['Authorization'] = `Bearer ${token}`
    if(token) {
        localStorage.setItem('jwt_token', token)
    } else {
        localStorage.removeItem('jwt_token')
    }
}