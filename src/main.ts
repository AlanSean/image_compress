import './main/utils/setEnv';
import './main/utils/log';
import { app } from 'electron';

function bootstrap() {
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
