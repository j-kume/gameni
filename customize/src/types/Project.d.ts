declare namespace KintoneTypes {
  interface Project {
    no: kintone.fieldTypes.SingleLineText;
    record_title: kintone.fieldTypes.SingleLineText;
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    作成日: kintone.fieldTypes.Date;
    文字列__1行__0: kintone.fieldTypes.SingleLineText;
    文字列__1行__1: kintone.fieldTypes.SingleLineText;
    顧客検索: kintone.fieldTypes.SingleLineText;
    会社記号: kintone.fieldTypes.SingleLineText;
    案件名: kintone.fieldTypes.SingleLineText;
    uid: kintone.fieldTypes.Number;
    lookup_key: kintone.fieldTypes.SingleLineText;
    uid_顧客リスト: kintone.fieldTypes.Number;

    自社担当者名: kintone.fieldTypes.UserSelect;
    案件リスト: {
      type: "SUBTABLE";
      value: {
        id: string;
        value: {
          案件開始日: kintone.fieldTypes.Date;
          案件終了日: kintone.fieldTypes.Date;
          案件状況: kintone.fieldTypes.DropDown;
          メモ: kintone.fieldTypes.MultiLineText;
          案件内容: kintone.fieldTypes.MultiLineText;

          添付ファイル: kintone.fieldTypes.File;
        };
      }[];
    };
  }
  interface SavedProject extends Project {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
