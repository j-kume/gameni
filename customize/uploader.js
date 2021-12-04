import {apps_all} from './uploader/_apps'
import {execSync} from 'child_process';
import fs from 'fs';

console.log('\n###############');

console.log('NODE_ENV : ' + process.env.NODE_ENV);
console.log('NODE_UPTO : ' + process.env.NODE_UPTO);

const command = `npx kintone-customize-uploader --domain ${process.env.KINTONE_DOMAIN} --username ${process.env.KINTONE_USER} --password ${process.env.KINTONE_PASSWORD} `;

let upto_dir = '';
if (process.env.NODE_UPTO) {
  upto_dir = 'dropbox/';
}

console.log('\n###############');

let apps = apps_all[process.env.NODE_ENV]
apps.forEach(v => {
  console.log(v.app + ' : ' + v.code + ' : ' + v.name);

  const manifest_path = 'uploader/' + upto_dir + v.code + '.manifest.json';
  const tmp_path = 'uploader/' + upto_dir + '_' + v.code + '.manifest.json';

  if (fs.existsSync(manifest_path)) {
    console.log('\nfile copy');
    fs.copyFileSync(manifest_path, tmp_path);
    console.log(' ... copy success!');
  
    console.log('\nget contents');
    let contents = fs.readFileSync(tmp_path, 'utf-8');
    console.log(' ... get success!');

    console.log('\nreplace contents');
    contents = contents.replace(/APP_ID/g, v.app);
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
