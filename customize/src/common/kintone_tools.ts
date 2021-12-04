//=============================================================================
//【ファイル名】
//    kintone_tools.js
//-----------------------------------------------------------------------------
//  Copyright (c) 2018 kintone lovers
//=============================================================================
// import { DateTime } from 'luxon';

// =============================================
// 定数
// =============================================
export const ktconst = {
  "round": {
    "round": 0,
    "ceil": 1,
    "floor": 2
  }
};

// =============================================
// Uniq番号生成
// =============================================
export const createUniqNumber = () => {
  return Number(new Date().getTime().toString() + padding(Math.floor(Math.random() * 1000), 3));
};  // end createUniqNumber

// // =============================================
// // 指定したフィールドの
// // カウントアップ＆ゼロ埋めした値の生成
// // =============================================
// export const createZeroFillNextValue = (records, field, len)=>{
//     let nextVal = 1;
//     if (records.length !== 0) {
//         nextVal = Number(records[0][field].value) + 1;
//     }
//     return padding(nextVal, len);
// };  // end createZeroFillNextValue

// // =============================================
// // 次のuid生成
// // ---------------------------------------------
// // Required Field : uid
// // =============================================
// export const createNextUid = function (records) {
//     let nextUid = 1;
//     if (records.length !== 0) {
//         nextUid = Number(records[0].uid.value) + 1;
//     }
//     return nextUid;
// };  // end createNextUid

// // =============================================
// // 画面情報に次のuidをセットする
// // ---------------------------------------------
// // Required Field : uid
// // =============================================
// export const setNextUid = function (record, records) {
//     record.uid.value = createNextUid(records);
// };  // end setNextUid

// // =============================================
// // 画面情報にレコードタイトルをフィールドコードを元にセット
// // ---------------------------------------------
// // Required Field : record_title
// // =============================================
// export const setRecordTitle = function (record, fields) {
//     record.record_title.value = joinFieldValue(record, fields);
// };  // end setRecordTitle

// // =============================================
// // 画面情報にレコードタイトルに値を直接セット
// // ---------------------------------------------
// // Required Field : record_title
// // =============================================
// export const setRecordTitleByValue = function (record, values, delimiter) {
//     let strDelimiter = delimiter || ' ';
//     record.record_title.value = values.join(strDelimiter);
// };  // end setRecordTitleByValue

// // =============================================
// // 画面情報にlookup_Keyをフィールドコードを元にセット
// // ---------------------------------------------
// // Required Field : lookup_key
// // =============================================
// export const setLookupKey = function (record, fields) {
//     record.lookup_key.value = joinFieldValue(record, fields);
// };  // end setLookupKey

// // =============================================
// // 画面情報にlookup_Keyに値を直接セット
// // ---------------------------------------------
// // Required Field : lookup_key
// // =============================================
// export const setLookupKeyByValue = function (record, values, delimiter) {
//     let strDelimiter = delimiter || ' ';
//     record.lookup_key.value = values.join(strDelimiter);
// };  // end setLookupKeyByValue

// =============================================
// 指定フィールド値結合
// =============================================
export const joinFieldValue = (record: { [key: string]: { [key: string]: string } }, fields: string[], delimiter?: string) => {
  let strDelimiter = delimiter || ' ';
  let retStr = '';

  fields.forEach(val => {
    if (record[val].value) {
      retStr += (record[val].value + strDelimiter);
    }
  });
  retStr = retStr.slice(0, -1);
  return retStr;
};  // end joinFieldValue

// =============================================
// 数値を3桁カンマ区切りにする
// =============================================
export const commaSeparate = (num: number) => {
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}; // end commaSeparate

// =============================================
// パディング
// ---------------------------------------------
// fillStrが未入力の場合には、
// 「0」でパディングする
// =============================================
export const padding = (num: number, len: number, fillStr?: string) => {
  let str = fillStr || '0';
  let base = str.repeat(len);
  return (base + num).slice(-1 * len);
}; // end padding

