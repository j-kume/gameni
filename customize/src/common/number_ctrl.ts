//=============================================================================
//【ファイル名】
//  number_ctrl.ts
//【機能】
//  番号管理マスタ関連処理
//=============================================================================
import { Apps } from './apps';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

export class NumberCtrl {

  private readonly _NUMBER_CTRL_CODE: string = 'number_ctrl';

  private _conf: { env: string; code: string; name: string; id: number; token: string; };
  private _env: string;
  private _code: string;
  private _name: string;
  private _id: number;
  private _token: string;

  constructor(id: number) {
    const apps = new Apps(id);
    this._conf = apps.getConfByCode(this._NUMBER_CTRL_CODE);
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
  // ---------------------------------------------
  // getAllRecords
  // ---------------------------------------------
  public async getAllRecords() {
    let records = await (new KintoneRestAPIClient({
      auth: { apiToken: this._token }
    })).record.getAllRecords({
      app: this._id,
      condition: ''
    });
    console.log(records);
    return records;
  };  // getAllRecords

  // ---------------------------------------------
  // getRecordById
  // ---------------------------------------------
  public async getRecordById(id: number) {
    let resp = await (new KintoneRestAPIClient({
      auth: { apiToken: this._token }
    })).record.getRecords({
      app: this._id,
      query: 'アプリID=' + id
    });
    console.log(resp);
    return resp.records[0];
  };  // getRecordById

  //----------------------------
  // updateRecordById
  //----------------------------
  public async updateRecordById(id: number, record: any, revision: number) {
    return await (new KintoneRestAPIClient({
      auth: { apiToken: this._token }
    })).record.updateRecord({
      app: this._id,
      updateKey: {
        field: 'アプリID',
        value: id
      },
      record: record,
      revision: revision
    });
  };  // updateRecordById

  //----------------------------
  // getNextUidAndIncrement
  //----------------------------
  public async getNextUidAndIncrement(id: number, prmSize?: number) {
    let size = prmSize == undefined ? 1 : prmSize;

    let nextUid = -1;

    const targetRecord = await this.getRecordById(id);

    const resultUpdNumberCtrl = await this.updateRecordById(
      id,
      {
        uid: { value: Number(targetRecord.uid.value) + size }
      },
      Number(targetRecord.$revision.value)
    );
    console.log(resultUpdNumberCtrl);

    nextUid = Number(targetRecord.uid.value) + 1;

    return nextUid;
  };  // getNextUidAndIncrement
}
