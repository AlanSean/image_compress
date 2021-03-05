const imagemin = window.require('imagemin');
// const imageminGifsicle = window.require('imagemin-gifsicle');
// const imageminJpegtran = window.require('imagemin-jpegtran');
// const imageminOptipng = window.require('imagemin-optipng');
const imageminPngquant = window.require('imagemin-pngquant');
const imageminJpegoptim  = window.require('imagemin-jpegoptim');


export function compress(file:string,out:string): Promise<void>{
  return imagemin([file], {
    destination: out,
    glob: false,
    plugins: [
      imageminJpegoptim({
        max: 80
      }),
      imageminPngquant({
        quality: [0.6, 0.8]
      }),
    ],
  });
}