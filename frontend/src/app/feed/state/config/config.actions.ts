import { createAction, props } from "@ngrx/store";

export const toggleForm = createAction(
    '[Config] Show Form',
    props<{ showForm: boolean }> (),
)

export const enableSearchButton = createAction(
    '[CONFIG] Enable Search',
    props<{ disableSearch: boolean }>(),
)

export const loadListByName = createAction(
    '[CONFIG] Load List By Name',
    props<{ listIsByName: boolean }>(),
)