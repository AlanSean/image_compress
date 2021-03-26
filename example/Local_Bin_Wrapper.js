const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');

class Local_Bin_Wrapper {
  constructor(){
		this.map = new Map();
	}
  src(url, platfrom) {
    this.map.set(platfrom,path.resolve(url));
    return this;
  }
  path(){
    return this.map.get(process.platform);
  }

	async run(cmd = ["--version"]){
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

module.exports = Local_Bin_Wrapper;