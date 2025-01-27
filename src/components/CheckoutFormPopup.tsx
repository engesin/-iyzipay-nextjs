type CheckoutFormPopupProps = {
  checkoutFormContent: string;
};

export function CheckoutFormPopup({
  checkoutFormContent,
}: CheckoutFormPopupProps) {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div id="iyzipay-checkout-form" className="popup"></div>
        <div dangerouslySetInnerHTML={{ __html: checkoutFormContent }} />
      </div>
    </div>
  );
}
