import { router } from "./router"
import { RouteRecordRaw } from "vue-router"

interface ModuleInterface {
    router?:  RouteRecordRaw[]
}

interface ModulesInterface {
    [key: string] : ModuleInterface
}

const registerModule = (name: string, module: ModuleInterface) => {
    if(module.router){
        module.router.forEach(route => {
            router.addRoute(route)
        })
    }
}

export const registerModules = (modules: ModulesInterface) => {
    Object.keys(modules).forEach(moduleKey => {
        const module = modules[moduleKey]
        registerModule(moduleKey, module)
    })
}