import * as fs from 'fs-extra';
import * as path from 'path';
import { Subject } from 'rxjs';

const subject = new Subject();

type FilesArrType = string[];
type findFilesSync = (dirPath: FilesArrType, condition?: RegExp) => FilesArrType;

interface findFiles {
  (dirPath: FilesArrType, condition?: RegExp): Promise<FilesArrType>;
  subscribe: typeof subject.subscribe;
  pipe?: (path: string) => any;
}

const findFilesSync: findFilesSync = function (dirPath, condition) {
  const filesArr: FilesArrType = [];

  function recursiveFindFile(fileName: string) {
    if (!fs.existsSync(fileName)) return;

    isFile(fileName) && check(fileName);

    if (isDirectory(fileName)) {
      const files = fs.readdirSync(fileName);
      files.forEach(val => {
        const filepath = path.resolve(fileName, val);

        isFile(filepath) && check(filepath);
        isDirectory(filepath) && recursiveFindFile(filepath);
      });
    }
  }

  //验证文件是否符合条件
  function check(fileName: string) {
    if (condition == undefined || condition.test(fileName)) {
      // 通过验证
      if (findFiles.pipe) {
        const result = findFiles.pipe(fileName);
        subject.next(result);
        filesArr[filesArr.length] = result;
      } else {
        subject.next(fileName);
        filesArr[filesArr.length] = fileName;
      }
    }
  }

  function isDirectory(fileName: string) {
    if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
    return false;
  }

  function isFile(fileName: string) {
    if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
    return false;
  }
  //
  for (const filepath of dirPath) {
    recursiveFindFile(filepath.replace(/\\/g, '/'));
  }
  return filesArr;
};

const findFiles: findFiles = async function (dirPath, condition) {
  return new Promise(resolve => {
    resolve(findFilesSync(dirPath, condition));
  });
};

findFiles.subscribe = subject.subscribe.bind(subject);

export { findFiles };
