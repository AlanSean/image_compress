//#https://juejin.cn/post/6943423031985307679/

const path = require('path');
const Local_Bin_Wrapper = require('./Local_Bin_Wrapper');

//https://github.com/kornelski/pngquant
const url = path.resolve(__dirname,'../bin');
const bin = new Local_Bin_Wrapper()
	.src(`${url}/mac/jpegoptim`, 'darwin')
	.src(`${url}/win/jpegoptim.exe`, 'win32');
bin.run();
module.exports = bin.path();