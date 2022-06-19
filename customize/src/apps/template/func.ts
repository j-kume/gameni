//=============================================================================
//【ファイル名】
//  xxxxx/func.ts
//【アプリ名】
//  〇〇〇〇〇
//-----------------------------------------------------------------------------
//  Copyright (c) 2022 gameni 
//=============================================================================

/**
 * 共通入力画面制御
 * @param record レコード情報
 * @returns
 */
 export const setCommonInputCtrl = (record: any): void => {
  record.uid.disabled = true;
  record.no.disabled = true;
  record.lookup_key.disabled = true;
  record.record_title.disabled = true;
};  // setCommonInputCtrl

/**
 * validation
 * @param event 
 * @returns
 */
export const validation = (event: any): void => {

  const record = event.record;
  console.log(record);

  // let errorFlg = false;

  // let errorMsg = '入力内容に不備があります。';

  // if (record.XXXXX.value) {
  //   record.XXXXX.error = '入力しないでください。';
  //   errorFlg = true;
  // }

  // if (errorFlg === true) {
  //   event.error = errorMsg;
  // }
};  // validation


/**
 * No 取得
 * @param uid uid
 * @returns No
 */
export const getNo = (uid: number) => String(uid);


/**
 * レコード情報検索 取得
 * @param arg1 パラメータ1
 * @param arg2 パラメータ2
 * @param arg3 パラメータ3
 * @return lookup_key
 */
export const getLookupKey = (arg1: string, arg2: string, arg3: string) => {
  let ret = '';
  let tmp = [];

  if (arg1) { tmp.push(arg1); }
  if (arg2) { tmp.push(arg2); }
  if (arg3) { tmp.push(arg3); }
  ret = tmp.join(' ');

  return ret;
};


/**
 * レコードタイトル 取得
 * @param arg1 パラメータ1
 * @param arg2 パラメータ2
 * @param arg3 パラメータ3
 * @return record_title
 */
export const getRecordTitle = (arg1: string, arg2: string, arg3: string) => {
  let ret = '';
  let tmp = [];

  if (arg1) { tmp.push(arg1); }
  if (arg2) { tmp.push(arg2); }
  if (arg3) { tmp.push(arg3); }
  ret = tmp.join(' ');

  return ret;
};

