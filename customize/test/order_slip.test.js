import * as func from '../src/apps/order_slip/func';

jest.mock('kintone-ui-component', () => 'kintone-ui-component');

describe('[order_slip]getLookupKey レコード情報検索', () => {
  it('パラメータ数：4', () => {
    const result = func.getLookupKey('2021-03-01', '協和木材', '福岡センター', '123');
    let ary = result.split(' ');
    expect(ary.length).toBe(4);
  });

  it('半角空白で結合する', () => {
    const result = func.getLookupKey('2021-03-01', '協和木材', '福岡センター', '123');
    expect(result).toEqual('20210301 協和木材 福岡センター 123');
  });

  it('日付はyyyymmddフォーマット', () => {
    const result = func.getLookupKey('2021-03-01', '協和木材', '福岡センター', '123');
    expect(result.substr(0, 8)).toEqual('20210301');
  });
});

describe('[order_slip]getRecordTitle レコードタイトル', () => {
  it('パラメータ数：4', () => {
    const result = func.getRecordTitle('2021-03-01', '協和木材', '福岡センター', '123');
    let ary = result.split(' ');
    expect(ary.length).toBe(4);
  });

  it('半角空白で結合する', () => {
    const result = func.getRecordTitle('2021-03-01', '協和木材', '福岡センター', '123');
    expect(result).toEqual('20210301 協和木材 福岡センター 123');
  });

  it('日付はyyyymmddフォーマット', () => {
    const result = func.getRecordTitle('2021-03-01', '協和木材', '福岡センター', '123');
    expect(result.substr(0, 8)).toEqual('20210301');
  });
});

describe('[order_slip]getIndividual 個人納入先初期値セット', () => {

  it('会社名とセンター名を結合', () => {
    const result = func.getIndividual('協和木材', '福岡センター');
    expect(result).toEqual('協和木材 福岡センター');
  });

  it('会社名だけの時に文字列末に空白が入らない', () => {
    const result = func.getIndividual('協和木材', '');
    expect(result).toEqual('協和木材');
  });

  it('センター名だけの時に文字先頭に空白が入らない', () => {
    const result = func.getIndividual('', '福岡センター');
    expect(result).toEqual('福岡センター');
  });
});

describe('[order_slip]getTotalPrice 合計金額', () => {

  it('12345 * 67890', () => {
    const result = func.getTotalPrice(12345, 67890);
    expect(result).toEqual(838102050);
  });

  it('-123 * 100', () => {
    const result = func.getTotalPrice(-123, 100);
    expect(result).toEqual(-12300);
  });

  it('123 * -100', () => {
    const result = func.getTotalPrice(123, -100);
    expect(result).toEqual(-12300);
  });
});


describe('[order_slip]getShippingName お届け先名', () => {

  it('協和木材 福岡センター 近藤信秀', () => {
    const result = func.getShippingName('協和木材', '福岡センター', '近藤信秀');
    expect(result).toEqual('協和木材 福岡センター 近藤信秀');
  });

  it('協和木材 福岡センター', () => {
    const result = func.getShippingName('協和木材', '福岡センター', '');
    expect(result).toEqual('協和木材 福岡センター');
  });

  it('協和木材 近藤信秀', () => {
    const result = func.getShippingName('協和木材', '', '近藤信秀');
    expect(result).toEqual('協和木材 近藤信秀');
  });

  it('協和木材', () => {
    const result = func.getShippingName('協和木材', '', '');
    expect(result).toEqual('協和木材');
  });

  it('福岡センター 近藤信秀', () => {
    const result = func.getShippingName('', '福岡センター', '近藤信秀');
    expect(result).toEqual('福岡センター 近藤信秀');
  });

  it('福岡センター', () => {
    const result = func.getShippingName('', '福岡センター', '');
    expect(result).toEqual('福岡センター');
  });

  it('近藤信秀', () => {
    const result = func.getShippingName('', '', '近藤信秀');
    expect(result).toEqual('近藤信秀');
  });

  it('空白', () => {
    const result = func.getShippingName('', '', '');
    expect(result).toEqual('');
  });
});


describe('[order_slip]getShippingAddress お届け先住所', () => {

  it('顧客住所 と 個人納入先 ともに入力 => 個人納入先', () => {
    const result = func.getShippingAddress('顧客住所', '個人納入先住所');
    expect(result).toEqual('個人納入先住所');
  });

  it('顧客住所 のみ => 個人納入先', () => {
    const result = func.getShippingAddress('顧客住所', '');
    expect(result).toEqual('顧客住所');
  });

  it('個人納入先 のみ => 個人納入先', () => {
    const result = func.getShippingAddress('', '個人納入先住所');
    expect(result).toEqual('個人納入先住所');
  });

  it('顧客住所 と 個人納入先 ともに空白 => 個人納入先', () => {
    const result = func.getShippingAddress('', '');
    expect(result).toEqual('');
  });
});


