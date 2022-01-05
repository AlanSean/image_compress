import './main/utils/setEnv';
import './main/utils/log';
import { app } from 'electron';
import imageCompress from './main/index';

function bootstrap() {
  try {
    // const imageCompress = require('./main/index').default;
    const lodwin = app.requestSingleInstanceLock();

    if (!lodwin) app.quit();
    app.on('will-finish-launching', () => {
      imageCompress.openFile();
    });
    app.on('ready', () => {
      imageCompress.ready();
    });
  } catch (e) {
    console.log(e);
    app.quit();
  }
}

bootstrap();
