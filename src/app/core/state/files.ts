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
export interface FilesState {
  fileArr: ReadonlyArray<file>;
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
const initialState: ReadonlyArray<file> = fileMap.getArrayVal();
export const fileReducer = createReducer(
  initialState,
  on(removeFILE, (state, { filePath }) => {

    fileMap.delete(filePath);
    return fileMap.getArrayVal();
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
    return fileMap.getArrayVal();
  }),
  on(UPDATE_STATE, (state, { file }) => {
    fileMap.put(file.path,{
      ...file,
      path: `file://${file.path}`
    });
    return fileMap.getArrayVal();
  })
);

//selectter
export const selectFile = createSelector(
  (state: FilesState) => {
    console.log(state);
    return state.fileArr;
  },
  (fileArr: ReadonlyArray<file>) => {
    return fileArr;
  }
);
