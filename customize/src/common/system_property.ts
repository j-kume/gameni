//=============================================================================
//【ファイル名】
//  _system_property.js
//【機能】
//  SessionStorage関連処理
//-----------------------------------------------------------------------------
//  Copyright (c) 2021 AISIC.Inc
//=============================================================================
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { KrfNumberCtrl } from '../krf/number_ctrl.krf';

const SESSION_STORAGE_KEY = 'SYSTEM_PROPERTY';

//----------------------------
// setSystemProperty
//----------------------------
export const setSystemProperty = async (objNumberCtrl: {app: number; token: string;}, thisId: number) => {
  // セッション情報が存在しない場合
  if (!getSession()) {
    // セッション情報セット
    await setSession(objNumberCtrl);
  }

  // セッション情報が存在しているが、自身のアプリが含まれていない場合
  if (getSession()) {
    if (!isExsitAppId(getSessionToObject(), thisId)) {
      // セッション情報セット
      await setSession(objNumberCtrl);
    }
  }

  // 番号管理マスタに、自身のアプリが含まれていない場合
  if (!isExsitAppId(getSessionToObject(), thisId)) {
    throw new Error('番号管理マスタに、現在使用しているアプリ情報が登録されていません。');
  }
};  // setSystemProperty

//----------------------------
// getSession
//----------------------------
export const getSession = ():string => {
  let strSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
  let ret = strSession==null?'':strSession;
  return ret;
};  // getSession

//----------------------------
// getSessionToObject
//----------------------------
export const getSessionToObject = () => {
  return JSON.parse(getSession());
};  // getSessionToObject

//----------------------------
// getAppInfo
//----------------------------
export const getAppInfo = (appCode: string) => {
  return getSessionToObject()[appCode];
};  // getAppInfo

//----------------------------
// setSession
//----------------------------
export const setSession = async (number_ctrl: {app: number; token: string;}) => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);

  let getRecords = await (new KintoneRestAPIClient({
    auth: { apiToken: atob(number_ctrl.token) }
  })).record.getAllRecords<KrfNumberCtrl>({
    app: number_ctrl.app,
    condition: ''
  });

  let json:any = {};
  getRecords.forEach(v => {
    json[v.アプリCODE.value] = {
      app: v.アプリID.value,
      token: btoa(v.API_TOKEN.value)
    }
  });

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(json));
}; // setSession

//----------------------------
// isExsitAppId 
// true:存在している false:存在していない
//----------------------------
export const isExsitAppId = (objSession:any, thisId:number) => {
  return Object.keys(objSession).map(v => Number(objSession[v].app)).includes(Number(thisId));
};  // isExsitAppId

//----------------------------
// getAppCode
// Session情報よりアプリIDからアプリCODEを取得する
//----------------------------
export const getAppCode = (thisId:number) => {
  let code = '';
  let objSession = getSessionToObject();
  code = Object.keys(objSession).filter(v => Number(objSession[v].app) == Number(thisId)).toString();
  return code;
};  // getAppCode

//----------------------------
// getNumberCtrl
//----------------------------
export const getNumberCtrl = async (number_ctrl: {app: number; token: string;}, appCode:string) => {
  let record:KrfNumberCtrl[] = [];
  let resp = await (new KintoneRestAPIClient({
    auth: { apiToken: atob(number_ctrl.token) }
  })).record.getRecords<KrfNumberCtrl>({
    app: number_ctrl.app,
    query: 'アプリCODE = "' + appCode + '"'
  });
  console.log(resp);
  if (resp.records.length !== 0) {
    record = resp.records;
  }
  return record;
};  // getNumberCtrl

//----------------------------
// getNextUidAndIncrement
//----------------------------
export const getNextUidAndIncrement = async (number_ctrl:{app: number; token: string;}, appCode:string, prmSize?:number) => {
  let size = prmSize == undefined ? 1 : Number(prmSize);

  let nextUid = 0;

  let getRecords = await getNumberCtrl(number_ctrl, appCode);

  if (getRecords.length===0){
    nextUid = -1;
  } else {
    let getRecord = getRecords[0];
    let resultUpdNumberCtrl = await updNumberCtrl(
      number_ctrl,
      appCode,
      Number(getRecord.uid.value),
      Number(getRecord.$revision.value),
      size
    );
    console.log(resultUpdNumberCtrl);
    nextUid = Number(getRecord.uid.value) + 1;
  }
  return nextUid;
};  // getNextUidAndIncrement

//----------------------------
// updNumberCtrl
//----------------------------
export const updNumberCtrl = async (
  number_ctrl:{app: number; token: string;}, 
  appCode:string,
  now_uid:number,
  prmRevision:number,
  prmSize:number) => {
  let size = prmSize == undefined ? 1 : Number(prmSize);

  // 番号管理マスタへuidの更新
  return await (new KintoneRestAPIClient({
    auth: { apiToken: atob(number_ctrl.token) }
  })).record.updateRecord({
    app: number_ctrl.app,
    updateKey: {
      field: 'アプリCODE',
      value: appCode
    },
    record: {
      uid: { value: Number(now_uid) + size }
    },
    revision: Number(prmRevision)
  });
};  // updNumberCtrl



