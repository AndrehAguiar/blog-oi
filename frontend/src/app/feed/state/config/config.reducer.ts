import { createReducer, on } from "@ngrx/store";
import * as fromConfigActions from "./config.actions";


export interface IConfigState {
    showForm: boolean;
}

export const configInitialState: IConfigState = {
    showForm: true,
}

export const configReducer = createReducer(
    configInitialState,
    on(fromConfigActions.toggleForm, (state, { showForm }) => (
        {
            ...state,
            showForm,
        })),
);