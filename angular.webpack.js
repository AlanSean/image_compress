/**
 * Custom angular webpack configuration
 */

module.exports = (config, options) => {
    config.target = 'electron-renderer';
    

    if (options.fileReplacements) {
        for(let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
                config.target = 'web';
            }
            break;
        }
    }
    config.module.rules.push({
        test: /\.less$/,
        use:{
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    './src/less/base/variable.less',
                    './src/less/util.less',
                    './src/less/base/box.less',
                    './src/less/base/mixin/setArrow.less',
                    './src/less/base/mixin/setOnepx.less'
                ]
            }
        }}
    )
    return config;
}
