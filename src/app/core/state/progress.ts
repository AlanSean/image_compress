import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from "@ngrx/store";

export interface FilesState {
  progress: Readonly<number>;
}

//action
export const UPDATE_PROGRESS = createAction(
  "更新进度",
  props<{ newProgress: number }>()
);

//reducer
const initialState: Readonly<number> = 0;
export const progressReducer = createReducer(
  initialState,
  on(UPDATE_PROGRESS, (_, { newProgress }) => {
    return newProgress;
  })
);

//selectter
export const selectProgress = createSelector(
  (state: FilesState) => state,
  (state: FilesState) => state.progress
);
