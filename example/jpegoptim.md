```
jpegoptim v1.4.6  Copyright (C) 1996-2018, Timo Kokkonen
Usage: jpegoptim [options] <filenames>

  -d<path>, --dest=<path>
                    specify alternative destination directory for
                    optimized files (default is to overwrite originals)
  -f, --force       force optimization
  -h, --help        display this help and exit
  -m<quality>, --max=<quality>
                    set maximum image quality factor (disables lossless
                    optimization mode, which is by default on)
                    Valid quality values: 0 - 100
  -n, --noaction    don't really optimize files, just print results
  -S<size>, --size=<size>
                    Try to optimize file to given size (disables lossless
                    optimization mode). Target size is specified either in
                    kilo bytes (1 - n) or as percentage (1% - 99%)
  -T<threshold>, --threshold=<threshold>
                    keep old file if the gain is below a threshold (%)
  -b, --csv         print progress info in CSV format
  -o, --overwrite   overwrite target file even if it exists (meaningful
                    only when used with -d, --dest option)
  -p, --preserve    preserve file timestamps
  -P, --preserve-perms
                    preserve original file permissions by overwriting it
  -q, --quiet       quiet mode
  -t, --totals      print totals after processing all files
  -v, --verbose     enable verbose mode (positively chatty)
  -V, --version     print program version

  -s, --strip-all   strip all markers from output file
  --strip-none      do not strip any markers
  --strip-com       strip Comment markers from output file
  --strip-exif      strip Exif markers from output file
  --strip-iptc      strip IPTC/Photoshop (APP13) markers from output file
  --strip-icc       strip ICC profile markers from output file
  --strip-xmp       strip XMP markers markers from output file

  --all-normal      force all output files to be non-progressive
  --all-progressive force all output files to be progressive
  --stdout          send output to standard output (instead of a file)
  --stdin           read input from standard input (instead of a file)

```