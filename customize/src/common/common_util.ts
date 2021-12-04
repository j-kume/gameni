//=============================================================================
//【ファイル名】
//    common_util.js
//【アプリ名】
//    開発用設定情報
//【タイプ】
//    ○PC用 / ○スマートフォン用 / ●共通用
//-----------------------------------------------------------------------------
//  Copyright (c) 2019 AISIC.Inc
//=============================================================================
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import * as commonConst from './common_const';

// =============================================
// 最近接遇数計算処理
// ---------------------------------------------
// num： 入力値 Double型
// =============================================
export const roundToEven = (num: number) => {
  let r = (0 < num) ? num % 2 : (num % 2) + 2;
  return (1 < r) ? Math.floor(num + 0.5) : Math.ceil(num - 0.5);
}

// =============================================
// 丸め処理　rounding新設 2020.6.25
// ---------------------------------------------
// num：        入力値 数値(Double型)をどの範囲でも取りうる
// ret：        出力値 digitで定めた桁数で返す
// type：       丸め種類を以下4種類より選択
//                  ROUND_TYPE.round:四捨五入
//                  ROUND_TYPE.ceil:切り上げ
//                  ROUND_TYPE.floor:切り捨て
//                  ROUND_TYPE.even:最近接偶数
// digit：      戻り値の位　を示す　以下は例示
//                   2：百の位
//                   1：十の位
//                   0：整数
//                  -1：小数点第一位
//                  -2：小数点第二位　など
//                  取りうる値は通常+15 ～ -10の範囲
// precision：   ceil(切り上げ)のみで使用する
// 　　　　　　小数の入力値　についてはdouble型であるため
//            前処理として、この位で最近接偶数処理を行ってから
//            切り捨て処理を行う
// なお、kintoneのデフォルトの小数処理は　
// 小数部の桁数：4　丸めかた：最近接遇数への丸めとなっている。
// （アプリの設定：　設定 -> 高度な設定 -> 数値と計算の精度　で変更は可能）
// =============================================
export const ROUND_TYPE = {
  round: 0,
  ceil: 1,
  floor: 2,
  even: 3
};
export const rounding = (num: number, type: number, digit: number, precision: number) => {

  // 戻り値の桁数を決定
  // デフォルトは digitは小数部の桁数0, precisionは小数部の桁数4とする
  digit = digit * -1 || 0;
  precision = precision * -1 || 4;

  // 標準のMathメソッドは小数点第一位に対する処理であるため
  // 位を調整するためのパラメータ を設定
  // 例： ret = Math.round(num * base_d) / base_d のように用いる
  let ret = 0;
  let base_d = Math.pow(10, digit)
  let base_p = Math.pow(10, precision)

  switch (type) {
    //四捨五入
    case ROUND_TYPE.round:
      ret = Math.round(num * base_d) / base_d;
      break;

    //切り上げ
    case ROUND_TYPE.ceil:
      // 入力値の小数部の桁数（精度）について、最近接偶数で前処理をする仕様とする
      // これがないとdouble型での精度問題のために切り上げの場合のみ不具合が出るため
      // 例： 1234.00000000001 などを 1235 と返してしまうことを防止する
      ret = roundToEven(num * base_p) / base_p;
      ret = Math.ceil(ret * base_d) / base_d;
      break;

    //切り捨て
    case ROUND_TYPE.floor:
      ret = Math.floor(num * base_d) / base_d;
      break;

    //最近接偶数
    case ROUND_TYPE.even:
      ret = roundToEven(num * base_d) / base_d;
      break;

    //デフォルト（四捨五入）
    default:
      ret = Math.round(num * base_d) / base_d;
      break;
  }

  return ret;
}; // end rounding

//----------------------------
// 消費税額計算 [税抜 -> 消費税]
//----------------------------
export const calcTax = (exPrice: number, kbnRate: string) => {
  let tax = Number(kbnRate.slice(0, -1)) / 100;
  return rounding((exPrice * tax), commonConst.cc.tax_round, 0, commonConst.cc.precision);
}

