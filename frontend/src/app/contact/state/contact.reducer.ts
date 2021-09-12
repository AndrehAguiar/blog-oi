import { Action, createReducer, on } from "@ngrx/store";
import * as fromContactActions from "./contact.actions";

export interface IContactState {
    result: any;
    sending: boolean;
    error: boolean;
}

export const contactInitialState: IContactState = {
    result: undefined,
    sending: false,
    error: false,
}

const reducer = createReducer(
    contactInitialState,
    on(fromContactActions.clearContactState, () => contactInitialState),
    on(fromContactActions.sendContact, state => ({
        ...state,
        sending: true,
        error: false,
    })),
    on(fromContactActions.sendContactSuccess, (state, {
        result }) => ({
            ...state,
            result: 200,
            sending: false,
        })),
    on(fromContactActions.sendContactFailed, state => ({
        ...state,
        sending: false,
        error: true,
    })),
);

export const contactReducer = (state: IContactState, action: Action): IContactState => {
    return reducer(state, action);
}