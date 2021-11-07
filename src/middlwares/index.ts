import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export interface MiddlewareContext {
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
}

export type MiddlewareSignature = (context: MiddlewareContext) => any

export default function checkMiddlewares(
    context: MiddlewareContext,
    middlewares: Array<MiddlewareSignature>
) {

    for (let i = 0; i < middlewares.length; i++) {
        const middleware = middlewares[i];
        const res = middleware(context)
        if(res === false) {
            return context.next({name:'home'})
        } else if( res !== true) {
            return res
        }
    }
    return context.next()
}