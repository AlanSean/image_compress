import { FILE } from '@common/constants';

export function _deepCopy(arr: FILE[]) {
  const newArr: FILE[] = [];
  for (const file of arr) {
    newArr[newArr.length] = { ...file };
  }
  return newArr;
}

export function _push(oldArr: FILE[], newArr: FILE | FILE[]) {
  return Array.isArray(newArr) ? [...newArr, ...oldArr] : [newArr, ...oldArr];
}

export function _update(arr: FILE[], index: number, newVal: FILE) {
  const newArr = [...arr];
  newArr[index] = { ...newVal };
  return newArr;
}
export function _remove(arr: FILE[], index: number) {
  const newArr = [...arr];
  newArr.splice(index, 1);
  console.log('newArr', newArr);

  return newArr;
}
export function _indexOfPre(arr: FILE[]) {
  return function (key: string) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].MD5KEY === key) return i;
    }
    return -1;
  };
}
