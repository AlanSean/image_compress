import { FILE } from "@common/constants";

export interface FileState {
  fileArr: ReadonlyArray<FILE>;
  length: Readonly<number>;
}
export const FilsKey = "files";
