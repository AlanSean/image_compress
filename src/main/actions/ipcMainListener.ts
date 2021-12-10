import * as fs from 'fs-extra';
import { BrowserWindow, dialog, shell, nativeImage } from 'electron';
import { FILE, DefultSetting } from '../../common/constants';
// import { dirSearchImg, compress } from '../config/optimize';
import { WebContentsAction } from './webContents';
import { OptimizeAction } from './optimize';
import { getOptions } from '../utils';
import { menuAction } from './menu';

export class IpcMainListenerAction {
  constructor(
    readonly win: BrowserWindow,
    readonly actions: WebContentsAction,
    readonly optimize: OptimizeAction
  ) {}

  //添加文件并压缩
  file_add = (files: string[], setting: DefultSetting) => {
    const sTime = new Date().getTime();
    const findFiles = this.optimize.dirSearchImg(setting);
    const fileSelected = this.actions.fileSelected;

    findFiles.subscribe(fileSelected);

    const imgArr = findFiles.find(files);

    findFiles.unsubscribe();

    console.log('time:', new Date().getTime() - sTime, imgArr.length);

    let count = 0;

    const len = imgArr.length;

    if (len == 0) {
      this.actions.message('warning', 'msg.not_img_warning');
      return;
    }

    this.actions.setProgress(0, 1);

    this.optimize.handle(imgArr, files => {
      count++;
      this.actions.setProgress(count, len);
      this.actions.fileUpdate(files);
    });
  };

  //打开文件夹 的配置参数
  select_dir = async (key?: 'SELECT_FILE') => {
    const options = getOptions(key);
    //当打开目录是要选择文件时
    const { filePaths } = await dialog.showOpenDialog(this.win, options);
    if (filePaths[0]) {
      this.actions.selecedDirResult(filePaths, key);
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
          extensions: [file.ext],
        },
      ],
    });

    if (filePath) {
      this.actions.message('loading', 'msg.save_loading', {
        nzDuration: 0,
      });
      //防止特殊字符导致失败
      const Buffer = await fs.readFile(file.outpath);
      await fs.writeFile(filePath, Buffer);
      // //保存成功 提示mssage
      // shell.showItemInFolder(filePath);
      this.actions.message('success', 'msg.save_finish');
    }
  };

  save_new_dir = async (files: FILE[]) => {
    const options = getOptions('SAVE_AS_DIR');
    //当打开目录是要选择文件时
    const { filePaths } = await dialog.showOpenDialog(this.win, options);

    console.log('filePaths', filePaths);
    if (filePaths[0]) {
      let count = 0;
      const len = files.length;

      this.actions.setProgress(0, 1);
      this.actions.message('loading', 'msg.export_loading', {
        nzDuration: 0,
      });

      files.forEach(async item => {
        const outpath = item.outpath.replace(item.outdir, filePaths[0]);
        await fs.copy(item.outpath, outpath);

        count++;
        this.actions.setProgress(count, len);
        if (count == len) {
          this.actions.message('success', 'msg.export_finish');
          shell.showItemInFolder(filePaths[0]);
        }
      });
    }
  };

  menuEnabled(menuKeys: string[], enabled: boolean) {
    menuAction.menuEnabled(menuKeys, enabled);
  }

  //
  dragStart(event: Electron.IpcMainEvent, filePath: string) {
    const icons = nativeImage.createFromPath(filePath);
    event.sender.startDrag({
      file: filePath,
      icon: icons,
    });
  }
}
