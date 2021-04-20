import { createAction, props } from "@ngrx/store";
import { FILE } from "@common/constants";

//action
export const FILES_INIT = createAction(
  "图片列表初始化",
  props<{ files: Array<FILE> }>()
);

export const FILE_ADD = createAction(
  "添加图片",
  props<{ files: FILE | Array<FILE> }>()
);
export const REMOVE_FILE = createAction(
  "删除图片 & 批量删除",
  props<{ keys: string | Array<string> }>()
);

export const UPDATE_STATE = createAction(
  "更新图片压缩状态",
  props<{ files: FILE | Array<FILE> }>()
);
export const CLEAR_FILE = createAction("清空图片", props<{ file: FILE }>());
