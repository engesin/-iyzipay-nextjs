"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Iyzico Payment Integration Examples
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/3ds-non3ds"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              3DS/Non-3DS Payment
            </h2>
            <p className="text-gray-600">
              Test payment integration with 3DS and Non-3DS options using direct
              card input.
            </p>
          </Link>

          <a
            href="/checkout"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Checkout Form
            </h2>
            <p className="text-gray-600">
              Test payment using iyzico&apos;s hosted checkout form with various
              display options.
            </p>
          </a>

          <a
            href="/checkout-popup"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Checkout Form (Popup)
            </h2>
            <p className="text-gray-600">
              Test payment using iyzico&apos;s hosted checkout form with popup
              display option.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
