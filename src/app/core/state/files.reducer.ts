import { Action, createReducer, on } from '@ngrx/store';

import {
  removeFILE,
  FILE_ADD,
  UPDATE_STATE,
  CLEAR_FILE
} from './files.action';
import { HashMap }  from '@utils/index';
import { FILE } from "@common/constants";

export const key = 'files';

export const fileMap = new HashMap<FILE>();

export interface State {
  fileArr: ReadonlyArray<FILE>;
  length: Readonly<number>
}

//reducer
const initialState: State = {
  fileArr: fileMap.getArrayVal(),
  length: fileMap.getLen()
};
const fileReducer = createReducer(
  initialState,
  on(removeFILE, (_, { filePath }) => {

    fileMap.delete(filePath);
    return {
      fileArr:fileMap.getArrayVal(),
      length:fileMap.getLen()
    };
  }),
  on(FILE_ADD, (state, { files }) => {
    //如果是数组
    if (Array.isArray(files)) {
      for (const file of files) {
        fileMap.put(file.path, file);
      }
      
    } else {
      fileMap.put(files.path, files);
    }
    return {
      fileArr:fileMap.getArrayVal(),
      length:fileMap.getLen()
    };
  }),
  on(UPDATE_STATE, (_, { file }) => {
    fileMap.put(file.path,file);
    return {
      fileArr:fileMap.getArrayVal(),
      length:fileMap.getLen()
    };
  }),
  on(CLEAR_FILE,() => {
    fileMap.clear();
    return {
      fileArr:fileMap.getArrayVal(),
      length:fileMap.getLen()
    };
  })
);

export const reducer = (state: State | undefined, action: Action): State => {
  return fileReducer(state, action);
};