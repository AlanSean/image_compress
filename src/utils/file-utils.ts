//查找图片
import { resolve } from "path";
import * as fs from "fs-extra";

//在文件夹里面查找图片
/**
 *
 * @param { string[] } fileArray 文件数组
 */
export async function dirSearchImg(fileArray: string[]): Promise<string[]> {
  let list: string[] = [];

  for (const file of fileArray) {
    //验证是否存在
    const imgFile = await fs.stat(file);
    //判断是不是文件
    if (imgFile.isFile()){
      list[list.length] = file;
      //如果是文件 后面的逻辑不需要执行了
      continue;
    }
    //判断是不是文件夹
    if (imgFile.isDirectory()) {
      //获取文件夹下的文件列表名
      const fileNames = await fs.readdir(file),
        //地址拼接
        dirFiles = fileNames.map((filename) => resolve(file, filename)),
        //回调继续查找 直到没有文件夹
        searchImg = await dirSearchImg(dirFiles);

      list = [...list, ...searchImg];
    }
    
  }
  return list;
}
