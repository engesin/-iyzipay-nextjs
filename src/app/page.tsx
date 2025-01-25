import PaymentForm from "@/components/PaymentForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Iyzico Payment Integration
        </h1>
        <PaymentForm />
      </div>
    </main>
  );
}
