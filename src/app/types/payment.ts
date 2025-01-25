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
  use3DS: boolean;
};

export type ThreeDSInitResponse = {
  status: string;
  errorMessage?: string;
  threeDSHtmlContent?: string;
  paymentId?: string;
  conversationId?: string;
};

export type ThreeDSCompleteResponse = {
  status: string;
  errorMessage?: string;
  paymentId?: string;
  conversationId?: string;
  fraudStatus?: number;
  [key: string]: any;
};

export type IyzipayResponse = {
  status: string;
  errorMessage?: string;
  [key: string]: any;
};
