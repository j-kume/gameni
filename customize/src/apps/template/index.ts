//=============================================================================
//【ファイル名】
//    xxxxx/index.ts
//【アプリ名】
//  〇〇〇〇〇
//-----------------------------------------------------------------------------
//  Copyright (c) 2021 AISIC.Inc
//=============================================================================
import * as errorLog from '../../common/error_log';
// import * as commonConst from '../../common/common_const';
import * as kt from '../../common/kintone_tools';
import * as func from './func';

(() => {
  'use strict';

  // =============================================
  // イベントモード
  // =============================================
  const EVENT_HANDLER_MODE = kt.isMobileMode() ? 'mobile.' : '';

  // =============================================
  // ADD EVENT HANDLER
  // =============================================
  // ---------------------------------------------
  // EVENT:create.show
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.create.show'
  ], async event => {
    const record = event.record;

    try {

      func.setCommonInputCtrl(record);

      record.uid.value = '';
    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました。';
      errorLog.log2kintone({
        appId: 99999,
        token: 'XXXXXXXXXXXXX',
        object: e,
        fileName: 'template',
        functionName: 'EVENT:create.show',
        mark: ''
      });
    } finally {
      return event;
    }
  }); // create.show

  // ---------------------------------------------
  // EVENT:create.submit
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.create.submit'
  ], async event => {
    const record = event.record;

    try {

      func.validation(event);
      if (event.error) {
        return event;
      }
      // @ts-ignore
      let number_adjust = THIS_APP_PROPERTY.number_adjust ? Number(THIS_APP_PROPERTY.number_adjust) : 0;

      // uidをセットする
      let nextUid = 0;

      // 番号管理
      let uid = Number(nextUid) + Number(number_adjust); //番号調整用パラメーター
      // @ts-ignore
      let no = await propertySet(uid);
      let lookup_key = func.getLookupKey(record.AAAAA.value, record.BBBBB.value, no);
      let record_title = func.getRecordTitle(record.AAAAA.value, record.BBBBB.value, no);

      record.uid.value = uid;
      record.no.value = no;
      record.lookup_key.value = lookup_key;
      record.record_title.value = record_title;

    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました。';
      errorLog.log2kintone({
        appId: 99999,
        token: 'XXXXXXXXXXXXX',
        object: e,
        fileName: 'template',
        functionName: 'EVENT:create.submit',
        mark: ''
      });
    } finally {
      return event;
    }
  }); // create.submit

  // // ---------------------------------------------
  // // EVENT:create.submit.success
  // // ---------------------------------------------
  // kintone.events.on([
  //   EVENT_HANDLER_MODE + 'app.record.create.submit.success'
  // ], async event => {
  //   const record = event.record;

  //   return event;
  // }); // create.submit.success

  // // ---------------------------------------------
  // // [Promise非対応]
  // // EVENT:create.change.<field_code>
  // // ---------------------------------------------
  // kintone.events.on([
  //     EVENT_HANDLER_MODE + 'app.record.create.change.<field_code>'
  // ], event => {
  //     const record = event.record;

  //     return event;
  // }); // create.change.<field_code>

  // ---------------------------------------------
  // EVENT:edit.show
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.show', 'app.record.index.edit.show'
  ], async event => {
    const record = event.record;

    try {

      func.setCommonInputCtrl(record);

    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました。';
      errorLog.log2kintone({
        appId: 99999,
        token: 'XXXXXXXXXXXXX',
        object: e,
        fileName: 'template',
        functionName: 'EVENT:create.submit',
        mark: ''
      });
    } finally {
      return event;
    }
  }); // edit.show


  // ---------------------------------------------
  // EVENT:edit.submit
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.submit', 'app.record.index.edit.submit'
  ], async event => {
    const record = event.record;

    try {
      func.validation(event);
      if (event.error) {
        return event;
      }

      record.record_title.value = func.getLookupKey(record.AAAAA.value, record.BBBBB.value, record.no.value);
      record.lookup_key.value = func.getRecordTitle(record.AAAAA.value, record.BBBBB.value, record.no.value);

    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました。';
      errorLog.log2kintone({
        appId: 99999,
        token: 'XXXXXXXXXXXXX',
        object: e,
        fileName: 'template',
        functionName: 'EVENT:create.submit',
        mark: ''
      });
    } finally {
      return event;
    }
  }); // edit.submit

  // // ---------------------------------------------
  // // EVENT:edit.submit.success
  // // ---------------------------------------------
  // kintone.events.on([
  //   EVENT_HANDLER_MODE + 'app.record.edit.submit.success', 'app.record.index.edit.submit.success'
  // ], async event => {
  //   const record = event.record;
  //   return event;
  // });

  // // ---------------------------------------------
  // // [Promise非対応]
  // // EVENT:edit.change.<field_code>
  // // ---------------------------------------------
  // kintone.events.on([
  //     EVENT_HANDLER_MODE + 'app.record.edit.change.<field_code>', 'app.record.index.edit.change.<field_code>'
  // ], event => {
  //     const record = event.record;

  //     return event;
  // }); // edit.change.<field_code>

  // ---------------------------------------------
  // EVENT:detail.show
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.detail.show'
  ], async event => {
    // const record = event.record;
    try {



    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました。';
      errorLog.log2kintone({
        appId: 99999,
        token: 'XXXXXXXXXXXXX',
        object: e,
        fileName: 'template',
        functionName: 'EVENT:create.submit',
        mark: ''
      });
    } finally {
      return event;
    }

  }); // detail.show

  // // ---------------------------------------------
  // // EVENT:delete.submit
  // // ---------------------------------------------
  // kintone.events.on([
  //   EVENT_HANDLER_MODE + 'app.record.detail.delete.submit', 'app.record.index.delete.submit'
  // ], async event => {
  //   const record = event.record;

  //   return event;
  // }); // delete.submit

  // // ---------------------------------------------
  // // EVENT:process.proceed
  // // ---------------------------------------------
  // kintone.events.on([
  //   EVENT_HANDLER_MODE + 'app.record.detail.process.proceed'
  // ], async event => {
  //   const record = event.record;

  //   return event;
  // }); // process.proceed

  // ---------------------------------------------
  // EVENT:index.show
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.index.show'
  ], async event => {
    // const records = event.records;

    try {




    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました。';
      errorLog.log2kintone({
        appId: 99999,
        token: 'XXXXXXXXXXXXX',
        object: e,
        fileName: 'template',
        functionName: 'EVENT:index.show',
        mark: ''
      });
    } finally {
      return event;
    }
  }); // index.show

  // // ---------------------------------------------
  // // EVENT:print.show
  // // ---------------------------------------------
  // kintone.events.on([
  //   'app.record.print.show'
  // ], async event => {
  //   const record = event.record;

  //   return event;
  // }); // print.show

  // // ---------------------------------------------
  // // EVENT:report.show
  // // ---------------------------------------------
  // kintone.events.on([
  //   EVENT_HANDLER_MODE + 'app.record.report.show'
  // ], async event => {
  //   const record = event.record;

  //   return event;
  // }); // report.show

})();

