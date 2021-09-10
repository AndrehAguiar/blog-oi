import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { IRouterState } from "./router/router.reducer";

export interface IAppState {
    router: RouterReducerState<IRouterState>,
}

export const reducers: ActionReducerMap<IAppState> = {
    router: routerReducer,
}