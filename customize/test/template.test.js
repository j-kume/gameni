import * as func from '../src/apps/template/func';

// jest.mock('kintone-ui-component', () => 'kintone-ui-component');

// describe('[customer]getCreateValues 登録時レコード情報 セット', () => {
//   const record = {
//     uid: { value: "" },
//     no: { value: "" },
//     lookup_key: { value: "" },
//     record_title: { value: "" },
//     会社名: { value: "あいしっく" },
//     部署名: { value: "開発部" },
//     担当者名: { value: "久米" },
//     郵便番号: { value: "123-4567" },
//     TEL: { value: "111-222-3333" },
//     FAX: { value: "999-888-7777" },
//     住所: { value: "福岡県福岡市中央区1-2-3" },
//     顧客ランク: { value: "A" },
//     メールアドレス: { value: "aaa@bbb.com" },
//     会社ロゴ: { value: [] },
//     備考: { value: "あいうえお\nかきくけこ" }
//   };
//   const uid = 10;

//   it('uid', () => {
//     func.getCreateValues(record, uid);
//     expect(record.uid.value).toEqual(10);
//   });

//   it('no', () => {
//     func.getCreateValues(record, uid);
//     expect(record.no.value).toEqual('10');
//   });

//   it('lookup_key', () => {
//     func.getCreateValues(record, uid);
//     expect(record.lookup_key.value).toEqual('あいしっく 10');
//   });

//   it('record_title', () => {
//     func.getCreateValues(record, uid);
//     expect(record.record_title.value).toEqual('あいしっく 10');
//   });

//   it('会社名', () => {
//     func.getCreateValues(record, uid);
//     expect(record.会社名.value).toEqual('あいしっく');
//   });

//   it('部署名', () => {
//     func.getCreateValues(record, uid);
//     expect(record.部署名.value).toEqual('開発部');
//   });

//   it('担当者名', () => {
//     func.getCreateValues(record, uid);
//     expect(record.担当者名.value).toEqual('久米');
//   });

//   it('郵便番号', () => {
//     func.getCreateValues(record, uid);
//     expect(record.郵便番号.value).toEqual('123-4567');
//   });

//   it('TEL', () => {
//     func.getCreateValues(record, uid);
//     expect(record.TEL.value).toEqual('111-222-3333');
//   });

//   it('FAX', () => {
//     func.getCreateValues(record, uid);
//     expect(record.FAX.value).toEqual('999-888-7777');
//   });

//   it('住所', () => {
//     func.getCreateValues(record, uid);
//     expect(record.住所.value).toEqual('福岡県福岡市中央区1-2-3');
//   });

//   it('顧客ランク', () => {
//     func.getCreateValues(record, uid);
//     expect(record.顧客ランク.value).toEqual('A');
//   });

//   it('メールアドレス', () => {
//     func.getCreateValues(record, uid);
//     expect(record.メールアドレス.value).toEqual('aaa@bbb.com');
//   });

//   // it('会社ロゴ', () => {
//   //   func.getCreateValues(record, uid);
//   //   expect(record.会社ロゴ.value).toEqual('xxxxx');
//   // });

//   it('備考', () => {
//     func.getCreateValues(record, uid);
//     expect(record.備考.value).toEqual('あいうえお\nかきくけこ');
//   });

// });

// describe('[customer]getEditValues 編集時レコード情報 セット', () => {
//   const record = {
//     uid: { value: "1" },
//     no: { value: "1" },
//     lookup_key: { value: "" },
//     record_title: { value: "" },
//     会社名: { value: "あいしっく" },
//     部署名: { value: "開発部" },
//     担当者名: { value: "久米" },
//     郵便番号: { value: "123-4567" },
//     TEL: { value: "111-222-3333" },
//     FAX: { value: "999-888-7777" },
//     住所: { value: "福岡県福岡市中央区1-2-3" },
//     顧客ランク: { value: "A" },
//     メールアドレス: { value: "aaa@bbb.com" },
//     会社ロゴ: { value: [] },
//     備考: { value: "あいうえお\nかきくけこ" }
//   };

