// 保留几位小数
export const fixed = (number: number, digit: number):number => Number(number.toFixed(digit));
//转换百分比
export const percent = (rate: number):string => `${fixed((rate * 100), 1)}%`;

//字节转换
export function byteConver(byte:number):string {
  if(byte > 1073741824){
    return `${fixed(byte/1073741824,2)} GB`;
  }
  if(byte >1048576){
    return `${fixed(byte/1048576,2)} MB`;
  }
  if(byte > 1024){
    return `${fixed(byte/1024,2)} KB`;
  }
  return `${fixed(byte,2)} B`;
}


//延时
export const delay = async function name(time: number): Promise<boolean> {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(true);
    }, time);
  });
};
