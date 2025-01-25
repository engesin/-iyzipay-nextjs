"use server";

import {
  CardInfo,
  IyzipayResponse,
  ThreeDSCompleteResponse,
  ThreeDSInitResponse,
} from "@/app/types/paymentTypes";
import { iyzipay } from "@/lib/iyzico";
import Iyzipay, {
  PaymentRequestData,
  ThreeDSInitializePaymentRequestData,
} from "iyzipay";
import { revalidatePath } from "next/cache";

const buildPaymentRequest = (cardInfo: CardInfo): PaymentRequestData => {
  return {
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
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
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
};

const buildThreeDSRequest = (
  cardInfo: CardInfo
): ThreeDSInitializePaymentRequestData => {
  return {
    ...buildPaymentRequest(cardInfo),
    callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/3ds-callback`,
  };
};

const decodeBase64Html = (base64: string) => {
  try {
    return Buffer.from(base64, "base64").toString("utf-8");
  } catch (error) {
    console.error("Error decoding base64:", error);
    return "";
  }
};

export async function initiatePayment(
  cardInfo: CardInfo
): Promise<IyzipayResponse> {
  try {
    const request = buildPaymentRequest(cardInfo);

    return new Promise<IyzipayResponse>((resolve, reject) => {
      iyzipay.payment.create(request, (err: Error, result: IyzipayResponse) => {
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

export async function initiate3DSPayment(
  cardInfo: CardInfo
): Promise<ThreeDSInitResponse> {
  try {
    const request = buildThreeDSRequest(cardInfo);

    return new Promise<ThreeDSInitResponse>((resolve, reject) => {
      iyzipay.threedsInitialize.create(
        request,
        (err: Error, result: ThreeDSInitResponse) => {
          if (err) {
            reject(err);
          } else {
            // Decode threeDSHtmlContent if it exists
            if (result.threeDSHtmlContent) {
              result.threeDSHtmlContent = decodeBase64Html(
                result.threeDSHtmlContent
              );
            }
            revalidatePath("/");
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
}

export async function complete3DSPayment(
  paymentId: string,
  conversationId: string
): Promise<ThreeDSCompleteResponse> {
  try {
    const request = {
      locale: Iyzipay.LOCALE.EN,
      conversationId,
      paymentId,
    };

    return new Promise<ThreeDSCompleteResponse>((resolve, reject) => {
      iyzipay.threedsPayment.create(
        request,
        (err: Error, result: ThreeDSCompleteResponse) => {
          if (err) {
            reject(err);
          } else {
            revalidatePath("/");
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
}
