//=============================================================================
//【ファイル名】
//  order_slip/index.ts
//【アプリ名】
//  受注票
//-----------------------------------------------------------------------------
//  Copyright (c) 2021 AISIC.Inc
//=============================================================================
import * as systemProperty from '../../common/system_property';
import * as errorLog from '../../common/error_log';
import * as commonConst from '../../common/common_const';
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
      await systemProperty.setSystemProperty(
        // @ts-ignore
        commonConst.cc.number_ctrl[THIS_APP_PROPERTY.env_code],
        kt.getId()
      );

      func.setCommonInputCtrl(record);

      record.uid.value = '';

    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました';
      errorLog.log2kintone({
        appId: systemProperty.getSessionToObject()['ERROR_LOG'].app,
        token: atob(systemProperty.getSessionToObject()['ERROR_LOG'].token),
        object: e,
        fileName: 'order_slip/index.ts',
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
      await systemProperty.setSystemProperty(
        // @ts-ignore
        commonConst.cc.number_ctrl[THIS_APP_PROPERTY.env_code],
        kt.getId()
      );

      func.validation(event);
      if (event.error) {
        return event;
      }
      // @ts-ignore
      let number_adjust = THIS_APP_PROPERTY.number_adjust ? Number(THIS_APP_PROPERTY.number_adjust) : 0;

      let nextUid = await systemProperty.getNextUidAndIncrement(
        // @ts-ignore
        commonConst.cc.number_ctrl[THIS_APP_PROPERTY.env_code],
        systemProperty.getAppCode(kt.getId())
      );

      // 番号管理
      let uid = Number(nextUid) + Number(number_adjust); //番号調整用パラメーター

      // @ts-ignore
      // let no = await propertySet(uid);
      let no = '';
      let prm = {
        app: systemProperty.getSessionToObject()['ORDER_SLIP'].app,
        token: systemProperty.getSessionToObject()['ORDER_SLIP'].token,
        name: 'ORDER_SLIP'
      };

      // 年度を取得
      let order_slip_year = String(func.getOrderSlipYear(record.受注日付.value));

      //年度に関係したレコードから or ない場合、noを採番
      let yearRecords = await func.getYearRecords(order_slip_year, prm);
      console.log(yearRecords.records.length);
      console.log(yearRecords.records);
      let set_count = yearRecords.records.length > 0 ? Number(yearRecords.records[0].年度内連番.value) + 1 : 1;
      if (yearRecords.records.length > 0) {
        no = func.getNo(order_slip_year, set_count); // 20210004
      } else {
        no = func.getNo(order_slip_year, set_count); // 20210001
      }
    
    
      let lookup_key = func.getLookupKey(record.受注日付.value, record.注文会社名.value, record.発注センター.value, no);
      let record_title = func.getRecordTitle(record.受注日付.value, record.注文会社名.value, record.発注センター.value, no);

      record.uid.value = uid;
      record.no.value = no;
      record.lookup_key.value = lookup_key;
      record.record_title.value = record_title;

      record.お届け先名.value = func.getShippingName(record.uid_個人納入先.value, record.注文会社名.value, record.発注センター.value, record.個人納入先_氏名.value);
      record.お届け先住所.value = func.getShippingAddress(record.uid_個人納入先.value, record.顧客_住所.value, record.個人納入先_住所.value);
      record.お届け先電話番号.value = func.getShippingAddress(record.uid_個人納入先.value, record.顧客_電話番号.value, record.個人納入先_電話番号1.value);
      record.マップリンク.value = func.getMapLink(record.お届け先住所.value);
      record.配送会社閲覧フラグ.value = func.getDeliveryCompanyDispFlg(record.未完了作業.value);
      record.帳票出力用_注文会社名.value = func.getCompanyName(record.注文会社名.value, record.発注センター.value);
      record.年度内連番.value = set_count;
      record.年度.value = order_slip_year;
      record.カレンダータイトル.value = func.getCalendarName(record.略称_顧客マスタ.value,  record.略称_商品マスタ.value, record.数量.value);

      if (record.納入方法.value === '工場引取') {
        record.帳票用_お届け先名.value = '';
        record.帳票用_お届け先住所.value = '';
        record.帳票用_連絡先番号.value = '';
      } else {
        record.帳票用_お届け先名.value = record.個人納入先検索.value ? record.お届け先名.value + ' 様' : record.お届け先名.value;
        record.帳票用_お届け先住所.value = record.お届け先住所.value;
        record.帳票用_連絡先番号.value = record.お届け先電話番号.value;
      }

    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました';
      errorLog.log2kintone({
        appId: systemProperty.getSessionToObject()['ERROR_LOG'].app,
        token: atob(systemProperty.getSessionToObject()['ERROR_LOG'].token),
        object: e,
        fileName: 'order_slip/index.ts',
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
  // [Promise非対応]
  // EVENT:create.change.仕入単価
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.create.change.仕入単価'
  ], event => {
    const record = event.record;

    record.仕入合計.value = func.getTotalPrice(Number(record.仕入単価.value), Number(record.数量.value));

    return event;
  }); // create.change.仕入単価


  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:create.change.販売単価
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.create.change.販売単価'
  ], event => {
    const record = event.record;

    record.販売合計.value = func.getTotalPrice(Number(record.販売単価.value), Number(record.数量.value));

    return event;
  }); // create.change.販売単価


  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:create.change.数量
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.create.change.数量'
  ], event => {
    const record = event.record;

    record.仕入合計.value = func.getTotalPrice(Number(record.仕入単価.value), Number(record.数量.value));
    record.販売合計.value = func.getTotalPrice(Number(record.販売単価.value), Number(record.数量.value));

    return event;
  }); // create.change.数量


  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:create.change.運送会社
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.create.change.運送会社'
  ], event => {
    const record = event.record;

    func.getShippingCompanySearch(record);

    return event;
  }); // create.change.運送会社

  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:create.change.通常仕入単価
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.create.change.通常仕入単価'
  ], event => {
    const record = event.record;

    record.仕入単価.value = record.通常仕入単価.value;

    return event;
  }); // create.change.通常仕入単価


  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:create.change.通常販売単価
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.create.change.通常販売単価'
  ], event => {
    const record = event.record;

    record.販売単価.value = record.通常販売単価.value;

    return event;
  }); // create.change.通常販売単価



  // ---------------------------------------------
  // EVENT:edit.show
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.show', 'app.record.index.edit.show'
  ], async event => {
    const record = event.record;

    try {
      await systemProperty.setSystemProperty(
        // @ts-ignore
        commonConst.cc.number_ctrl[THIS_APP_PROPERTY.env_code],
        kt.getId()
      );

      func.setCommonInputCtrl(record);

    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました';
      errorLog.log2kintone({
        appId: systemProperty.getSessionToObject()['ERROR_LOG'].app,
        token: atob(systemProperty.getSessionToObject()['ERROR_LOG'].token),
        object: e,
        fileName: 'order_slip/index.ts',
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

      record.record_title.value = func.getLookupKey(record.受注日付.value, record.注文会社名.value, record.発注センター.value, record.no.value);
      record.lookup_key.value = func.getRecordTitle(record.受注日付.value, record.注文会社名.value, record.発注センター.value, record.no.value);

      record.お届け先名.value = func.getShippingName(record.uid_個人納入先.value, record.注文会社名.value, record.発注センター.value, record.個人納入先_氏名.value);
      record.お届け先住所.value = func.getShippingAddress(record.uid_個人納入先.value, record.顧客_住所.value, record.個人納入先_住所.value);
      record.お届け先電話番号.value = func.getShippingAddress(record.uid_個人納入先.value, record.顧客_電話番号.value, record.個人納入先_電話番号1.value);
      record.マップリンク.value = func.getMapLink(record.お届け先住所.value);
      record.配送会社閲覧フラグ.value = func.getDeliveryCompanyDispFlg(record.未完了作業.value);
      record.帳票出力用_注文会社名.value = func.getCompanyName(record.注文会社名.value, record.発注センター.value);
      record.カレンダータイトル.value = func.getCalendarName(record.略称_顧客マスタ.value,  record.略称_商品マスタ.value, record.数量.value);

      if (record.納入方法.value === '工場引取') {
        record.帳票用_お届け先名.value = '';
        record.帳票用_お届け先住所.value = '';
        record.帳票用_連絡先番号.value = '';
      } else {
        record.帳票用_お届け先名.value = record.個人納入先検索.value ? record.お届け先名.value + ' 様' : record.お届け先名.value;
        record.帳票用_お届け先住所.value = record.お届け先住所.value;
        record.帳票用_連絡先番号.value = record.お届け先電話番号.value;
      }
     
    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました';
      errorLog.log2kintone({
        appId: systemProperty.getSessionToObject()['ERROR_LOG'].app,
        token: atob(systemProperty.getSessionToObject()['ERROR_LOG'].token),
        object: e,
        fileName: 'order_slip/index.ts',
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
  // [Promise非対応]
  // EVENT:edit.change.仕入単価
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.change.仕入単価',
    EVENT_HANDLER_MODE + 'app.record.index.edit.change.仕入単価'
  ], event => {
    const record = event.record;

    record.仕入合計.value = func.getTotalPrice(Number(record.仕入単価.value), Number(record.数量.value));

    return event;
  }); // edit.change.仕入単価


  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:edit.change.販売単価
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.change.販売単価',
    EVENT_HANDLER_MODE + 'app.record.index.edit.change.販売単価'
  ], event => {
    const record = event.record;

    record.販売合計.value = func.getTotalPrice(Number(record.販売単価.value), Number(record.数量.value));

    return event;
  }); // edit.change.販売単価


  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:edit.change.数量
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.change.数量',
    EVENT_HANDLER_MODE + 'app.record.index.edit.change.数量'
  ], event => {
    const record = event.record;

    record.仕入合計.value = func.getTotalPrice(Number(record.仕入単価.value), Number(record.数量.value));
    record.販売合計.value = func.getTotalPrice(Number(record.販売単価.value), Number(record.数量.value));

    return event;
  }); // edit.change.数量


  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:edit.change.運送会社
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.change.運送会社',
    EVENT_HANDLER_MODE + 'app.record.index.edit.change.運送会社'
  ], event => {
    const record = event.record;

    func.getShippingCompanySearch(record);

    return event;
  }); // edit.change.運送会社

   // ---------------------------------------------
  // [Promise非対応]
  // EVENT:edit.change.通常仕入単価
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.change.通常仕入単価',
    EVENT_HANDLER_MODE + 'app.record.index.edit.change.通常仕入単価'
  ], event => {
    const record = event.record;

    record.仕入単価.value = record.通常仕入単価.value;

    return event;
  }); // create.change.通常仕入単価


  // ---------------------------------------------
  // [Promise非対応]
  // EVENT:edit.change.通常販売単価
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.edit.change.通常販売単価',
    EVENT_HANDLER_MODE + 'app.record.index.edit.change.通常販売単価'
  ], event => {
    const record = event.record;

    record.販売単価.value = record.通常販売単価.value;

    return event;
  }); // create.change.通常販売単価


  // ---------------------------------------------
  // EVENT:detail.show
  // ---------------------------------------------
  kintone.events.on([
    EVENT_HANDLER_MODE + 'app.record.detail.show'
  ], async event => {
    // const record = event.record;
    try {
      await systemProperty.setSystemProperty(
        // @ts-ignore
        commonConst.cc.number_ctrl[THIS_APP_PROPERTY.env_code],
        kt.getId()
      );

      if(kt.isMobileMode()){
        kintone.mobile.app.record.setFieldShown('顧客検索', false);
        kintone.mobile.app.record.setFieldShown('個人納入先検索', false);
        kintone.mobile.app.record.setFieldShown('商品検索', false);
      }else{
        kintone.app.record.setFieldShown('顧客検索', false);
        kintone.app.record.setFieldShown('個人納入先検索', false);
        kintone.app.record.setFieldShown('商品検索', false);
      }
      
    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました';
      errorLog.log2kintone({
        appId: systemProperty.getSessionToObject()['ERROR_LOG'].app,
        token: atob(systemProperty.getSessionToObject()['ERROR_LOG'].token),
        object: e,
        fileName: 'order_slip/index.ts',
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
      await systemProperty.setSystemProperty(
        // @ts-ignore
        commonConst.cc.number_ctrl[THIS_APP_PROPERTY.env_code],
        kt.getId()
      );

      $('.cellitem-value-gaia').css({'overflow-wrap': 'break-word', 'white-space': 'pre'});
 
    } catch (e) {
      console.log(e);
      event.error = 'エラーが発生しました';
      errorLog.log2kintone({
        appId: systemProperty.getSessionToObject()['ERROR_LOG'].app,
        token: atob(systemProperty.getSessionToObject()['ERROR_LOG'].token),
        object: e,
        fileName: 'order_slip/index.ts',
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

