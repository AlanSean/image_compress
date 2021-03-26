# ZN
```
mozjpeg version 3.1 (build 20150904)

-quality N[,...]  压缩质量(0 . . 100;5-95是有效范围)
-grayscale     创建单色JPEG文件
-rgb           创建RGB JPEG文件
-optimize      优化Huffman表(文件小，压缩慢，默认启用)
-progressive   创建渐进式JPEG文件(默认启用)
-baseline      创建基线JPEG文件(禁用累进编码)
-targa         输入文件为Targa格式(通常不需要)
-revert        恢复到标准默认值(而不是mozjpeg默认值)
-fastcrush     禁用渐进扫描优化
-dc-scan-opt   直流扫描优化模式
                - 0一次扫描所有组件
                - 1 每个组件一个扫描(默认)
                - 2 优化所有组件的一次扫描和第一个组件的一次扫描
                    加上一个扫描剩余的组件
-notrellis     禁用格子优化
-trellis-dc    启用栅格优化直流系数(默认)
-notrellis-dc  禁用栅格优化直流系数
-tune-psnr     调优栅格优化PSNR
-tune-hvs-psnr 优化PSNR-HVS的栅格(默认)
-tune-ssim     为SSIM调整网格优化
-tune-ms-ssim  调整网格优化MS-SSIM

高级:

-noovershoot   Disable black-on-white deringing via overshoot
-arithmetic    Use arithmetic coding
-dct int       Use integer DCT method (default)
-dct fast      Use fast integer DCT (less accurate)
-dct float     Use floating-point DCT method
-quant-baseline Use 8-bit quantization table entries for baseline JPEG compatibility
-quant-table N Use predefined quantization table N:
                - 1 Flat
                - 2 Custom, tuned for MS-SSIM
                - 3 ImageMagick table by N. Robidoux
                - 4 Custom, tuned for PSNR-HVS
-restart N     Set restart interval in rows, or in blocks with B
-smooth N      Smooth dithered input (N=1..100 is strength)
-maxmemory N   Maximum memory to use (in kbytes)
-outfile name  Specify name for output file
-verbose  or  -debug   Emit debug output
-version       Print version information and exit
Switches for wizards:
-qtables file  Use quantization tables given in file
-sample HxV[,...]  Set component sampling factors
-scans file    Create multi-scan JPEG per script file

```
## EN
```
-quality N[,...]  Compression quality (0..100; 5-95 is useful range) 
-grayscale     Create monochrome JPEG file
-rgb           Create RGB JPEG file
-optimize      Optimize Huffman table (smaller file, but slow compression, enabled by default)
-progressive   Create progressive JPEG file (enabled by default)
-baseline      Create baseline JPEG file (disable progressive coding)
-targa         Input file is Targa format (usually not needed)
-revert        Revert to standard defaults (instead of mozjpeg defaults)
-fastcrush     Disable progressive scan optimization
-dc-scan-opt   DC scan optimization mode
                - 0 One scan for all components
                - 1 One scan per component (default)
                - 2 Optimize between one scan for all components and one scan for 1st component
                    plus one scan for remaining components
-notrellis     Disable trellis optimization
-trellis-dc    Enable trellis optimization of DC coefficients (default)
-notrellis-dc  Disable trellis optimization of DC coefficients
-tune-psnr     Tune trellis optimization for PSNR
-tune-hvs-psnr Tune trellis optimization for PSNR-HVS (default)
-tune-ssim     Tune trellis optimization for SSIM
-tune-ms-ssim  Tune trellis optimization for MS-SSIM
Switches for advanced users:
-noovershoot   Disable black-on-white deringing via overshoot
-arithmetic    Use arithmetic coding
-dct int       Use integer DCT method (default)
-dct fast      Use fast integer DCT (less accurate)
-dct float     Use floating-point DCT method
-quant-baseline Use 8-bit quantization table entries for baseline JPEG compatibility
-quant-table N Use predefined quantization table N:
                - 1 Flat
                - 2 Custom, tuned for MS-SSIM
                - 3 ImageMagick table by N. Robidoux
                - 4 Custom, tuned for PSNR-HVS
-restart N     Set restart interval in rows, or in blocks with B
-smooth N      Smooth dithered input (N=1..100 is strength)
-maxmemory N   Maximum memory to use (in kbytes)
-outfile name  Specify name for output file
-verbose  or  -debug   Emit debug output
-version       Print version information and exit
Switches for wizards:
-qtables file  Use quantization tables given in file
-sample HxV[,...]  Set component sampling factors
-scans file    Create multi-scan JPEG per script file

```