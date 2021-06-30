import * as path from 'path';
import * as execa from 'execa';
import * as fs from 'fs-extra';

//包装本地二进制文件
export default class Local_Bin_Wrapper {
  private map: Map<any, any> = new Map();
  /**
   * 配置包路径
   * @param url 本地二进制包的绝对路径
   * @param platfrom 包的平台 darwin -> macOs win32-> windows
   * @returns this
   */
  src(url: string, platfrom: 'darwin' | 'win32'): this {
    this.map.set(platfrom, path.resolve(url).replace('app.asar', 'app.asar.unpacked'));
    return this;
  }
  //返回符合当前平台的二进制地址
  path(): string {
    return this.map.get(process.platform);
  }

  async run(cmd = ['--version']): Promise<execa.ExecaChildProcess<string>> {
    const path = this.path();
    try {
      //验证是否存在
      //如果不存在就会报错 try catch捕获
      fs.statSync(path);

      const result_1 = await execa(path, cmd);
      console.log('command:', result_1.command);
      if (result_1.stderr.length > 0) {
        console.log(result_1.stderr);
      }
      if (result_1.stdout.length > 0) {
        console.log(result_1.stdout);
      }
      return result_1;
    } catch (e) {
      console.log(`Failed to access file ${path}`, e);
      return Promise.reject(e);
    }
  }
}
