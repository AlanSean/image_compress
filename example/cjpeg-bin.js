//#https://juejin.cn/post/6943423031985307679/

const path = require('path');
const Local_Bin_Wrapper = require('./Local_Bin_Wrapper');

//https://calendar.perfplanet.com/2014/mozjpeg-3-0/
// 该-quality选项接受小数（如果要制定一个公平的基准，则是必需的）和两个用逗号分隔的数字，以分别设置亮度和颜色的质量，例如-quality 60,70。
// -sample 1x1 启用全分辨率的颜色（例如，红色线条不会被严重弄脏），但是会使文件变大。
// -quant-table 2 （如前所述）使图像更柔和并降低低画质的后代化。
// -notrellis 使图像更清晰，但增加文件大小。
// -outfile 定义结果被（覆盖）写入的路径。
// 最后一个参数是源图像。它可以是PNG，非常高质量的JPEG或Targa。
// -quality N[,...]   Compression quality (0..100; 5-95 is useful range)
// -grayscale     Create monochrome JPEG file
// -rgb           Create RGB JPEG file
// -optimize      Optimize Huffman table (smaller file, but slow compression, enabled by default)
// -progressive   Create progressive JPEG file (enabled by default)
// -baseline      Create baseline JPEG file (disable progressive coding)
// -targa         Input file is Targa format (usually not needed)
// -revert        Revert to standard defaults (instead of mozjpeg defaults)
// -fastcrush     Disable progressive scan optimization
// -dc-scan-opt   DC scan optimization mode
// 							 - 0 One scan for all components
// 							 - 1 One scan per component (default)
// 							 - 2 Optimize between one scan for all components and one scan for 1st component
// 									 plus one scan for remaining components
// -notrellis     Disable trellis optimization
// -trellis-dc    Enable trellis optimization of DC coefficients (default)
// -notrellis-dc  Disable trellis optimization of DC coefficients
// -tune-psnr     Tune trellis optimization for PSNR
// -tune-hvs-psnr Tune trellis optimization for PSNR-HVS (default)
// -tune-ssim     Tune trellis optimization for SSIM
// -tune-ms-ssim  Tune trellis optimization for MS-SSIM
// Switches for advanced users:
// -noovershoot   Disable black-on-white deringing via overshoot
// -arithmetic    Use arithmetic coding
// -dct int       Use integer DCT method (default)
// -dct fast      Use fast integer DCT (less accurate)
// -dct float     Use floating-point DCT method
// -quant-baseline Use 8-bit quantization table entries for baseline JPEG compatibility
// -quant-table N Use predefined quantization table N:
// 							 - 1 Flat
// 							 - 2 Custom, tuned for MS-SSIM
// 							 - 3 ImageMagick table by N. Robidoux
// 							 - 4 Custom, tuned for PSNR-HVS
// -restart N     Set restart interval in rows, or in blocks with B
// -smooth N      Smooth dithered input (N=1..100 is strength)
// -maxmemory N   Maximum memory to use (in kbytes)
// -outfile name  Specify name for output file
// -verbose  or  -debug   Emit debug output
// -version       Print version information and exit
// Switches for wizards:
// -qtables file  Use quantization tables given in file
// -sample HxV[,...]  Set component sampling factors
// -scans file    Create multi-scan JPEG per script file
const url = path.resolve(__dirname,'../bin');
const bin = new Local_Bin_Wrapper()
	.src(`${url}/mac/cjpeg`, 'darwin')
	.src(`${url}/win/cjpeg.exe`, 'win32');
// bin.run();
module.exports = bin.path();