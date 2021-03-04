import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from "@ngrx/store";
import { HashMap }  from '@utils/index';

const fileMap = new HashMap<file>();
// state
export interface file{
  path: string;
  outpath: string;
  state: string;
}
export interface fileArr {
  [key:string]: file
}
export interface FilesState {
  fileArr: fileArr;
}

//action
export const FILE_ADD = createAction(
  "添加图片",
  props<{ files: file | Array<file> }>()
);
export const removeFILE = createAction(
  "删除图片 & 批量删除",
  props<{ filePath: string | Array<string> }>()
);

export const UPDATE_STATE = createAction(
  "更新图片压缩状态",
  props<{ file: file }>()
);

//reducer
const initialState: fileArr = fileMap.val;
export const fileReducer = createReducer(
  initialState,
  on(removeFILE, (state, { filePath }) => {

    fileMap.delete(filePath);
    return {
      ...fileMap.val
    };
  }),
  on(FILE_ADD, (state, { files }) => {
    //如果是数组
    if (Array.isArray(files)) {
      for (const file of files) {
        //非png jpeg格式直接跳过
        if (!/png|jpeg|jpg/.test(file.path)) continue;

        fileMap.put(file.path,{
          ...file,
          path: `file://${file.path}`
        });
      }
      
    } else if (/png|jpeg|jpg/.test(files.path)) {
      fileMap.put(files.path,{
        ...files,
        path: `file://${files.path}`
      });
    }
    return {
      ...fileMap.val
    };
  }),
  on(UPDATE_STATE, (state, { file }) => {
    fileMap.put(file.path,{
      ...file,
      path: `file://${file.path}`
    });
    return {
      ...fileMap.val
    };
  })
);

//selectter
export const selectFile = createSelector(
  (state: FilesState) => {
    console.log(state);
    return state.fileArr;
  },
  (fileArr: fileArr) => {
    return fileArr;
  }
);
