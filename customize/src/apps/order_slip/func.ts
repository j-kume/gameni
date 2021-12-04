//=============================================================================
//【ファイル名】
//    order_slip/func.ts
//【アプリ名】
//  受注票
//-----------------------------------------------------------------------------
//  Copyright (c) 2021 AISIC.Inc
//=============================================================================
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { DateTime } from 'luxon';
import * as Kuc from 'kintone-ui-component';
import * as kt from '../../common/kintone_tools';
import * as lc from './const';


// ---------------------------------------------
// 共通入力画面制御
// ---------------------------------------------
export const setCommonInputCtrl = (record: any) => {
  record.uid.disabled = true;
  record.no.disabled = true;
  record.lookup_key.disabled = true;
  record.record_title.disabled = true;
  record.仕入合計.disabled = true;
  record.販売合計.disabled = true;
  record.お届け先住所.disabled = true;
  record.運送会社検索.disabled = true;

  // 個人納入先のセット
  createBtnIndividual();

  // 運送会社検索へのセット
  getShippingCompanySearch(record);

};  // setCommonInputCtrl

// ---------------------------------------------
// validation
// ---------------------------------------------
export const validation = (event: any) => {

  const record = event.record;
  console.log(record);

  let errorFlg = false;

  // let errorMsg = '';

  // if (record.XXXXX.value) {
  //   record.XXXXX.error = '入力しないでください。';
  //   errorFlg = true;
  // }

  if (!isIncludeIncompleteWorks(record.未完了作業.value)) {
    record.未完了作業.error = '未完了作業の選択肢がプログラムと不一致です';
    errorFlg = true;
  }

  if (errorFlg === true) {
    event.error = '入力内容に不備があります。';
  }
};  // validation

// ---------------------------------------------
// getLookupKey
// レコード情報検索 取得
// ---------------------------------------------
export const getLookupKey = (arg1: string, arg2: string, arg3: string, arg4: string) => {
  let ret = '';
  let tmp = [];

  if (arg1) { tmp.push(arg1.replace(/-/g, '')); }
  if (arg2) { tmp.push(arg2); }
  if (arg3) { tmp.push(arg3); }
  if (arg4) { tmp.push(arg4); }
  ret = tmp.join(' ');

  return ret;
};


// ---------------------------------------------
// getRecordTitle
// レコードタイトル 取得
// ---------------------------------------------
export const getRecordTitle = (arg1: string, arg2: string, arg3: string, arg4: string) => {
  let ret = '';
  let tmp = [];

  if (arg1) { tmp.push(arg1.replace(/-/g, '')); }
  if (arg2) { tmp.push(arg2); }
  if (arg3) { tmp.push(arg3); }
  if (arg4) { tmp.push(arg4); }
  ret = tmp.join(' ');

  return ret;
};


// ---------------------------------------------
// createBtnIndividual
// 個人納入先のセット
// ---------------------------------------------
export const createBtnIndividual = () => {

  const sp_individual = kt.getSpaceElement('sp_individual');
  const btn_individual = new Kuc.Button({
    type: 'submit',
    text: '個人納入先のセット',
    id: 'btnIndividual',
    className: 'btn_individual',
  });
  btn_individual.addEventListener("click", () => {
    let objRecord = kt.getRecord();

    objRecord.record.個人納入先検索.value = getIndividual(objRecord.record.注文会社名.value, objRecord.record.発注センター.value);
    objRecord.record.個人納入先検索.lookup = 'UPDATE';

    kt.setRecord(objRecord);
  });
  sp_individual?.appendChild(btn_individual);
};  // createBtnIndividual


// ---------------------------------------------
// 運送会社検索へのセット
// ---------------------------------------------
export const getShippingCompanySearch = (record: any) => {
  record.運送会社検索.value = record.運送会社.value;
  record.運送会社検索.lookup = 'UPDATE';
};  // getShippingCompanySearch


// ---------------------------------------------
// 個人納入先検索初期値セット
// ---------------------------------------------
export const getIndividual = (company: string, center: string) => {
  let ret = '';
  let tmp = [];

  if (company) { tmp.push(company); }
  if (center) { tmp.push(center); }
  ret = tmp.join(' ');

  return ret;
};  // getIndividual


// ---------------------------------------------
// 配送会社閲覧フラグ
// ---------------------------------------------
export const getDeliveryCompanyDispFlg = (incomplete_works: string[]) => {
  let mode = false;

  let isInstructions = false;
  let isConfirmed = false;
  let isReport = false;
  let isVerify = false;

  if (incomplete_works.includes('配送指示')) { isInstructions = true; }
  if (incomplete_works.includes('納品日確定')) { isConfirmed = true; }
  if (incomplete_works.includes('納品日連絡')) { isReport = true; }
  if (incomplete_works.includes('納品報告確認')) { isVerify = true; }

  if (isInstructions == true && isConfirmed == true && isReport == true && isVerify == true) {
    mode = false;
  } else if (isInstructions == true && isConfirmed == true && isReport == true && isVerify == false) {
    mode = false;
  } else if (isInstructions == true && isConfirmed == true && isReport == false && isVerify == true) {
    mode = false;
  } else if (isInstructions == true && isConfirmed == true && isReport == false && isVerify == false) {
    mode = false;
  } else if (isInstructions == true && isConfirmed == false && isReport == true && isVerify == true) {
    mode = false;
  } else if (isInstructions == true && isConfirmed == false && isReport == true && isVerify == false) {
    mode = false;
  } else if (isInstructions == true && isConfirmed == false && isReport == false && isVerify == true) {
    mode = false;
  } else if (isInstructions == true && isConfirmed == false && isReport == false && isVerify == false) {
    mode = false;
  } else if (isInstructions == false && isConfirmed == true && isReport == true && isVerify == true) {
    mode = true;
  } else if (isInstructions == false && isConfirmed == true && isReport == true && isVerify == false) {
    mode = true;
  } else if (isInstructions == false && isConfirmed == true && isReport == false && isVerify == true) {
    mode = true;
  } else if (isInstructions == false && isConfirmed == true && isReport == false && isVerify == false) {
    mode = true;
  } else if (isInstructions == false && isConfirmed == false && isReport == true && isVerify == true) {
    mode = true;
  } else if (isInstructions == false && isConfirmed == false && isReport == true && isVerify == false) {
    mode = true;
  } else if (isInstructions == false && isConfirmed == false && isReport == false && isVerify == true) {
    mode = true;
  } else if (isInstructions == false && isConfirmed == false && isReport == false && isVerify == false) {
    mode = false;
  } else {
    mode = false;
  }

  return mode ? '可' : '不可';

};  // getDeliveryCompanyDispFlg


