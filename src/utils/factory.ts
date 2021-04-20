export class HashMap<T> {
  val = {};
  length = 0;
  put(md5key: string, v: T): any {
    if (!this.has(md5key)) this.length++;
    this.val[md5key] = {
      ...v,
      MD5KEY: md5key,
    };
  }

  update(md5key: string, v: T): any {
    if (!this.has(md5key)) return;
    this.val[md5key] = {
      ...v,
      MD5KEY: md5key,
    };
  }

  get(md5key: string): T | undefined {
    return this.has(md5key) ? this.val[md5key] : undefined;
  }
  
  has(k: string): boolean {
    return k in this.val;
  }

  private _del(md5key: string): T {
    const delval = this.val[md5key];
    delete this.val[md5key];
    this.length--;
    return delval;
  }

  delete(keys: string | Array<string>): T | Array<T> {
    const delArr = [];
    if (Array.isArray(keys)) {
      for (const key of keys) {
        delArr[delArr.length] = this._del(key);
      }
    } else {
      delArr[delArr.length] = this._del(keys);
    }
    return delArr;
  }

  getLen(): number {
    return this.length;
  }

  getArrayVal(): Array<T> {
    const _val = [];
    for (const val in this.val) {
      _val[_val.length] = {
        ...this.val[val]
      };
    }
    return _val;
  }

  clear(): void {
    this.val = new Object();
  }
}
