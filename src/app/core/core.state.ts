import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
} from "@ngrx/store";

import { AppConfig } from "../../environments/environment";

import { debug } from "./meta-reducers/debug.reducer";
import { fileReducer } from "./files/files.reducer";
import { FileState } from "./files/files.model";
export const reducers: ActionReducerMap<AppState> = {
  files: fileReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [debug];

if (!AppConfig.production) {
  if (!AppConfig.test) {
    metaReducers.unshift(debug);
  }
}

export const selectFilesState = createFeatureSelector<AppState, FileState>(
  "files"
);

export interface AppState {
  files: FileState;
}
