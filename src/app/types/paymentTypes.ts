import { PaymentResult, ThreeDSInitializePaymentResult } from "iyzipay";

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

export interface ThreeDSInitResponse extends ThreeDSInitializePaymentResult {
  errorMessage?: string;
}

export interface IyzipayResponse extends PaymentResult {
  errorMessage?: string;
}
