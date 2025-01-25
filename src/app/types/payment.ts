export enum Currency {
  TRY = "TRY",
  USD = "USD",
  EUR = "EUR",
}

export type CardInfo = {
  cardHolderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
  price: string;
  currency: Currency;
};

export type IyzipayResponse = {
  status: string;
  errorMessage?: string;
  [key: string]: any;
};
