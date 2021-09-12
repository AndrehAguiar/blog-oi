import { createAction, props } from "@ngrx/store";

export const sendContact = createAction(
    '[CONTACT] Send Contact',
    props<{ event: Event }>(),
);

export const sendContactSuccess = createAction(
    '[CONTACT] Send Contact Success',
    props<{ result: any }>(),
);

export const sendContactFailed = createAction(
    '[CONTACT] Send Contact Failed',
);


export const clearContactState = createAction(
    '[CONTACT] Clear Contact State'
);