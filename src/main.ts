import './main/utils/setEnv';
import './main/utils/log';
import { app } from 'electron';

function bootstrap() {
  try {
    const App = require('./main/index').default;
    const lodwin = app.requestSingleInstanceLock();

    if (!lodwin) app.quit();
    App.openFile();
    app.on('ready', () => {
      App.load();
    });
  } catch (e) {
    console.log(e);
    app.quit();
  }
}

bootstrap();
