"use client";

import { CardInfo, Currency } from "@/app/types/payment";
import { useState } from "react";

type CardFormProps = {
  onSubmit: (data: CardInfo) => Promise<void>;
  onCVCFocus: () => void;
  onCVCBlur: () => void;
  onCardDataChange: (data: CardInfo) => void;
  isLoading: boolean;
};

const inputClassName =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500";

const labelClassName = "block text-base font-medium text-gray-900";

const currencies: Currency[] = Object.values(Currency);

export function CardForm({
  onSubmit,
  onCVCFocus,
  onCVCBlur,
  onCardDataChange,
  isLoading,
}: CardFormProps) {
  const [formData, setFormData] = useState<CardInfo>({
    cardHolderName: "",
    cardNumber: "",
    expireMonth: "",
    expireYear: "",
    cvc: "",
    price: "",
    currency: Currency.TRY,
  });

  const handleFormChange = (field: keyof CardInfo, value: string) => {
    let processedValue = value;

    switch (field) {
      case "cardNumber":
        // Remove non-numeric characters and limit to 16 digits
        processedValue = value.replace(/\D/g, "").slice(0, 16);
        // Add spaces every 4 digits for display
        processedValue = processedValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
        break;
      case "expireMonth":
        // Remove non-numeric characters and limit to 2 digits
        processedValue = value.replace(/\D/g, "").slice(0, 2);
        // Ensure month is between 1 and 12
        if (processedValue) {
          const month = parseInt(processedValue);
          if (month > 12) processedValue = "12";
          if (month < 1 && processedValue.length === 2) processedValue = "01";
        }
        break;
      case "expireYear":
        // Remove non-numeric characters and limit to 4 digits
        processedValue = value.replace(/\D/g, "").slice(0, 4);
        break;
      case "cvc":
        // Remove non-numeric characters and limit to 3 digits
        processedValue = value.replace(/\D/g, "").slice(0, 3);
        break;
      case "currency":
        // Ensure currency is one of the valid options
        processedValue = currencies.includes(value as Currency) ? value : "TRY";
        break;
      default:
        break;
    }

    const newFormData = { ...formData, [field]: processedValue };
    setFormData(newFormData);
    onCardDataChange(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cardHolderName" className={labelClassName}>
            Card Holder Name
          </label>
          <input
            type="text"
            id="cardHolderName"
            value={formData.cardHolderName}
            onChange={(e) => handleFormChange("cardHolderName", e.target.value)}
            className={inputClassName}
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className={labelClassName}>
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => handleFormChange("cardNumber", e.target.value)}
            className={inputClassName}
            placeholder="1234 5678 9012 3456"
            required
            inputMode="numeric"
            pattern="[0-9\s]*"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="expireMonth" className={labelClassName}>
              Month
            </label>
            <input
              type="text"
              id="expireMonth"
              value={formData.expireMonth}
              onChange={(e) => handleFormChange("expireMonth", e.target.value)}
              className={inputClassName}
              placeholder="MM"
              required
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>

          <div>
            <label htmlFor="expireYear" className={labelClassName}>
              Year
            </label>
            <input
              type="text"
              id="expireYear"
              value={formData.expireYear}
              onChange={(e) => handleFormChange("expireYear", e.target.value)}
              className={inputClassName}
              placeholder="YYYY"
              required
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>

          <div>
            <label htmlFor="cvc" className={labelClassName}>
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              value={formData.cvc}
              onChange={(e) => handleFormChange("cvc", e.target.value)}
              onFocus={onCVCFocus}
              onBlur={onCVCBlur}
              className={inputClassName}
              placeholder="123"
              required
              maxLength={3}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className={labelClassName}>
              Amount
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => handleFormChange("price", e.target.value)}
              className={inputClassName}
              placeholder="0.00"
              required
              min="1"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="currency" className={labelClassName}>
              Currency
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => handleFormChange("currency", e.target.value)}
              className={inputClassName}
              required
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </div>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
    </div>
  );
}
