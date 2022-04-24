//=============================================================================
//【ファイル名】
//  xxxxx/index.ts
//【アプリ名】
//  〇〇〇〇〇
//-----------------------------------------------------------------------------
//  Copyright (c) 2022 gameni 
//=============================================================================
import swal from 'sweetalert2'
import { Apps } from '../../common/apps';
import { NumberCtrl } from '../../common/number_ctrl';
import { ErrorLog } from '../../common/error_log';
import * as kt from '../../common/kintone_tools';
import * as func from './func';

(() => {
  'use strict';

  const apps = new Apps(kt.getId());
  const numberCtrl = new NumberCtrl(kt.getId());
  const errorLog = new ErrorLog(kt.getId());

  // =============================================
  // アプリ情報存在チェック
  // =============================================
  if (!apps.isExistConfById(kt.getId())) {
    swal.fire({
      icon: 'error',
      title: 'アプリ情報が登録されていません',
      text: 'システム管理者に連絡してください！'
    });
  }

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
      errorLog.log2kintone(e, 'xxxxx/index.ts', 'EVENT:create.show', '');
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

      let uid = await numberCtrl.getNextUidAndIncrement(kt.getId());
      let no = await func.getNo(uid);

      record.uid.value = uid;
      record.no.value = no;
      record.lookup_key.value = func.getLookupKey(record.AAAAA.value, record.BBBBB.value, no);
      record.record_title.value = func.getRecordTitle(record.AAAAA.value, record.BBBBB.value, no);

    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました。';
      errorLog.log2kintone(e, 'xxxxx/index.ts', 'EVENT:create.submit', '');
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
  //   EVENT_HANDLER_MODE + 'app.record.create.change.<field_code>'
  // ], event => {
  //   const record = event.record;

  //   return event;
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
      errorLog.log2kintone(e, 'xxxxx/index.ts', 'EVENT:edit.show', '');
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
      errorLog.log2kintone(e, 'xxxxx/index.ts', 'EVENT:edit.submit', '');
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
  //   EVENT_HANDLER_MODE + 'app.record.edit.change.<field_code>', 'app.record.index.edit.change.<field_code>'
  // ], event => {
  //   const record = event.record;

  //   return event;
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
      errorLog.log2kintone(e, 'xxxxx/index.ts', 'EVENT:detail.show', '');
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
      errorLog.log2kintone(e, 'xxxxx/index.ts', 'EVENT:index.show', '');
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

