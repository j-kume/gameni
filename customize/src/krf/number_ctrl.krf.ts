import { KintoneRecordField } from '@kintone/rest-api-client';

// 番号管理マスタの型を定義
export type KrfNumberCtrl = {
  $id: KintoneRecordField.ID;
  $revision: KintoneRecordField.Revision;
  更新者: KintoneRecordField.Modifier;
  作成者: KintoneRecordField.Creator;
  更新日時: KintoneRecordField.UpdatedTime;
  作成日時: KintoneRecordField.CreatedTime;
  レコード番号: KintoneRecordField.RecordNumber;
  アプリID: KintoneRecordField.Number;
  API_TOKEN: KintoneRecordField.SingleLineText;
  アプリCODE: KintoneRecordField.SingleLineText;
  アプリ名: KintoneRecordField.SingleLineText;
  uid: KintoneRecordField.Number;
  メモ: KintoneRecordField.SingleLineText;
};

