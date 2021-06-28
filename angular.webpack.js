/**
 * Custom angular webpack configuration
 */

module.exports = (config, options) => {
    config.target = 'electron-renderer';
    

    if (options.fileReplacements) {
        for(let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/renderer/environments/environment.ts') {
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
                    './src/renderer/less/base/variable.less',
                    './src/renderer/less/util.less',
                    './src/renderer/less/base/box.less',
                    './src/renderer/less/base/mixin/setArrow.less',
                    './src/renderer/less/base/mixin/setOnepx.less'
                ]
            }
        }}
    )
    return config;
}
