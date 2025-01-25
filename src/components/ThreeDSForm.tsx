"use client";

import { useEffect } from "react";

type ThreeDSFormProps = {
  htmlContent: string;
};

export function ThreeDSForm({ htmlContent }: ThreeDSFormProps) {
  useEffect(() => {
    // Submit the form after component mount
    const form = document.getElementById("iyzico-3ds-form") as HTMLFormElement;
    if (form) {
      form.submit();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Redirecting to 3D Secure Verification
        </h2>
        <p className="mt-2 text-gray-600">Please do not close this window...</p>
        <div
          className="hidden"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
