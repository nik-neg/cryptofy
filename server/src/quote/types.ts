export enum QuoteCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  RUB = 'RUB',
  AUD = 'AUD',
  CAD = 'CAD',
  CHF = 'CHF',
  CNY = 'CNY',
  SEK = 'SEK',
  NZD = 'NZD',
  MXN = 'MXN',
  SGD = 'SGD',
  HKD = 'HKD',
  NOK = 'NOK',
  KRW = 'KRW',
  TRY = 'TRY',
  INR = 'INR',
  BRL = 'BRL',
  ZAR = 'ZAR',
  DKK = 'DKK',
  PLN = 'PLN',
  TWD = 'TWD',
  THB = 'THB',
  IDR = 'IDR',
  HUF = 'HUF',
  CZK = 'CZK',
  ILS = 'ILS',
  CLP = 'CLP',
  PHP = 'PHP',
  AED = 'AED',
  COP = 'COP',
  SAR = 'SAR',
  MYR = 'MYR',
  RON = 'RON',
  PEN = 'PEN',
  KES = 'KES',
  HRK = 'HRK',
  EGP = 'EGP',
  DZD = 'DZD',
  IQD = 'IQD',
  KWD = 'KWD',
  LBP = 'LBP',
  LKR = 'LKR',
  MUR = 'MUR',
  PKR = 'PKR',
  QAR = 'QAR',
  VND = 'VND',
  BHD = 'BHD',
  OMR = 'OMR',
  JOD = 'JOD',
  BGN = 'BGN',
  HNL = 'HNL',
  NIO = 'NIO',
  UAH = 'UAH',
  UYU = 'UYU',
  BOB = 'BOB',
  PYG = 'PYG',
  DOP = 'DOP',
  CRC = 'CRC',
  SVC = 'SVC',
  GTQ = 'GTQ',
  BBD = 'BBD',
  BZD = 'BZD',
  BSD = 'BSD',
}

export enum CryptoCurrency {
  BTC = 'BTC',
  ETH = 'ETH',
  XRP = 'XRP',
  LTC = 'LTC',
  BCH = 'BCH',
  BNB = 'BNB',
  EOS = 'EOS',
  XLM = 'XLM',
  ADA = 'ADA',
  TRX = 'TRX',
  XMR = 'XMR',
  DASH = 'DASH',
  ZEC = 'ZEC',
  ETC = 'ETC',
  VET = 'VET',
  DOGE = 'DOGE',
  BAT = 'BAT',
  ZRX = 'ZRX',
  REP = 'REP',
  GNT = 'GNT',
  OMG = 'OMG',
  MKR = 'MKR',
  DAI = 'DAI',
  LINK = 'LINK',
  USDC = 'USDC',
  PAX = 'PAX',
  TUSD = 'TUSD',
  USDT = 'USDT',
  TGBP = 'TGBP',
  TAUD = 'TAUD',
  TCAD = 'TCAD',
  TJPY = 'TJPY',
  EURS = 'EURS',
  XAUT = 'XAUT',
  XAUG = 'XAUG',
  XAG = 'XAG',
  XAU = 'XAU',
  XPD = 'XPD',
  XPT = 'XPT',
  XRHODIUM = 'XRHODIUM',
  XPLATINUM = 'XPLATINUM',
  XIRIDIUM = 'XIRIDIUM',
  XAURUM = 'XAURUM',
  XAUR = 'XAUR',
  XAGM = 'XAGM',
  XPTM = 'XPTM',
  XPDG = 'XPDG',
}

export const CryptoAndFiatCurrencyEnum = {
  ...CryptoCurrency,
  ...QuoteCurrency,
};

export type CryptoAndFiatCurrencyEnumType = CryptoCurrency | QuoteCurrency;

export interface QuoteResponse {
  base_amount: number;
  base_currency: CryptoAndFiatCurrencyEnumType;
  quote_currency: CryptoAndFiatCurrencyEnumType;
  quote_amount: number;
}