//   it('uid', () => {
//     func.getEditValues(record);
//     expect(record.uid.value).toEqual('1');
//   });

//   it('no', () => {
//     func.getEditValues(record);
//     expect(record.no.value).toEqual('1');
//   });

//   it('lookup_key', () => {
//     func.getEditValues(record);
//     expect(record.lookup_key.value).toEqual('あいしっく 1');
//   });

//   it('record_title', () => {
//     func.getEditValues(record);
//     expect(record.record_title.value).toEqual('あいしっく 1');
//   });

//   it('会社名', () => {
//     func.getEditValues(record);
//     expect(record.会社名.value).toEqual('あいしっく');
//   });

//   it('部署名', () => {
//     func.getEditValues(record);
//     expect(record.部署名.value).toEqual('開発部');
//   });

//   it('担当者名', () => {
//     func.getEditValues(record);
//     expect(record.担当者名.value).toEqual('久米');
//   });

//   it('郵便番号', () => {
//     func.getEditValues(record);
//     expect(record.郵便番号.value).toEqual('123-4567');
//   });

//   it('TEL', () => {
//     func.getEditValues(record);
//     expect(record.TEL.value).toEqual('111-222-3333');
//   });

//   it('FAX', () => {
//     func.getEditValues(record);
//     expect(record.FAX.value).toEqual('999-888-7777');
//   });

//   it('住所', () => {
//     func.getEditValues(record);
//     expect(record.住所.value).toEqual('福岡県福岡市中央区1-2-3');
//   });

//   it('顧客ランク', () => {
//     func.getEditValues(record);
//     expect(record.顧客ランク.value).toEqual('A');
//   });

//   it('メールアドレス', () => {
//     func.getEditValues(record);
//     expect(record.メールアドレス.value).toEqual('aaa@bbb.com');
//   });

//   // it('会社ロゴ', () => {
//   //   func.getEditValues(record);
//   //   expect(record.会社ロゴ.value).toEqual('xxxxx');
//   // });

//   it('備考', () => {
//     func.getEditValues(record);
//     expect(record.備考.value).toEqual('あいうえお\nかきくけこ');
//   });

// });

// describe('[order_slip]getLookupKey レコード情報検索', () => {
//   it('パラメータ数：4', () => {
//     const result = func.getLookupKey('2021-03-01', 'あいしっく', '福岡センター', '123');
//     let ary = result.split(' ');
//     expect(ary.length).toBe(4);
//   });

//   it('半角空白で結合する', () => {
//     const result = func.getLookupKey('2021-03-01', 'あいしっく', '福岡センター', '123');
//     expect(result).toEqual('20210301 あいしっく 福岡センター 123');
//   });

//   it('日付はyyyymmddフォーマット', () => {
//     const result = func.getLookupKey('2021-03-01', 'あいしっく', '福岡センター', '123');
//     expect(result.substr(0, 8)).toEqual('20210301');
//   });
// });

// describe('[order_slip]getRecordTitle レコードタイトル', () => {
//   it('パラメータ数：4', () => {
//     const result = func.getRecordTitle('2021-03-01', 'あいしっく', '福岡センター', '123');
//     let ary = result.split(' ');
//     expect(ary.length).toBe(4);
//   });

//   it('半角空白で結合する', () => {
//     const result = func.getRecordTitle('2021-03-01', 'あいしっく', '福岡センター', '123');
//     expect(result).toEqual('20210301 あいしっく 福岡センター 123');
//   });

//   it('日付はyyyymmddフォーマット', () => {
//     const result = func.getRecordTitle('2021-03-01', 'あいしっく', '福岡センター', '123');
//     expect(result.substr(0, 8)).toEqual('20210301');
//   });
// });

