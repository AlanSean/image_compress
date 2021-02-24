//添加扩展

import { session } from "electron";
import * as os from "os";
import * as path from "path";

/**
 * 获取扩展版本号
 * @param id 扩展id
 * @param v  扩展版本号
 */
const getExtension = function (id: string, v: string): string {
  return path.join(
    os.homedir(),
    (process.platform !== "darwin"
      ? "/AppData/Local/Google/Chrome/User Data/Profile 3/Extensions/"
      : "/Library/Application Support/Google/Chrome/Default/Extensions/") +
    id +
    "/" +
    v+'_0'
  );
};

const Angular_State_Inspector = getExtension(
  "nelkodgfpddgpdbcjinaaalphkfffbem",
  "1.4.5"
);
// electron11不支持某个api 故此不用了
// const Augury = getExtension(
//   "elgalmkoelokbchhkhacckoklkejnhcd",
//   "1.25.2"
// );


export function loadExtension():void{
  //添加angular 扩展
  session.defaultSession.loadExtension(Angular_State_Inspector);
}
