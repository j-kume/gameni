//=============================================================================
//【ファイル名】
//  error_log.ts
//【機能】
//  エラーログ関連処理
//-----------------------------------------------------------------------------
//  Copyright (c) 2021 AISIC.Inc
//=============================================================================
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

// =============================================
// log2kintone
// エラーログアプリにデータ登録
// ---------------------------------------------
// objError.appId        : エラーログアプリのアプリID
// objError.token        : エラーログアプリのAPI TOKEN
// objError.object       : エラーオブジェクト
// objError.fileName     : ファイル名
// objError.functionName : 関数名
// objError.mark         : マーク
// =============================================
export const log2kintone = async (
  objError: {appId:number; token:string; object:any; fileName:string; functionName:string; mark:string;}
  ) => {
  let error_message = objError.object ? objError.object.message : '';
  let error_object = objError.object ? JSON.stringify(objError.object) : '';
  let stack_trace = objError.object ? objError.object.stack : '';

  let resp = await (new KintoneRestAPIClient({
    auth: { apiToken: objError.token }
  })).record.addRecord({
    app: objError.appId,
    record: {
      エラーメッセージ: {value: error_message},
      エラーオブジェクト: {value: error_object},
      stack_trace: {value: stack_trace},
      ファイル名: {value: objError.fileName},
      関数名: {value: objError.functionName},
      マーク: {value: objError.mark}
    }
  });
  return resp;
}; // log2kintone

