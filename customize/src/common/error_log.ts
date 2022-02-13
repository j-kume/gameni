//=============================================================================
//【ファイル名】
//  error_log.ts
//【機能】
//  エラーログ関連処理
//=============================================================================
import { Apps } from './apps';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

export class ErrorLog {

  private readonly _ERROR_LOG_CODE: string = 'error_log';

  private _conf: { env: string; code: string; name: string; id: number; token: string; };
  private _env: string;
  private _code: string;
  private _name: string;
  private _id: number;
  private _token: string;

  constructor(id: number) {
    const apps = new Apps(id);
    this._conf = apps.getConfByCode(this._ERROR_LOG_CODE);
    this._env = this._conf.env;
    this._code = this._conf.code;
    this._name = this._conf.name;
    this._id = this._conf.id;
    this._token = this._conf.token;
  }

  // =============================================
  // getter / setter
  // =============================================
  public get conf(): { env: string; code: string; name: string; id: number; token: string; } {
    return this._conf;
  }
  public get env(): string {
    return this._env;
  }
  public get code(): string {
    return this._code;
  }
  public get name(): string {
    return this._name;
  }
  public get id(): number {
    return this._id;
  }
  public get token(): string {
    return this._token;
  }


  // =============================================
  // Method
  // =============================================
  // =============================================
  // log2kintone
  // エラーログアプリにデータ登録
  // ---------------------------------------------
  // object       : エラーオブジェクト
  // fileName     : ファイル名
  // functionName : 関数名
  // mark         : マーク
  // =============================================
  public async log2kintone(object: any, fileName: string, functionName: string, mark: string) {
    let error_message = object ? object.message : '';
    let error_object = object ? JSON.stringify(object) : '';
    let stack_trace = object ? object.stack : '';

    let resp = await (new KintoneRestAPIClient({
      auth: { apiToken: this._token }
    })).record.addRecord({
      app: this._id,
      record: {
        エラーメッセージ: { value: error_message },
        エラーオブジェクト: { value: error_object },
        stack_trace: { value: stack_trace },
        ファイル名: { value: fileName },
        関数名: { value: functionName },
        マーク: { value: mark }
      }
    });
    return resp;
  }; // log2kintone
}

