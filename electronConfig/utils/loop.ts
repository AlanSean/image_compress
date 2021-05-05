import { delay } from './file';
interface PIPE<T> {
  (v: T | T[], ...args: any[]): void;
}
export class Queue<T> {
  private data = [];
  private pipe: PIPE<T>;
  timeout = 30;
  constructor(pipe: PIPE<T>) {
    this.pipe = pipe;
  }
  push(value: T): void {
    const data = this.data;
    data[data.length] = value;
    if (data.length == 1) {
      this.run(data[0]);
    }
  }
  shift() {
    const data = this.data;
    data.shift();
    if (data.length > 0) {
      this.run(data[0]);
    }
  }
  async run(files: T | T[]): Promise<void> {
    await delay(this.timeout);
    this.pipe && this.pipe(files);
    this.shift();
  }
}