//----------------------------
// 消費税額計算 [税込 -> 消費税]
//----------------------------
export const calcTax2 = (inPrice: number, kbnRate: string) => {
  let taxRate = Number(kbnRate.slice(0, -1));
  let tax = rounding(Number(inPrice) * taxRate / (100 + taxRate), commonConst.cc.tax_round, 0, commonConst.cc.precision);
  return tax;
}

//----------------------------
// スリープ処理
//----------------------------
export const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

// //----------------------------
// // 番号管理マスタのuid更新
// //----------------------------
// const getNumber = async (arg_code, arg_size, arg_retry) => {
//     let size = arg_size || 1;
//     let retry = arg_retry === undefined ? 1 : arg_retry;
//     let nextUid = -1;

//     if (retry === 1) {
//         durationStart('getNumber');
//     }
//     outputLog('TRY: ' + retry);

//     if (retry >= KT_CONST.RETRY) {
//         durationEnd('getNumber');
//         return nextUid;
//     }

//     try {
//         // 認証方法
//         let kintoneAuth = new kintoneJSSDK.Auth();
//         kintoneAuth.setApiToken({ apiToken: KT_CONST.API_TOKEN_NUMBER_MNG });
//         let kintoneRecord = new kintoneJSSDK.Record({ connection: new kintoneJSSDK.Connection({ auth: kintoneAuth }) });

//         // uidの取得
//         let resp = await kintoneRecord.getRecords({
//             "app": KT_APP.NUMBER_MNG,
//             "query": 'コード = "' + arg_code + '"'
//         });

//         // param
//         let updatekey = {
//             field: 'コード',
//             value: arg_code
//         };
//         let setrecord = {
//             uid: { value: Number(resp.records[0].uid.value) + Number(size) }
//         };

//         // 番号更新
//         let upload = await kintoneRecord.updateRecordByUpdateKey({
//             "app": KT_APP.NUMBER_MNG,
//             "updateKey": updatekey,
//             "record": setrecord,
//             "revision": resp.records[0].$revision.value
//         });

//         // nextuidのreturn
//         nextUid = Number(resp.records[0].uid.value) + 1;
//         durationEnd('getNumber');
//         return nextUid;
//     } catch (error) {
//         console.log(error);
//         retry++;
//         await sleep(KT_CONST.WAIT_TIME);
//         nextUid = await getNumber(arg_code, size, retry);
//         durationEnd('getNumber');
//         return nextUid;
//     }
// }

//----------------------------
// uid未設定一覧の取得
//----------------------------
export const getRecordsNoUid = async (target: { app: number; token: string; name: string }) => {
  durationStart('getRecordsNoUid:' + target.name);

  return await (new KintoneRestAPIClient({
    auth: { apiToken: atob(target.token) }
  })).record.getAllRecords({
    app: target.app,
    condition: 'uid = ""'
  }).then(resp => {
    durationEnd('getRecordsNoUid:' + target.name);
    return resp;
  }).catch(error => {
    durationEnd('getRecordsNoUid:' + target.name);
    console.log(error);
    return Promise.reject(new Error('GET : ' + target.name + ' ' + target.app + ' / ' + error.message));
  });
}

//----------------------------
// ログ出力
//----------------------------
export const outputLog = (arg_msg: string) => {
  let msg = arg_msg || "";
  if (commonConst.cc.log_mode) {
    let now = new Date();
    let year = now.getFullYear();
    let month = ('00' + (Number(now.getMonth()) + 1)).slice(-2);
    let date = ('00' + now.getDate()).slice(-2);
    let hour = ('00' + now.getHours()).slice(-2);
    let min = ('00' + now.getMinutes()).slice(-2);
    let sec = ('00' + now.getSeconds()).slice(-2);
    let msec = ('000' + now.getMilliseconds()).slice(-3);
    console.log("[" + year + "/" + month + "/" + date + " " + hour + ":" + min + ":" + sec + ":" + msec + "] " + msg);
  }
}

