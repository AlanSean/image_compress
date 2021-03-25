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
    '--verbose',
    '--quality',
    options.quality,
  ];

  const childProcess = execa(pngquantBin, args, {
      encoding: null,
      maxBuffer: Infinity,
      input
    })
    .then(result =>{
      return {
        status: 0,
        rawDataSize: input.length,
        data: result.stdout,
        nowDataSize: result.stdout.length,
      };
    })
    .catch(error => {
      //https://github.com/kornelski/pngquant#--quality-min-max
      if (error.exitCode === 99) {
        return  {
          status: 99,
          rawDataSize: input.length,
          data: input,
          nowDataSize: input.length,
        };
      }
      throw error;
    });
  return childProcess;
}


;(async () => { 
  const input = 'C:/Users/111/Desktop/loginbg-fs8-fs8.png';
  const dest =  path.join('C:\\Users\\111\\AppData\\Local\\Temp\\image_compress\\', path.basename(input));
  const dirname = path.dirname(dest);
 

  let data = await fs.readFile(input);
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
