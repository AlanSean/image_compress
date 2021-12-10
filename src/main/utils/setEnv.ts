import * as dotenv from 'dotenv';
import * as path from 'path';

function setEnv() {
  const CURRENT_ENV = process.env.CURRENT_ENV;

  dotenv.config({
    path: path.join(
      __dirname,
      `../../../env/image_compress.${CURRENT_ENV ? CURRENT_ENV + '.' : ''}env`
    ),
  });
}

setEnv();
