//=============================================================================
//【ファイル名】
//    apps.ts
//【アプリ名】
//    アプリ情報
//=============================================================================
import * as apps_info  from "../../apps_info";

export class Apps {

  private _confs: { env: string; code: string; name: string; id: number; token: string; }[];
  private _env: string;

  constructor(id: number) {
    this._confs = apps_info.configs;

    this._env = this.getEnvById(id);

  }

  // =============================================
  // getter / setter
  // =============================================
  public get env(): string {
    return this._env;
  }

  public get confs(): { env: string; code: string; name: string; id: number; token: string; }[] {
    return this._confs;
  }

  // =============================================
  // Method
  // =============================================
  // ---------------------------------------------
  // getConfById
  // ---------------------------------------------
  public getConfById(id: number): { env: string; code: string; name: string; id: number; token: string; } {
    return this._confs.filter(v => v.id === id)[0];
  }

  // ---------------------------------------------
  // getEnvById
  // ---------------------------------------------
  private getEnvById(id: number): string {
    return this._confs.filter(v => v.id === id)[0].env;
  }

  // ---------------------------------------------
  // getCodeById
  // ---------------------------------------------
  public getCodeById(id: number): string {
    return this._confs.filter(v => v.id === id)[0].code;
  }

  // ---------------------------------------------
  // getTokenById
  // ---------------------------------------------
  public getTokenById(id: number): string {
    return this._confs.filter(v => v.id === id)[0].token;
  }

  // ---------------------------------------------
  // getConfByCode
  // ---------------------------------------------
  public getConfByCode(code: string): { env: string; code: string; name: string; id: number; token: string; } {
    return this._confs.filter(v => (v.env === this._env && v.code === code))[0];
  }

  // ---------------------------------------------
  // getIdByCode
  // ---------------------------------------------
  public getIdByCode(code: string): number {
    return this._confs.filter(v => (v.env === this._env && v.code === code))[0].id;
  }

  // ---------------------------------------------
  // getTokenByCode
  // ---------------------------------------------
  public getTokenByCode(code: string): string {
    return this._confs.filter(v => (v.env === this._env && v.code === code))[0].token;
  }

  // ---------------------------------------------
  // isExistConfById
  // アプリid存在チェック(true：存在する / false：存在しない)
  // ---------------------------------------------
  public isExistConfById(id: number): boolean {
    return this._confs.filter(v => v.id === id).length === 0 ? false : true;
  }
}