describe('[order_slip]getMapLink マップリンク', () => {

  it('マップリンク文字列が生成される', () => {
    const result = func.getMapLink('福岡県八女市馬場262');
    expect(result).toEqual(encodeURI('https://www.google.com/maps/search/?api=1&query=福岡県八女市馬場262'));
  });

  it('空文字が返ってくる', () => {
    const result = func.getMapLink('');
    expect(result).toEqual('');
  });
});


describe('[order_slip]getDeliveryCompanyDispFlg 配送会社閲覧フラグ', () => {

  it('配送指示、納品日確定、納品報告確認 => 不可', () => {
    const param = ['配送指示', '納品日確定', '納品報告確認'];
    const result = func.getDeliveryCompanyDispFlg(param);
    expect(result).toEqual('不可');
  });

  it('配送指示、納品日確定 => 不可', () => {
    const param = ['配送指示', '納品日確定'];
    const result = func.getDeliveryCompanyDispFlg(param);
    expect(result).toEqual('不可');
  });

  it('配送指示、納品報告確認 => 不可', () => {
    const param = ['配送指示', '納品報告確認'];
    const result = func.getDeliveryCompanyDispFlg(param);
    expect(result).toEqual('不可');
  });

  it('配送指示 => 不可', () => {
    const param = ['配送指示'];
    const result = func.getDeliveryCompanyDispFlg(param);
    expect(result).toEqual('不可');
  });

  it('納品日確定、納品報告確認 => 可', () => {
    const param = ['納品日確定', '納品報告確認'];
    const result = func.getDeliveryCompanyDispFlg(param);
    expect(result).toEqual('可');
  });

  it('納品日確定 => 可', () => {
    const param = ['納品日確定'];
    const result = func.getDeliveryCompanyDispFlg(param);
    expect(result).toEqual('可');
  });

  it('納品報告確認 => 可', () => {
    const param = ['納品報告確認'];
    const result = func.getDeliveryCompanyDispFlg(param);
    expect(result).toEqual('可');
  });

  it('未完了作業なし => 不可', () => {
    const param = [];
    const result = func.getDeliveryCompanyDispFlg(param);
    expect(result).toEqual('不可');
  });
});


describe('[order_slip]isIncludeIncompleteWorks 未完了作業 選択肢 包含チェック', () => {

  it('選択肢 一致 / 順番 一致 => TRUE', () => {
    const param = [
      '配送指示',
      '納品日確定',
      '納品日連絡',
      '納品報告確認'
    ];
    const result = func.isIncludeIncompleteWorks(param);
    expect(result).toEqual(true);
  });

  it('選択肢 一致 / 順番 不一致 => TRUE', () => {
    const param = [
      '納品報告確認',
      '納品日連絡',
      '配送指示',
      '納品日確定'
    ];
    const result = func.isIncludeIncompleteWorks(param);
    expect(result).toEqual(true);
  });

  it('選択肢 追加 => FALSE', () => {
    const param = [
      '配送指示',
      '納品日確定',
      '納品日連絡',
      '納品報告確認',
      '項目追加'
    ];
    const result = func.isIncludeIncompleteWorks(param);
    expect(result).toEqual(false);
  });

  it('選択肢 間違い => FALSE', () => {
    const param = [
      '配送指示aaaa',
      '納品日確定',
      '納品日連絡',
      '納品報告確認'
    ];
    const result = func.isIncludeIncompleteWorks(param);
    expect(result).toEqual(false);
  });

  it('選択肢 不足 => TRUE', () => {
    const param = [
      '配送指示',
      '納品日連絡',
      '納品日確定',
    ];
    const result = func.isIncludeIncompleteWorks(param);
    expect(result).toEqual(true);
  });

  it('選択肢 不足/間違い => FALSE', () => {
    const param = [
      '配送指示aaaa',
      '納品日連絡',
      '納品日確定',
    ];
    const result = func.isIncludeIncompleteWorks(param);
    expect(result).toEqual(false);
  });

  it('選択肢 追加/間違い => FALSE', () => {
    const param = [
      '配送指示aaaa',
      '納品日確定',
      '納品日連絡',
      '納品報告確認',
      '項目追加'
    ];
    const result = func.isIncludeIncompleteWorks(param);
    expect(result).toEqual(false);
  });
});
