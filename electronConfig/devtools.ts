//添加扩展

import { session } from 'electron';
import * as os from 'os';
import * as path from 'path';

/**
 * 获取扩展版本号
 * @param id 扩展id
 * @param v  扩展版本号
 */
const getExtension = function (id: string, v: string): string {
  return path.resolve(`./Extensions/${id}/${v}_0`);
};
const Angular_Gauntlets = getExtension('Angular_Gauntlets', '1.2.1');
const Redux_DevTools = getExtension('Redux_DevTools', '2.17.0');
console.log(Angular_Gauntlets);
// electron11不支持某个api 故此不用了
// const Augury = getExtension(
//   "elgalmkoelokbchhkhacckoklkejnhcd",
//   "1.25.2"
// );

export function loadExtension(): void {
  //添加angular 扩展
  session.defaultSession.loadExtension(Angular_Gauntlets, { allowFileAccess: true });
  session.defaultSession.loadExtension(Redux_DevTools, { allowFileAccess: true });
}
