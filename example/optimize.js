const execa = require("execa");
const path= require("path");
const fs = require('fs-extra');
//Make a directory and its parents 
const makeDir = require('make-dir');

const pngquantBin = require('./pngquant-bin');


const pngquant = options => async input => {
  
  const args = [
    '-',
    '--force',
    '--quality',
    options.quality,
  ];

  const childProcess = execa(pngquantBin, args, {
      encoding: null,
      maxBuffer: Infinity,
      input
    })
    .then(result => result.stdout)
    .catch(error => {
      //https://github.com/kornelski/pngquant#--quality-min-max
      if (error.exitCode === 99) {
        return input;
      }
      throw error;
    });
  return childProcess;
}


;(async () => {
  const dest =  path.join('C:\\Users\\111\\AppData\\Local\\Temp\\image_compress\\', path.basename('C:/Users/111/Desktop/新建文件夹 (2)/QQ图片20210207161755.png'));
  const dirname = path.dirname(dest);
 

  let data = await fs.readFile('C:/Users/111/Desktop/新建文件夹 (2)/QQ图片20210207161755.png');
  let rawDataSize = data.length;
  data = await (pngquant({
    quality: "10-10"
  })(data));
  let nowDataSize = data.length;
  //先创建目录
  await makeDir(dirname);
  console.log('dirname:',dirname)
  //生成文件
  await fs.writeFile(dest,data);
  console.log('rawDataSize',rawDataSize)
  console.log('nowDataSize',nowDataSize)
  console.log('dest',dest)
})();



