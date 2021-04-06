const execa = require("execa");
const path= require("path");
const fs = require('fs-extra');

const pngquantBin = require('./pngquant-bin');


const pngquant = options => async input => {
  
  const args = [
    '-m',
    80,
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

module.exports =  async function run(){
  const input = 'C:/Users/111/Desktop/test/start.jpg';
  const dest =  path.join('C:\\Users\\111\\AppData\\Local\\Temp\\image_compress\\', path.basename(input));
  const dirname = path.dirname(dest);

  let data = await fs.readFile(input);
  const result = await (pngquant({
    quality: "10-10"
  })(data));
  //先创建目录
  await fs.mkdirs(dirname);
  console.log('dirname:',dirname)
  //生成文件
  await fs.writeFile(dest,result.data);
  console.log('rawDataSize',result.rawDataSize)
  console.log('nowDataSize',result.nowDataSize)
  console.log('dest',dest)
}


