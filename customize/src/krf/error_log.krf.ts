import { KintoneRecordField } from '@kintone/rest-api-client';

// エラーログの型を定義
export type KrfErrorLog = {
  $id: KintoneRecordField.ID;
  $revision: KintoneRecordField.Revision;
  更新者: KintoneRecordField.Modifier;
  作成者: KintoneRecordField.Creator;
  更新日時: KintoneRecordField.UpdatedTime;
  作成日時: KintoneRecordField.CreatedTime;
  レコード番号: KintoneRecordField.RecordNumber;
  日時: KintoneRecordField.DateTime;
  エラーメッセージ: KintoneRecordField.MultiLineText;
  エラーオブジェクト: KintoneRecordField.MultiLineText;
  stack_trace: KintoneRecordField.MultiLineText;
  マーク: KintoneRecordField.SingleLineText;
  ファイル名: KintoneRecordField.SingleLineText;
  関数名: KintoneRecordField.SingleLineText;
};

