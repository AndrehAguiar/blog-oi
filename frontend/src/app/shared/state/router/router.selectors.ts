import { RouterReducerState, RouterState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRouterState } from "./router.reducer";

const selectRouterReducerState = createFeatureSelector<RouterReducerState<IRouterState>>('router');

export const selectRouterState = createSelector(
    selectRouterReducerState,
    (routerReducerState: RouterReducerState<IRouterState>) => (routerReducerState && routerReducerState.state) || {}
);

export const selectRouterQueryParams = createSelector(
    selectRouterState,
    (RouterState: IRouterState) => (RouterState && RouterState.queryParams) || {}
)