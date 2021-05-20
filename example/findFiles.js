var fs = require("fs-extra");
var path = require("path");
const {
  Subject
} = require("rxjs");
const MD5 = require("crypto-js/md5");
var subject = new Subject();

function findFiles(dirPath, condition) {
  var fileArr = [];

  function recursiveFindFile(fileName) {
    if (!fs.existsSync(fileName))
      return;
    isFile(fileName) && check(fileName);
    if (isDirectory(fileName)) {
      var files = fs.readdirSync(fileName);
      files.forEach(function (val) {
        var filepath = path.resolve(fileName, val);
        isFile(filepath) && check(filepath);
        isDirectory(filepath) && recursiveFindFile(filepath);
      });
    }
  }
  //验证文件是否符合条件
  function check(fileName) {
    if (condition == undefined || condition.test(fileName)) {
      const filepath = fileName.replace(/\\/g, '/')
      // 通过验证  
      if (findFiles.pipe) {
        const result = findFiles.pipe(filepath);
        subject.next(result);
        filesArr[filesArr.length] = result;
      } else {
        subject.next(filepath);
        filesArr[filesArr.length] = filepath;
      }
    }
  }

  function isDirectory(fileName) {

    if (fs.existsSync(fileName))
      return fs.statSync(fileName).isDirectory();
    return false;
  }

  function isFile(fileName) {
    if (fs.existsSync(fileName))
      return fs.statSync(fileName).isFile();
    return false;
  }

  for (const filepath of dirPath) {
    recursiveFindFile(filepath);
  }
  return fileArr;
}

findFiles.subscribe = subject.subscribe.bind(subject);

findFiles.pipe = findFilesPipe;


const expMap = {
  '.png': {
    ext: 'png',
    quality: 'pngQuality'
  },
  '.jpg': {
    ext: 'jpg',
    quality: 'jpgQuality'
  },
  '.jpeg': {
    ext: 'jpeg',
    quality: 'jpgQuality'
  },
  '.webp': {
    ext: 'webp',
    quality: 'webpQuality'
  }
};



const setting = {
  jpgQuality: 80,
  webpQuality: 90,
  jpgQuality: 90,
  pngQuality: 90,
}

function byteConver(byte) {
  if (byte > 1073741824) {
    return `${fixed(byte/1073741824,2)} GB`;
  }
  if (byte > 1048576) {
    return `${fixed(byte/1048576,2)} MB`;
  }
  if (byte > 1024) {
    return `${fixed(byte/1024,2)} KB`;
  }
  return `${fixed(byte,2)} B`;
}

function findFilesPipe(filepath) {
  const imgFile = fs.statSync(filepath);

  const extname = path.extname(filepath).toLocaleLowerCase()

  const fileExpMap = expMap[extname];
  const fileName = path.basename(filepath);
  const outdir = '';
  const outpath = path.resolve(outdir, fileName);

  return {
    MD5KEY: MD5(`${filepath}${new Date().getTime()}`).toString(),
    state: 'await',
    src: `file://${filepath}`,
    path: filepath,
    name: fileName,
    extname: extname,
    ext: fileExpMap.ext,
    outsrc: null,
    outpath: outpath,
    outdir: outdir,
    quality: setting[fileExpMap.quality],
    rawDataSize: byteConver(imgFile.size),
    percentage: '',
    nowDataSize: '--',
  };
};



findFiles.subscribe(v => {
  console.log(v)
});

// console.time('a');
var files = findFiles('C:/Users/111/Desktop/新建文件夹 (3)', /.jpg$/)
// findfiles.run('C:/Users/111/Desktop/新建文件夹 (3)', /.jpg$/).then(v => {
//   console.log(v)
// });
// console.timeEnd('a');
// console.log(files)