// =============================================
// 丸め処理
// ---------------------------------------------
// num を 10^digit位に丸める。
// 丸め方は type で指定
// type：ktconst.round にて指定
// =============================================
export const rounding = (num: number, type: number, digit?: number) => {
  digit = digit ? digit * -1 : 0;

  let ret = num * Math.pow(10, digit);

  switch (type) {
    case ktconst.round.round:
      ret = Math.round(ret);
      break;
    case ktconst.round.ceil:
      ret = Math.ceil(ret);
      break;
    case ktconst.round.floor:
      ret = Math.floor(ret);
      break;
    default:
      ret = Math.round(ret);
      break;
  }

  ret /= Math.pow(10, digit);

  return ret;
}; // end rounding

// =============================================
// クエリパラメータから値取得
// =============================================
export const getQueryToObject = (strParam: string) => {
  let objRet: any = {};
  let aryParams = strParam.split('&');
  aryParams.forEach(function (val) {
    let aryTmp = val.split('=');
    objRet[aryTmp[0]] = aryTmp[1];
  });
  return objRet;
}; // end getQueryToObject

// =============================================
// 現在開いているアプリのIDの取得(PC・モバイル 不問)
// ---------------------------------------------
// return number
//        -1 : アプリIDが取得できない
// =============================================
export const getId = () => {
  let ret = -1;
  let id = null;
  if (isPcMode()) {
    id = kintone.app.getId();
  }
  if (isMobileMode()) {
    id = kintone.mobile.app.getId();
  }
  if (id !== null) {
    ret = id;
  }
  return ret;
}
// // =============================================
// // 現在開いているアプリのIDの取得(PC・モバイル 不問)
// // [deprecated]
// // =============================================
// export const getThisAppId = () => {
//   let thisAppId = -1;
//   if (isPcMode()) {
//     let tmpId = kintone.app.getId();
//     thisAppId = tmpId==null ? -1 : tmpId;
//   }
//   if (isMobileMode()) {
//     let tmpId = kintone.mobile.app.getId();
//     thisAppId = tmpId==null ? -1 : tmpId;
//   }
//   return thisAppId;
// }; // end getThisAppId

// =============================================
// スペースフィールドの要素の取得(PC・モバイル 不問)
// =============================================
export const getSpaceElement = (id: string) => {
  let elm = null;
  if (isPcMode()) {
    elm = kintone.app.record.getSpaceElement(id);
  }
  if (isMobileMode()) {
    elm = kintone.mobile.app.record.getSpaceElement(id);
  }
  return elm;
}; // end getSpaceElement

// =============================================
// 関連レコード一覧の参照先のアプリIDを取得(PC・モバイル 不問)
// =============================================
export const getRelatedRecordsTargetAppId = (fieldCode: string) => {
  let appId = null;
  if (isPcMode()) {
    appId = kintone.app.getRelatedRecordsTargetAppId(fieldCode);
  }
  if (isMobileMode()) {
    appId = kintone.mobile.app.getRelatedRecordsTargetAppId(fieldCode);
  }
  return appId;
}; // end getRelatedRecordsTargetAppId

// =============================================
// ルックアップフィールドの参照先のアプリIDを取得(PC・モバイル 不問)
// =============================================
export const getLookupTargetAppId = (fieldCode: string) => {
  let appId = null;
  if (isPcMode()) {
    appId = kintone.app.getLookupTargetAppId(fieldCode);
  }
  if (isMobileMode()) {
    appId = kintone.mobile.app.getLookupTargetAppId(fieldCode);
  }
  return appId;
}; // end getLookupTargetAppId

// =============================================
// レコードの値を取得(PC・モバイル 不問)
// =============================================
export const getRecord = () => {
  let objRecord = null;
  if (isPcMode()) {
    objRecord = kintone.app.record.get();
  }
  if (isMobileMode()) {
    objRecord = kintone.mobile.app.record.get();
  }
  return objRecord;
}; // end getRecord

