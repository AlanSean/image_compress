module.exports = {
  '*.ts': filenames => [
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],
  // '*.less': filenames => `stylelint --fix ${filenames.join(' ')}`,
  '*.{html,css,js,json,md,yml}': filenames => `git add ${filenames.join(' ')}`,
};
