import { execSync } from 'child_process';
import fs from 'fs';
import * as  apps_info from './apps_info';

try {

  console.log('\n###############');

  console.log('CUSTOMIZE_TYPE : ' + process.env.CUSTOMIZE_TYPE);
  console.log('CUSTOMIZE_TARGET : ' + process.env.CUSTOMIZE_TARGET);
  console.log('UPTO : ' + process.env.UPTO);
  console.log('TARGET_APPS : ' + process.env.TARGET_APPS);

  if (process.env.CUSTOMIZE_TARGET === 'list' && process.env.TARGET_APPS === '') {
    console.log('\nアプリコードがセットされていません。');
    console.log('\n###############');
    throw new Error('強制終了');
  }

  const command = `npx kintone-customize-uploader --domain ${process.env.KINTONE_DOMAIN} --username ${process.env.KINTONE_USER} --password ${process.env.KINTONE_PASSWORD} `;

  console.log('\n###############');

  const target_configs = apps_info.configs.filter(v => v.env === process.env.UPTO);
  const target_apps = process.env.TARGET_APPS.split(',').map(v => v.trim());

  target_configs.forEach(config => {
    console.log(config.env + ' : ' + config.code + ' : ' + config.id + ' : ' + config.name);
    if (config.option) {
      console.log('option : ');
      for (const key in config.option) {
        if (config.option.hasOwnProperty(key)) {
          console.log(key + ': ' + config.option[key]);
        }
      }
    }

    // CUSTOMIZE_TARGET=list かつ target_appsに含まれていない時には、スキップする
    if (process.env.CUSTOMIZE_TARGET === 'list') {
      if (process.env.TARGET_APPS) {
        if (!target_apps.includes(config.code)) {
          console.log('\nスキップ');
          console.log('\n###############');
          return;
        }
      }
    }

    const manifest_path = 'uploader/' + config.code + '.manifest.json';
    const tmp_path = 'uploader/' + '_' + config.code + '.manifest.json';

    if (fs.existsSync(manifest_path)) {
      console.log('\nfile copy');
      fs.copyFileSync(manifest_path, tmp_path);
      console.log(' ... copy success!');

      console.log('\nget contents');
      let contents = fs.readFileSync(tmp_path, 'utf-8');
      console.log(' ... get success!');

      console.log('\nreplace contents');
      contents = contents.replace(/APP_ID/g, config.id);

      let distPath = '';
      if (process.env.CUSTOMIZE_TYPE === 'file') {
        distPath = process.env.DIST_DIR;
      } else if (process.env.CUSTOMIZE_TYPE === 'svr') {
        distPath = process.env.LOCAL_HTTPS_PATH;
      } else {
        distPath = process.env.DIST_DIR;
      }
      contents = contents.replace(/DIST_PATH/g, distPath);

      if (config.option) {
        for (const key in config.option) {
          if (config.option.hasOwnProperty(key)) {
            if (config.option[key]) {
              contents = contents.replace(new RegExp(key, 'g'), config.option[key]);
            } else {
              contents = contents.replace(new RegExp('"' + key + '",', 'g'), '');
            }
          }
        }
      }

      console.log(' ... replace success!');

      console.log('\nwrite contents');
      fs.writeFileSync(tmp_path, contents);
      console.log(' ... write success!');

      console.log('\nuploading... ', tmp_path);
      const result = execSync(command + tmp_path);
      console.log('\n' + result);

      console.log('\nfile delete');
      fs.unlinkSync(tmp_path);
      console.log(' ... delete success!');
    } else {
      console.log('\nnot exist manifest file.');
    }
    console.log('\n###############');
  });
} catch (e) {
  console.log(e.message);
}
