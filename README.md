# webpack script
|  script  |  内容  |
| ---- | ---- |
|  `$ npm run build-dev`  |  dropbox に配置 / ソースマップあり  |
|  `$ npm run build-pro`  |  dist に配置 / ソースマップなし  |
|  `$ npm run dev`  |  watchモード / dropbox に配置 / ソースマップあり  |
|  `$ npm run pro`  |  dist に配置 / ソースマップなし  |
|  `$ npm run upload-dropbox`  |  dropboxリンクがセットされている customize-uploader 情報をkintoneにアップロードする / アップロード先：開発環境  |
|  `$ npm run upload-dev`  |  dist 配下の customize-uploader 情報をkintoneにアップロードする / アップロード先：開発環境  |
|  `$ npm run upload-pro`  |  dist 配下の customize-uploader 情報をkintoneにアップロードする / アップロード先：本番環境  |



# 環境構築
* 本リポジトリをForkして、新しいリポジトリを作成する
* ローカルのプロジェクト別のフォルダ内に kintone フォルダを作成し、リモートリポジトリと繋ぐ
* Dropbox内にプロジェクト用のフォルダを作成する。
    * \\Dropbox\\kintone_dev\\xxxx\\







# customize
## node module のインストール
* customize フォルダ内で下記コマンドを実行
* 必要であれば、`package.json` の devDependencies / dependencies を適宜修正
* node module のインストール
    * `$ npm install`
    * 依存関係のエラー(ERESOLVE unable to resolve dependency tree・・・)が出た時には、強制的に更新する
        * `$ npm install --legacy-peer-deps`
    * auditのセキュリティ警告が出る場合 (8 vulnerabilities (3 moderate, 5 high) )
        * `$ npm audit fix`
    * それでもauditのセキュリティ警告が出る場合
        * `npm audit fix --force`


## .env について
* `_env` ファイルを複製して、ファイル名を `.env` にリネームして、プロジェクト直下に配置する
* DEV_OUTPUT_PATH
    * 開発時に随時更新するファイルを出力するフォルダ
        * Dropboxなど
* TARGET_APPS
    * kintone customize uploader で更新するアプリを指定する
    * 指定方法
        * app1,app2,app3
        * `apps_info.js` で指定する `code` をカンマで繋いだもの


## apps_info.js について
* `apps_info.js` のファイルにアプリID等をセットする


## アプリ毎のファイルの配置
* src/apps フォルダ内に `apps_info.js` で指定した `code` に対応したフォルダを生成し `const.ts`、`index.ts`、`func.ts` を配置
* ファイル内の「xxxxx」等を適切に修正
* `xxxxx.manifest.json` のjsに記入する際、distファイルの階層が必要「dist/xxxx.js」



# test
* customize\\test\\ 内に xxxxxx.test.js を追加
    * アプリコードのファイル名を付ける
* 全部のテストの実行
    * `...\customize$ npx jest`
* ファイル指定してテストの実行
    * `...\customize$ npx jest .\test\XXXXXXXX.test.js`
* Jest encountered an unexpected token のエラーが出た場合、テストケースを書いたファイルのimport文の次行に下記を追加する
    * `jest.mock('kintone-ui-component', () => 'kintone-ui-component');`
* 詳細は [jest](https://jestjs.io/ja/) を読む
    * matcherに関しては[コチラ](https://jestjs.io/ja/docs/using-matchers)



# config
* config フォルダ内に展開
* ginueをプロジェクトにインストール
    * `$ npm install --save-dev ginue`
    * もしくは `$ npm install -g ginue`
        * プロジェクトフォルダだと上手く行っていないのでglobalの方がよさそう
* 開発環境の設計情報をダウンロード
    * `$ ginue pull dev`
* 本番環境の設計情報をダウンロード
    * `$ ginue pull pro`
* kintone上の開発環境の設計情報を、kintone上の本番環境に反映
    * `$ ginue push dev:pro`
* アップロードした設計情報を運用環境へ反映する
    * `$ ginue deploy pro`
* 詳細は [ginue](https://github.com/goqoo-on-kintone/ginue) を読む



