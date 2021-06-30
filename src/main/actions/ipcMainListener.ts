import * as fs from 'fs-extra';
import * as log from 'electron-log';
import { BrowserWindow, dialog, shell } from 'electron';
import { FILE, DefultSetting } from '../../common/constants';
// import { dirSearchImg, compress } from '../config/optimize';
import { WebContentsAction } from './webContents';
import { getOptions } from '../utils';
import { menuAction } from './menu';
import { OptimizeAction } from './optimize';

export class IpcMainListenerAction {
  private readonly webContents = new WebContentsAction(this.win.webContents);
  private readonly optimize = new OptimizeAction();

  constructor(readonly win: BrowserWindow) {}

  //添加文件并压缩
  file_add = (files: string[], setting: DefultSetting) => {
    const sTime = new Date().getTime();
    const findFiles = this.optimize.dirSearchImg(setting);
    const fileSelected = this.webContents.fileSelected;

    findFiles.subscribe(fileSelected);

    const imgArr = findFiles.find(files);

    findFiles.unsubscribe();

    log.info('time:', new Date().getTime() - sTime, imgArr.length);

    let count = 0;

    const len = imgArr.length;

    if (len == 0) {
      this.webContents.message('warning', 'msg.not_img_warning');
      return;
    }

    this.webContents.setProgress(0, 1);

    this.optimize.handle(imgArr, files => {
      count++;
      this.webContents.setProgress(count, len);
      this.webContents.fileUpdate(files);
    });
  };

  //打开文件夹 的配置参数
  select_dir = async (key?: 'SELECT_FILE') => {
    const options = getOptions(key);
    //当打开目录是要选择文件时
    const { filePaths } = await dialog.showOpenDialog(this.win, options);
    if (filePaths[0]) {
      this.webContents.selecedDirResult(filePaths, key);
    }
  };

  save_as = async (file: FILE) => {
    //当打开目录是要选择文件时
    const { filePath } = await dialog.showSaveDialog({
      title: 'Save files',
      defaultPath: file.outpath,
      filters: [
        {
          name: 'Images',
          extensions: [file.ext]
        }
      ]
    });

    if (filePath) {
      this.webContents.message('loading', 'msg.save_loading', {
        nzDuration: 0
      });
      //防止特殊字符导致失败
      const Buffer = await fs.readFile(file.outpath);
      await fs.writeFile(filePath, Buffer);
      // //保存成功 提示mssage
      // shell.showItemInFolder(filePath);
      this.webContents.message('success', 'msg.save_finish');
    }
  };

  save_new_dir = async (files: FILE[]) => {
    const options = getOptions('SAVE_AS_DIR');
    //当打开目录是要选择文件时
    const { filePaths } = await dialog.showOpenDialog(this.win, options);

    log.info('filePaths', filePaths);
    if (filePaths[0]) {
      let count = 0;
      const len = files.length;

      this.webContents.setProgress(0, 1);
      this.webContents.message('loading', 'msg.export_loading', {
        nzDuration: 0
      });

      files.forEach(async item => {
        const outpath = item.outpath.replace(item.outdir, filePaths[0]);
        await fs.copy(item.outpath, outpath);

        count++;
        this.webContents.setProgress(count, len);
        if (count == len) {
          this.webContents.message('success', 'msg.export_finish');
          shell.showItemInFolder(filePaths[0]);
        }
      });
    }
  };
  menuEnabled(menuKeys: string[], enabled: boolean) {
    menuAction.menuEnabled(menuKeys, enabled);
  }
}
