import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FilsKey, FileState } from "./files.model";

export const getFileState = createFeatureSelector<FileState>(FilsKey);

export const selectFile = createSelector(
  getFileState,
  (state: FileState) => state.fileArr
);
export const getFilesLength = createSelector(
  getFileState,
  (state: FileState) => state.length
);
