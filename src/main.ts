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
