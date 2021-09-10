import { createAction, props } from "@ngrx/store";

export const toggleForm = createAction(
    '[Config] Show Form',
    props<{ showForm: boolean }> (),
)