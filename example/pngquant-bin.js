//#https://juejin.cn/post/6943423031985307679/

const path = require('path');
const Local_Bin_Wrapper = require('./Local_Bin_Wrapper');

const url = path.resolve(__dirname,'../bin');
const bin = new Local_Bin_Wrapper()
	.src(`${url}/mac/pngquant`, 'darwin')
	.src(`${url}/win/pngquant.exe`, 'win32');
bin.run();
module.exports = bin.path();