interface PIPE<T> {
  (v: T | T[], ...args: any[]): void;
}
export class Queue<T> {
  private data = [];
  private pipe: PIPE<T>;
  timeout = 100;
  constructor(pipe: PIPE<T>) {
    this.pipe = pipe;
  }
  push(value: T): void {
    const data: T[] = this.data;
    data[data.length] = value;
    if (data.length == 1) {
      this.run(data.slice(0));
    }
  }
  shift(len: number) {
    const data = this.data;
    data.splice(0, len);
    if (data.length > 0) {
      this.run(data.slice(0, 30));
    }
  }
  run(files: T[]) {
    // await delay(this.timeout);
    this.pipe && this.pipe(files);
    this.shift(files.length);
  }
}
