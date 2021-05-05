import { createReducer, on } from '@ngrx/store';
import { FileState } from './files.model';
import { REMOVE_FILE, FILE_ADD, UPDATE_STATE, CLEAR_FILE, SAVE_NEW_DIR } from './files.actions';
import { HashMap } from '@utils/index';
import { FILE, IpcChannel } from '@common/constants';

export const fileMap = new HashMap<FILE>();

//reducer
const initialState: FileState = {
  fileArr: [],
  length: 0
};
export const fileReducer = createReducer(
  initialState,
  on(REMOVE_FILE, (_, { keys }) => {
    fileMap.delete(keys);
    return {
      fileArr: fileMap.getArrayVal(),
      length: fileMap.getLen()
    };
  }),
  //只接受添加并且状态从 await => finsh | error过渡
  on(FILE_ADD, (_, { files }) => {
    //如果是数组
    if (Array.isArray(files)) {
      for (const file of files) {
        //searchImg 也许会比 压缩完成时要慢
        //因为图片压缩是批量压缩,而添加file是同步的
        if (fileMap.get(file.MD5KEY)?.state !== 'await' && file.state == 'await') {
          continue;
        }
        fileMap.put(file.MD5KEY, file);
      }
    } else {
      //...
      //!fileMap.has(files.MD5KEY) 不存在 直接添加
      //如果存在files.state !== 'await'//
      if (!fileMap.has(files.MD5KEY) || files.state !== 'await') {
        fileMap.put(files.MD5KEY, files);
      }
    }
    return {
      fileArr: fileMap.getArrayVal(),
      length: fileMap.getLen()
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
      length: fileMap.getLen()
    };
  }),
  on(CLEAR_FILE, _ => {
    fileMap.clear();
    return {
      fileArr: [],
      length: 0
    };
  }),
  on(SAVE_NEW_DIR, (state, { ipcRenderer }) => {
    console.log(ipcRenderer);
    ipcRenderer.send(IpcChannel.SAVE_NEW_DIR, state.fileArr);

    return {
      fileArr: fileMap.getArrayVal(),
      length: fileMap.getLen()
    };
  })
);
