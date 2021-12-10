import * as path from 'path';
import * as dotenv from 'dotenv';
import { app } from 'electron';

function bootstrap() {
  //先设置环境变量再运行
  const CURRENT_ENV = process.env.CURRENT_ENV;

  dotenv.config({
    path: path.join(__dirname, `../env/image_compress.${CURRENT_ENV ? CURRENT_ENV + '.' : ''}env`),
  });

  try {
    const App = require('./main/index').default;
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
