//先设置环境变量再运行
import * as path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../image_compress.env'), debug: process.env.NODE_ENV });

import { app } from 'electron';
import { App } from './main/index';

function bootstrap() {
  try {
    const lodwin = app.requestSingleInstanceLock();
    if (!lodwin) app.quit();

    app.on('ready', function () {
      App.load();
    });
  } catch (e) {
    app.quit();
  }
}

bootstrap();
