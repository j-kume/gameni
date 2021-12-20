//=============================================================================
//【ファイル名】
//    xxxxx/func.ts
//【アプリ名】
//  〇〇〇〇〇
//-----------------------------------------------------------------------------
//  Copyright (c) 2021 AISIC.Inc
//=============================================================================

// ---------------------------------------------
// 共通入力画面制御
// ---------------------------------------------
export const setCommonInputCtrl = (record: any) => {
  record.uid.disabled = true;
  record.no.disabled = true;
  record.lookup_key.disabled = true;
  record.record_title.disabled = true;
};  // setCommonInputCtrl

// ---------------------------------------------
// validation
// ---------------------------------------------
export const validation = (event: any) => {

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

// ---------------------------------------------
// getLookupKey
// レコード情報検索 取得
// ---------------------------------------------
export const getLookupKey = (arg1: string, arg2: string, arg3: string) => {
  let ret = '';
  let tmp = [];

  if (arg1) { tmp.push(arg1); }
  if (arg2) { tmp.push(arg2); }
  if (arg3) { tmp.push(arg3); }
  ret = tmp.join(' ');

  return ret;
};


// ---------------------------------------------
// getRecordTitle
// レコードタイトル 取得
// ---------------------------------------------
export const getRecordTitle = (arg1: string, arg2: string, arg3: string) => {
  let ret = '';
  let tmp = [];

  if (arg1) { tmp.push(arg1); }
  if (arg2) { tmp.push(arg2); }
  if (arg3) { tmp.push(arg3); }
  ret = tmp.join(' ');

  return ret;
};


