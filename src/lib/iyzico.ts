import Iyzipay from "iyzipay";

if (
  !process.env.IYZIPAY_SECRET_KEY ||
  !process.env.IYZIPAY_API_KEY ||
  !process.env.IYZIPAY_URI
) {
  throw new Error(
    "Missing required environment variables for Iyzipay configuration"
  );
}

export const iyzipay = new Iyzipay({
  apiKey: process.env.IYZIPAY_API_KEY,
  secretKey: process.env.IYZIPAY_SECRET_KEY,
  uri: process.env.IYZIPAY_URI,
});