export const durationStart = (arg_label: string) => {
  let label = arg_label || "";
  if (commonConst.cc.duration_mode) {
    outputLog(label + ':start');
    performance.mark(label + ':start');
  }
}
export const durationEnd = (arg_label: string) => {
  let label = arg_label || "";
  if (commonConst.cc.duration_mode) {
    performance.mark(label + ':end');
    performance.measure(label, label + ':start', label + ':end');
  }
}
export const durationOutput = () => {
  if (commonConst.cc.duration_mode) {
    let entries = performance.getEntriesByType("measure");
    for (let i = 0; i < entries.length; i++) {
      console.log(entries[i].name + ' : ' + entries[i].duration);
    }
    performance.clearMarks();
    performance.clearMeasures();
  }
}

//----------------------------
// 経過時間測定
// [mode]
// s: 計測開始 / e: 計測終了 / n: 経過時間出力
//----------------------------
export const outputTime = (mode: string, arg_label: string) => {
  let label = arg_label || "";
  if (commonConst.cc.duration_mode) {
    switch (mode) {
      case 's':
        console.time(label);
        break;
      case 'n':
        console.timeLog(label);
        break;
      case 'e':
        console.timeEnd(label);
        break;
      default:
        break;
    }
  }
}



// //----------------------------
// // updFreeeAccessToken
// //----------------------------
// export const updFreeeAccessToken = async (record: any) => {
//   // // --------------------------------------------------------
//   // // 2回目以降のリフレッシュトークンからアクセストークンの取得
//   // // --------------------------------------------------------
//   // let token_url = "https://accounts.secure.freee.co.jp/public_api/token";
//   // let redirect_uri = "urn:ietf:wg:oauth:2.0:oob";
//   // let client_id = "a9a3e3d61547c674aff4a717d0a45acd2d8b3e8bf2e92a9964032e792398d1d7";
//   // let client_secret = "2c52ea42c21a95d30bc0cbb93fce7120c728d83be00faccb29ff56bb0bca8c31";
//   // let refresh_token = record.RefreshToken.value;
//   // let access_token = null;

//   // let headers = {
//   //     'cache-control': 'no-cache',
//   //     'Content-Type': 'application/json'
//   // };

//   // let body = {
//   //     'grant_type': "refresh_token",
//   //     'redirect_uri': redirect_uri,
//   //     'client_id': client_id,
//   //     'client_secret': client_secret,
//   //     'refresh_token': refresh_token
//   // };

//   // // tokensObj
//   // let jsonRespObj = await kintone.proxy(token_url, 'POST', headers, body).then(function (resp) {
//   //     console.log(resp);
//   //     return JSON.parse(resp[0]);
//   // }, function (error) {
//   //     // error
//   //     console.log(error); // proxy APIのレスポンスボディ(文字列)を表示
//   // });

//   // let set_record = {
//   //     使用期限日_シリアル情報: { value: luxon.DateTime.local().plus({ hours: 23 }).ts },
//   //     使用期限日: { value: luxon.DateTime.local().plus({ hours: 23 }).toFormat('yyyy-MM-dd HH:mm:ss') },
//   //     AccessToken: { value: jsonRespObj.access_token },
//   //     RefreshToken: { value: jsonRespObj.refresh_token }
//   // };

//   // // 更新
//   // let upd = await (new KintoneRestAPIClient()).record.updateRecord({
//   //     "app": KintoneTools.getId(),
//   //     "id": record.$id.value,
//   //     "record": set_record
//   // });

//   // // set_record['uid'] = {value: record.uid.value};
//   // set_record['$id'] = { value: record.$id.value };

//   // return set_record;

// };  // updFreeeAccessToken