// =============================================
// レコードに値をセットする(PC・モバイル 不問)
// =============================================
export const setRecord = (objRecord: { [key: string]: { [key: string]: string } }) => {
  if (isPcMode()) {
    kintone.app.record.set(objRecord);
  }
  if (isMobileMode()) {
    kintone.mobile.app.record.set(objRecord);
  }
}; // end setRecord

// =============================================
// レコード一覧のクエリ文字列を取得(PC・モバイル 不問)
// =============================================
export const getQueryCondition = () => {
  let condition = null;
  if (isPcMode()) {
    condition = kintone.app.getQueryCondition();
  }
  if (isMobileMode()) {
    condition = kintone.mobile.app.getQueryCondition();
  }
  return condition;
}; // end getQueryCondition

// =============================================
// レコード一覧のオプション付きクエリ文字列を取得(PC・モバイル 不問)
// =============================================
export const getQuery = () => {
  let query = null;
  if (isPcMode()) {
    query = kintone.app.getQuery();
  }
  if (isMobileMode()) {
    query = kintone.mobile.app.getQuery();
  }
  return query;
}; // end getQuery

// =============================================
// メニューの下側の空白部分の要素を取得(PC・モバイル 不問)
// =============================================
export const getHeaderSpaceElement = () => {
  let elm = null;
  if (isPcMode()) {
    elm = kintone.app.getHeaderSpaceElement();
  }
  if (isMobileMode()) {
    elm = kintone.mobile.app.getHeaderSpaceElement();
  }
  return elm;
}; // end getHeaderSpaceElement

// =============================================
// ポータルの上側の空白部分の要素を取得(PC・モバイル 不問)
// =============================================
export const getContentSpaceElement = () => {
  let elm = null;
  if (isPcMode()) {
    elm = kintone.portal.getContentSpaceElement();
  }
  if (isMobileMode()) {
    elm = kintone.mobile.portal.getContentSpaceElement();
  }
  return elm;
}; // end getContentSpaceElement

// =============================================
// PCモード判定
// =============================================
export const isPcMode = () => {
  let ret = false;
  if (kintone.app.getId() != null || kintone.portal.getContentSpaceElement() != null) {
    ret = true;
  }
  return ret;
}; // end isPcMode

// =============================================
// MOBILEモード判定
// =============================================
export const isMobileMode = () => {
  let ret = false;
  if (kintone.mobile.app.getId() != null || kintone.mobile.portal.getContentSpaceElement() != null) {
    ret = true;
  }
  return ret;
}; // end isMobileMode

// =============================================
// 現在日付から年齢を計算
// bd : yyyy-MM-dd形式
// =============================================
export const getAge = (bd: string) => {
  let age = -1;

  let arrBd: string[] = bd.split('-');

  if (arrBd.length !== 3) {
    return age;
  }

  // 誕生年月日
  let birthday = new Date(Number(arrBd[0]), (Number(arrBd[1]) - 1), Number(arrBd[2]));

  // 今日
  let today = new Date();

  // 今年の誕生日
  let thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

  // 今年 - 誕生年
  age = today.getFullYear() - birthday.getFullYear();

  // 今年の誕生日を迎えていなければ-1する
  if (today < thisYearBirthday) {
    age--;
  }

  return age;
}; // end getAge

// =============================================
// レコード取得結果からidのみを抽出
// =============================================
export const getIds = (records: { [key: string]: { [key: string]: string } }[]) => {
  return records.map(v => v.$id.value);
}; // end getIds

// // =============================================
// // kintone日付フィールドの値をフォーマット
// // ---------------------------------------------
// // param  strDate : kintoneの日付フィールドvalue
// //        format  : 日付フォーマット
// //                  年 : yyyy, yy
// //                  月 : MM, mm
// //                  日 : dd, d
// // ---------------------------------------------
// // return string フォーマット変更済日付文字列
// // =============================================
// export const dateFormat = (strDate: string, format: string) => DateTime.fromISO(strDate).toFormat(format);

