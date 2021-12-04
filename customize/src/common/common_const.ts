//=============================================================================
//【ファイル名】
//    common_const.ts
//【アプリ名】
//    設定情報
//【タイプ】
//    ○PC用 / ○スマートフォン用 / ●共通用
//-----------------------------------------------------------------------------
//  Copyright (c) 2021 AISIC.Inc
//=============================================================================
import * as kt from './kintone_tools';

//----------------------------
// 定数
//----------------------------
export const cc = {
  wait_time: 1000, // sleep関数使用時のセットtime
  retry: 3, // uid取得時のリトライ回数
  log_mode: true,
  duration_mode: true,
  number_ctrl: {
    pro: {
      app: 0,
      token: 'XXXXXXXXXXXXXXXXXXXXX'
    },
    dev: {
      app: 133,
      token: 'UldtRXRjbUVabGJ5UFBvcFYyM3dmQ0lXb2xadW96eVRJQmpKMVZCWA=='
    }
  }
};
