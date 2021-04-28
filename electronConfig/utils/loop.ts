import { delay } from './file';

interface PIPE<T> {
  (v: T[], ...args: any[]): void;
}

export class Queue<T> {
  private data = [];
  private state: 'stop' | 'runing' = 'stop';
  pipe: PIPE<T>;
  timeout = 100;
  constructor(pipe: PIPE<T>) {
    this.pipe = pipe;
  }
  //加入值
  push(value: T): void {
    this.data = [...this.data, value];
  }
  //获取队列长度
  size(): number {
    return this.data.length;
  }
  //队列 从头开始删除n个
  shift(n: number): T[] {
    return this.data.splice(0, n);
  }
  //是否为空
  isEmpty(): boolean {
    return this.size() == 0;
  }

  //开始运行
  //直到没有为止
  //测试的例子
  async run(): Promise<void> {
    this.pipe && this.pipe(this.shift(8));
    await delay(this.timeout);
    if (!this.isEmpty()) {
      this.run();
    }
  }
}
