import { createReducer, on } from "@ngrx/store";
import * as fromConfigActions from "./config.actions";


export interface IConfigState {
    showForm: boolean;
    disableSearch: boolean;
    listIsByName: boolean;
}

export const configInitialState: IConfigState = {
    showForm: true,
    disableSearch: false,
    listIsByName: true,
}

export const configReducer = createReducer(
    configInitialState,
    on(fromConfigActions.toggleForm, (state, { showForm }) => (
        {
            ...state,
            showForm,
        }
    )),
    on(fromConfigActions.enableSearchButton, (state, { disableSearch }) => (
        {
            ...state,
            disableSearch,
        }
    )),
    on(fromConfigActions.loadListByName, (state, { listIsByName }) => (
        {
            ...state,
            listIsByName,
        }
    )),
);