// =============================================
// クエリ内容に応じたidを配列で取得
// =============================================
// export const getIds = async (appId:number, condition:string, orderBy:string, guestSpaceId:number) => {
//   const aryRet:number[] = [];

//   const client_param:any = {};
//   client_param.apiToken= '';
//   if (guestSpaceId) { client_param.guestSpaceId = guestSpaceId; }

//   try {
//     const client = new KintoneRestAPIClient(client_param);
//     const resp = await ().record.getAllRecords({
//       "app": appId,
//       "fields": ["$id"],
//       "condition": condition ? condition : '',
//       "orderBy": orderBy ? orderBy : ''
//     }).then(function (resp) {
//       // console.log(resp);
//       return resp;
//     }).catch(function (error) {
//       console.log(error);
//       return Promise.reject(new Error('GET : ' + appId + ' / ' + error.message));
//     });
//     console.log(resp);
//     resp.map(val => val.$id.value).forEach(val => aryRet.push(Number(val)));
//   } catch (error) {
//     console.log(error);
//   } finally {
//     return aryRet;
//   }
// }; // end getIds

// // =============================================
// // エラーログアプリにデータ登録
// // ---------------------------------------------
// // objError.appId   : エラーログアプリのアプリID
// // objError.message : エラーメッセージ
// // objError.object  : エラーオブジェクトをJSON.stringfy()したもの
// // =============================================
// export const log2kintone = async (objError) => {
//   try {
//     const client = new KintoneRestAPIClient();
//     const resp = await client.record.addRecord({
//       "app": objError.appId,
//       "record": {
//         "エラーメッセージ": { value: objError.message },
//         "エラーオブジェクト": { value: objError.object },
//         "stack_trace": {
//           value: (function () {
//             const obj = {};
//             Error.captureStackTrace(obj, arguments.callee);
//             return obj.stack;
//           })()
//         },
//         "マーク": { value: objError.mark }
//       }
//     }).then(function (resp) {
//       console.log(resp);
//       return resp;
//     }).catch(function (error) {
//       console.log(error);
//       return Promise.reject(new Error('POST : ' + objError.appId + ' / ' + error.message));
//     });
//     console.log(resp);
//   } catch (error) {
//     console.log(error);
//   }
// }; // end log2kintone

//----------------------------
// コンソールログ出力
//----------------------------
export const outputLog = (msg: string, mode?: boolean) => {
  let _msg = msg || "";
  let _mode = mode || true;
  if (_mode) {
    let now = new Date();
    let year = now.getFullYear();
    let month = ('00' + (Number(now.getMonth()) + 1)).slice(-2);
    let date = ('00' + now.getDate()).slice(-2);
    let hour = ('00' + now.getHours()).slice(-2);
    let min = ('00' + now.getMinutes()).slice(-2);
    let sec = ('00' + now.getSeconds()).slice(-2);
    let msec = ('000' + now.getMilliseconds()).slice(-3);
    console.log("[" + year + "/" + month + "/" + date + " " + hour + ":" + min + ":" + sec + ":" + msec + "] " + _msg);
  }
};

//----------------------------
// 経過時間出力
//----------------------------
export const duration = {
  start: (label: string, mode: boolean) => {
    let _label = label || "";
    let _mode = mode || true;
    if (_mode) {
      outputLog(_label + ':start');
      performance.mark(_label + ':start');
    }
  },
  end: (label: string, mode: boolean) => {
    let _label = label || "";
    let _mode = mode || true;
    if (_mode) {
      performance.mark(_label + ':end');
      performance.measure(_label, _label + ':start', _label + ':end');
    }
  },
  output: (mode?: boolean) => {
    let _mode = mode || true;
    if (_mode) {
      let entries = performance.getEntriesByType("measure");
      for (let i = 0; i < entries.length; i++) {
        console.log(entries[i].name + ' : ' + entries[i].duration);
      }
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
};

// // #############################################
// // Add repeat method to String Class for IE
// // #############################################
// if (!String.prototype.repeat) {
//   String.prototype.repeat = function (len) {
//     return Array(len + 1).join(this);
//   };
// }

