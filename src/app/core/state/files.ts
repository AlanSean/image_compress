import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from "@ngrx/store";

// state
export interface FilesState {
  files: ReadonlyArray<string>;
}
//action
export const FILE_ADD = createAction(
  "[Book List] Add Book",
  props<{ files: string[] }>()
);
export const removeFILE = createAction(
  "[Book Collection] Remove Book",
  props<{ filePath: string | Array<string> }>()
);
//获取图片列表
export const retrievedFILEList = createAction(
  "[Book List/API] Retrieve Books Success",
  props<{ Book }>()
);

//reducer
const initialState: ReadonlyArray<string> = [];
export const booksReducer = createReducer(
  initialState,
  on(removeFILE, (state, { filePath }) => {
    if (Array.isArray(filePath)) {
      return state.filter((path) => filePath.includes(path));
    } else {
      return state.filter((path) => path !== filePath);
    }
  }),
  on(FILE_ADD, (state, { files }) => {
    const newFilePath: Array<string> = [];
    files.forEach((path: string) => {
      path = `file://${path}`;
      !state.includes(path) && newFilePath.push(path);
    });
    return [...state, ...newFilePath];
  })
);

//selectter
export const selectFile = createSelector(
  (state: FilesState) => state.files,
  (files: Array<string>) => files
);
