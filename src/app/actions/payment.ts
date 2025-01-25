"use server";

import { CardInfo, IyzipayResponse } from "@/app/types/payment";
import { iyzipay } from "@/lib/iyzico";
import Iyzipay from "iyzipay";
import { revalidatePath } from "next/cache";

export async function initiatePayment(
  cardInfo: CardInfo
): Promise<IyzipayResponse> {
  try {
    const request = {
      locale: Iyzipay.LOCALE.EN,
      conversationId: `conv_${Date.now()}`,
      price: cardInfo.price,
      paidPrice: cardInfo.price,
      currency: cardInfo.currency,
      installments: 1,
      basketId: `B${Date.now()}`,
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: {
        cardHolderName: cardInfo.cardHolderName,
        cardNumber: cardInfo.cardNumber.replace(/\s/g, ""),
        expireMonth: cardInfo.expireMonth,
        expireYear: cardInfo.expireYear,
        cvc: cardInfo.cvc,
        registerCard: 0,
        cardAlias: "card-alias-" + Date.now(),
      },
      buyer: {
        id: "BY789",
        name:
          cardInfo.cardHolderName.split(" ").slice(0, -1).join(" ") ||
          cardInfo.cardHolderName,
        surname:
          cardInfo.cardHolderName.split(" ").pop() || cardInfo.cardHolderName,
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
          price: cardInfo.price,
        },
      ],
    };

    return new Promise<IyzipayResponse>((resolve, reject) => {
      iyzipay.payment.create(request, (err: any, result: IyzipayResponse) => {
        if (err) {
          reject(err);
        } else {
          revalidatePath("/");
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw error;
  }
}
