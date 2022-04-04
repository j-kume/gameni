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
    * \\Dropbox\\kintne_dev\\xxxx\\







# customize
* customize フォルダ内に展開
* `_env` ファイルを複製して、ファイル名を `.env` にリネームして、プロジェクト直下に配置する
* ファイル内の「xxxxx」等を適切に修正
* node module のインストール
    * `$ npm install`
    * 依存関係のエラー(ERESOLVE unable to resolve dependency tree・・・)が出た時には、強制的に更新する
        * `$ npm install --legacy-peer-deps`
    * auditのセキュリティ警告が出る場合 (8 vulnerabilities (3 moderate, 5 high) )
        * `$ npm audit fix`
    * それでもauditのセキュリティ警告が出る場合
        * `npm audit fix --force`
* src/apps フォルダ内に アプリCODE に対応したフォルダを生成し `index.ts`、`func.ts` を配置
* common フォルダ内の `system_const.ts` 内に番号管理マスタのアプリIDとApiTokenをセットする。ただし、ApiTokenは `btoa()` で変換しておくこと。
* .manifest.jsonのjsに記入する際、distファイルの階層が必要「dist/xxxx.js」
* uploader\\_apps.js のファイルにアプリID等をセットする


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



