type CheckoutFormProps = {
  checkoutFormContent: string;
};

export function CheckoutForm({ checkoutFormContent }: CheckoutFormProps) {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Checkout Form
        </h1>
        <div id="iyzipay-checkout-form" className="responsive" />
        <div dangerouslySetInnerHTML={{ __html: checkoutFormContent }} />
      </div>
    </div>
  );
}
