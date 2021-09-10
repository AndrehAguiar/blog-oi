import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";

export interface IRouterState {
    url: string;
    params: Params;
    queryParams: Params;
    fragment: string | null;
}

export class CustomRouterSerializer implements RouterStateSerializer<IRouterState> {
    serialize(routerState: RouterStateSnapshot): IRouterState {
        const { url } = routerState;
        const { queryParams } = routerState.root;
        const { fragment } = routerState.root;

        let route = routerState.root;
        const params: Params = {};
        do {
            if (!!route.params){
                Object.keys(route.params)
                .forEach(key => {
                    params[key] = route.params[key];
                });
            }
            route = route.firstChild!;
        } while(!!route);
        return { url, params, queryParams, fragment };
    };
}