// ---------------------------------------------
// 合計金額
// ---------------------------------------------
export const getTotalPrice = (unit_price: number, amount: number) => unit_price * amount;


// ---------------------------------------------
// お届け先名
// ---------------------------------------------
export const getShippingName = (uid: number, company: string, center: string, individual: string) => {
  let ret = '';
  let tmp = [];

  if (uid) { 
    ret = individual;
  } else {
    if (company) { tmp.push(company); }
    if (center) { tmp.push(center); }
  
    ret = tmp.join(' ');
  }
  

 
  return ret;
};  // getShippingName


// ---------------------------------------------
// お届け先住所
// ---------------------------------------------
export const getShippingAddress = (uid: number, company: string, individual: string) => {
  let ret = '';
  if (uid) {
    ret = individual;
  } else {
    ret = company;
  }

  return ret;
};  // getShippingAddress


// ---------------------------------------------
// お届け先電話番号
// ---------------------------------------------
export const getShippingTel = (uid: number, company: string, individual: string) => {
  let ret = '';

  if (uid) {
    ret = individual;
  } else {
    ret = company;
  }
  
  return ret;
};  // getShippingTel


// ---------------------------------------------
// マップリンク
// ---------------------------------------------
export const getMapLink = (address: string) => {
  let ret = '';
  if (address) {
    ret = encodeURI('https://www.google.com/maps/search/?api=1&query=' + address);
  } else {
    ret = '';
  }
  return ret;
};  // getMapLink


// ---------------------------------------------
// 未完了作業 選択肢 包含チェック
// TRUE: 含まれる / FALSE: 含まれない
// ---------------------------------------------
export const isIncludeIncompleteWorks = (inputs: string[]) => {

  const correct = [
    '配送指示',
    '納品日確定',
    '納品日連絡',
    '納品報告確認'
  ];

  let ret = true;

  // correctに存在しない要素
  const not_exists_correct = inputs.filter(v => !correct.includes(v));
  if (not_exists_correct.length !== 0) {
    ret = false;
  }

  return ret;
};  // isIncludeIncompleteWorks


// ---------------------------------------------
// 帳票用出力_注文会社名
// ---------------------------------------------
export const getCompanyName = (company: string, center: string) => {

  let set_name = [company, center].join(' ');

  return set_name;
};  // getCompanyName





// ---------------------------------------------
// 受注番号
// ---------------------------------------------
export const getYearRecords = async (year: string, target: { app: number; token: string; name: string }) => {
  let getRecords = await (new KintoneRestAPIClient()).record.getRecords({
    app: target.app,
    query: '年度 = ' + year + ' order by 年度内連番 desc limit 1'
  }).then(resp => {
    return resp;
  }).catch(error => {
    console.log(error);
    return Promise.reject(new Error('GET : ' + target.name + ' ' + target.app + ' / ' + error.message));
  });

  return getRecords;
};  // getCompanyName



// ---------------------------------------------
// 受注番号
// ---------------------------------------------
export const getNo = (year: string, count_no: number) => {

  let set_no = year + '' + kt.padding(count_no, 4);
  return set_no;
};  // getCompanyName


// ---------------------------------------------
// 今年度の取得
// ---------------------------------------------
export const getOrderSlipYear = (create_date: string) => {
  let year = '';
  let create_year = DateTime.fromISO(create_date).toFormat('yyyy');
  let start_line = DateTime.fromISO(create_year + lc.FISCAL_START_YEAR); // 2021-08-01
  let end_line = DateTime.fromISO(create_year + lc.FISCAL_END_YEAR);     // 2021-07-31

  // もし、-08-01以上だったら
  if ( Number(DateTime.fromISO(create_date).ts) >= Number(start_line.ts)) {
    year = String(create_year);
  }
  // もし、-07-31以下だったら
  if ( Number(DateTime.fromISO(create_date).ts) <= Number(end_line.ts)) {
    year = String(Number(create_year) - 1);
  }

  return year;
};  // getCompanyName



// ---------------------------------------------
// カレンダータイトル
// ---------------------------------------------
export const getCalendarName = (arg1: string, arg2: string, arg3: string) => {
  let tmp = [];
  if (arg1) { tmp.push(arg1); }
  if (arg2) { tmp.push(arg2); }
  if (arg3) { tmp.push(arg3); }

  let name = tmp.join(' ');
  return name;
};  // getCompanyName
