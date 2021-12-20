import * as func from '../src/apps/template/func';

// jest.mock('kintone-ui-component', () => 'kintone-ui-component');

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

