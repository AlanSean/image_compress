import { createReducer, on } from "@ngrx/store";
import { FileState } from "./files.model";
import {
  REMOVE_FILE,
  FILE_ADD,
  UPDATE_STATE,
  CLEAR_FILE,
} from "./files.actions";
import { HashMap } from "@utils/index";
import { FILE } from "@common/constants";

export const fileMap = new HashMap<FILE>();
window["fileMap"] = fileMap;
//reducer
const initialState: FileState = {
  fileArr: fileMap.getArrayVal(),
  length: 0,
};
export const fileReducer = createReducer(
  initialState,
  on(REMOVE_FILE, (_, { keys }) => {
    fileMap.delete(keys);
    return {
      fileArr: fileMap.getArrayVal(),
      length: fileMap.getLen(),
    };
  }),
  on(FILE_ADD, (_, { files }) => {
    //如果是数组
    if (Array.isArray(files)) {
      for (const file of files) {
        fileMap.put(file.MD5KEY, file);
      }
    } else {
      fileMap.put(files.MD5KEY, files);
    }
    return {
      fileArr: fileMap.getArrayVal(),
      length: fileMap.getLen(),
    };
  }),
  on(UPDATE_STATE, (_, { files }) => {
    //如果是数组
    if (Array.isArray(files)) {
      for (const file of files) {
        fileMap.update(file.MD5KEY, file);
      }
    } else {
      fileMap.update(files.MD5KEY, files);
    }
    return {
      fileArr: fileMap.getArrayVal(),
      length: fileMap.getLen(),
    };
  }),
  on(CLEAR_FILE, () => {
    fileMap.clear();
    return {
      fileArr: fileMap.getArrayVal(),
      length: fileMap.getLen(),
    };
  })
);
