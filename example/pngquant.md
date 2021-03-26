```
https://github.com/kornelski/pngquant
2.12.0 (January 2018)
--quality min-max
min和max数字，范围为0（最差）至100（最完美），类似于JPEG。pngquant将使用达到或超过max质量要求的最少颜色数量。如果转换后的质量低于min质量，则将不会保存图像（如果输出到stdin，则将输出24位原始图像），并且pngquant将退出，并显示状态码99。

pngquant --quality=65-80 image.png
--ext new.png
设置输出文件名的自定义扩展名（后缀）。默认情况下-or8.png还是-fs8.png使用。如果使用--ext=.png --force选项，则pngquant将覆盖输入文件（请谨慎使用）。

-o out.png 或者 --output out.png
将转换后的文件写入给定路径。使用此选项时，仅允许单个输入文件。

--skip-if-larger
如果转换不值得，请不要编写转换后的文件。

--speed N
速度/质量的权衡从1（最慢，最高质量，最小文件）到11（最快，不太稳定的质量，轻压缩）。默认值为4。除非您需要实时生成图像（例如地图图块），否则建议保留默认值。较高的速度可以处理256色，但不能很好地处理较少的颜色。

--nofs
禁用Floyd-Steinberg抖动。

--floyd=0.5
控制抖动级别（0 =无，1 =满）。请注意，该=字符是必需的。

--posterize bits
通过位数减少调色板的精度。当图像将显示在低深度屏幕（例如16位显示器或ARGB444格式的压缩纹理）上时使用。

--strip
不要复制可选的PNG块。在Mac上（使用Cocoa阅读器时）总是会删除元数据。

--force           overwrite existing output files (synonym: -f)
--skip-if-larger  only save converted files if they're smaller than original
--output file     destination file path to use instead of --ext (synonym: -o)
--ext new.png     set custom suffix/extension for output filenames
--quality min-max don't save below min, use fewer colors below max (0-100)
--speed N         speed/quality trade-off. 1=slow, 3=default, 11=fast & rough
--nofs            disable Floyd-Steinberg dithering
--posterize N     output lower-precision color (e.g. for ARGB4444 output)
--strip           remove optional metadata (default on Mac)
--verbose         print status messages (synonym: -v)
```