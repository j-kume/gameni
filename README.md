# webpack script
|  script  |  内容  |
| ---- | ---- |
|  `$ npm run build-dev`  |  ビルド / ソースマップあり  |
|  `$ npm run build-pro`  |  ビルド / ソースマップなし  |
|  `$ npm run dev`  |  ビルド / ソースマップあり / watchモード  |
|  `$ npm run file2dev`  |  ファイルアップロード / アップロード先：開発環境  |
|  `$ npm run svr2dev`  |  ローカルHTTPSサーバー / アップロード先：開発環境  |
|  `$ npm run file2pro`  |  ファイルアップロード / アップロード先：本番環境  |
|  `$ npm run svr2pro`  |  ローカルHTTPSサーバー / アップロード先：本番環境  |



# 環境構築
## ソースの取得
* 本リポジトリをForkして、新しいリポジトリを作成する
* ローカルのプロジェクト別のフォルダ内に kintone フォルダを作成し、リモートリポジトリと繋ぐ

## mkcertの準備
* mkcertをインストールする。
    * **以下、win端末で、c:\tools\mkcertに「mkcert-vX.X.X-windows-amd64.exe」を配置し、インストールすることを前提に解説する。**
    * **[こちら](https://github.com/FiloSottile/mkcert/releases)** から自分の端末にあったものをダウンロードする。
    * 下記コマンドをコマンドプロンプト or PowerShellで実行する
        * `$ cd c:\tools\mkcert`
        * `$ mkcert-vX.X.X-windows-amd64.exe -install`
        * `$ mkcert-vX.X.X-windows-amd64.exe localhost 127.0.0.1 ::1`
    * c:\tools\mkcert フォルダ内に「localhost+2-key.pem」「localhost+2.pem」ができる

## Visal Studio CodeにLive Server Extension を使う場合
* Visal Studio CodeのExtensionの **「[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)」** を入れる。
    * Live Server ExtensionのWorkspaceの設定を変更する
    * https
        * enable： true
        * cert： localhost+2.pem
        * key： localhost+2-key.pem
    * root
        * /src/customize/dist
    * ```
        "settings": {
		    "liveServer.settings.multiRootWorkspaceName": "gameni_kume",
		    "liveServer.settings.https": {
			    "enable": true,
	    		"cert": "c:\\tools\\mkcert\\localhost+2.pem",
	    		"key": "c:\\tools\\mkcert\\localhost+2-key.pem"
	    	},
		    "liveServer.settings.host": "127.0.0.1",
		    "liveServer.settings.root": "/src/customize/dist"
    	}
        ```


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
* DIST_DIR
    * webpackにて生成されるJavaScriptファイルが出力されるフォルダ
* LOCAL_HTTPS_PATH
    * ローカルHTTPSサーバーのURL
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



