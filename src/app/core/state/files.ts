import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from "@ngrx/store";
import { HashMap }  from '@utils/index';

import { FILE } from "@common/constants";
const fileMap = new HashMap<FILE>();

export interface FilesState {
  fileArr: ReadonlyArray<FILE>;
}

//action
export const FILE_ADD = createAction(
  "添加图片",
  props<{ files: FILE | Array<FILE> }>()
);
export const removeFILE = createAction(
  "删除图片 & 批量删除",
  props<{ filePath: string | Array<string> }>()
);

export const UPDATE_STATE = createAction(
  "更新图片压缩状态",
  props<{ file: FILE }>()
);
export const CLEAR_FILE = createAction(
  "清空图片",
  props<{ file: FILE }>()
);

//reducer
const initialState: ReadonlyArray<FILE> = [];
export const fileReducer = createReducer(
  initialState,
  on(removeFILE, (_, { filePath }) => {

    fileMap.delete(filePath);
    return fileMap.getArrayVal();
  }),
  on(FILE_ADD, (state, { files }) => {
    //如果是数组
    if (Array.isArray(files)) {
      for (const file of files) {
        //非png jpeg格式直接跳过
        if (!/png|jpeg|jpg/.test(file.path)) continue;

        fileMap.put(file.path,file);
      }
      
    } else {
      fileMap.put(files.path,files);
    }
    if(Array.isArray(files)) return [...state, ...files];
    return [...state, files];
  }),
  on(UPDATE_STATE, (_, { file }) => {
    fileMap.put(file.path,{
      ...file,
      path: `file://${file.path}`
    });
    return fileMap.getArrayVal();
  }),
  on(CLEAR_FILE,() => {
    fileMap.clear();
    return fileMap.getArrayVal();
  })
);

//selectter
export const selectFile = createSelector(
  (state: FilesState) => {
    return state.fileArr;
  },
  (fileArr: ReadonlyArray<FILE>) => {
    return fileArr;
  }
);
