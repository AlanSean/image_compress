interface NAryFunction<T, R> {
  (...args: T[]): R;
}

export const delay = async function (time: number): Promise<boolean> {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove(true);
    }, time);
  });
};

export const debounce = function <T extends NAryFunction<any, any>>(this: any, fn: T, wait = 0, immediate = false) {
  let timer: number;
  const self = this;
  return function (...args: any) {
    let result;

    if (immediate) {
      result = fn.apply(self, args);
      immediate = false;
    } else {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        result = fn.call(self, args);
      }, wait);
    }

    return result;
  };
};

export const throttle = function <T extends NAryFunction<any, any>>(this: any, fn: T, wait = 0, immediate = false) {
  let timer: number | null = null;
  const self = this;
  function cancel() {
    timer && clearTimeout(timer);
    timer = null;
  }
  return function (...args: any[]) {
    let result;

    if (immediate) {
      result = fn.call(self, args);
      immediate = false;
    } else if (timer == null) {
      timer = window.setTimeout(() => {
        result = fn.call(self, args);
        cancel();
      }, wait);
    }
    return result;
  };
};
