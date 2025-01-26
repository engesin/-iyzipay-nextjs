"use server";

import {
  CheckoutFormInitResponse,
  CheckoutFormResponse,
} from "@/app/types/paymentTypes";
import { iyzipay } from "@/lib/iyzico";
import Iyzipay, { ThreeDSInitializePaymentRequestData } from "iyzipay";

export async function initiateCheckoutForm(): Promise<CheckoutFormInitResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const request: ThreeDSInitializePaymentRequestData = {
      locale: Iyzipay.LOCALE.EN,
      conversationId: `conv_${Date.now()}`,
      price: "123.0",
      paidPrice: "123.0",
      currency: Iyzipay.CURRENCY.USD,
      installments: 1,
      basketId: `B${Date.now()}`,
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/checkout-callback`,
      paymentCard: {
        cardHolderName: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        cvc: "",
        registerCard: 0,
        cardAlias: "card-alias-" + Date.now(),
      },
      buyer: {
        id: "BY789",
        name: "John",
        surname: "Doe",
        gsmNumber: "+905350000000",
        email: "email@email.com",
        identityNumber: "74300864791",
        registrationAddress:
          "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        ip: "85.34.78.112",
        city: "Istanbul",
        country: "Turkey",
      },
      shippingAddress: {
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      },
      billingAddress: {
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      },
      basketItems: [
        {
          id: `BI${Date.now()}`,
          name: "Test Product",
          category1: "Test",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: "123.0",
        },
      ],
    };

    return new Promise<CheckoutFormInitResponse>((resolve, reject) => {
      iyzipay.checkoutFormInitialize.create(request, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw error;
  }
}

export async function retrieveCheckoutForm(
  token: string
): Promise<CheckoutFormResponse> {
  try {
    const request = {
      locale: Iyzipay.LOCALE.EN,
      token,
    };

    return new Promise<CheckoutFormResponse>((resolve, reject) => {
      iyzipay.checkoutForm.retrieve(request, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw error;
  }
}
