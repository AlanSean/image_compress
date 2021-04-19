import {
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import {
  key,
  State
} from './files.reducer';

export const getFileState = createFeatureSelector<State>(key);
export const selectFile = createSelector(
  getFileState,
  (state: State) =>  state.fileArr
);
export const getFilesLength = createSelector(
  getFileState,
  (state: State) =>  state.length
);