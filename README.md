# Iyzico Payment Integration with Next.js

This project demonstrates how to integrate Iyzico payment gateway with a Next.js application, featuring a beautiful credit card form with real-time card preview.

![Demo Preview](demo.gif)

## Features

- 💳 Real-time credit card preview
- 🔄 Live form validation
- 📱 Responsive design
- 🔒 Secure payment processing
- ⚡ Server-side payment handling with Next.js Server Actions
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.17 or later
- Yarn package manager (recommended)
- An Iyzico merchant account and API credentials

## Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/iyzico-nextjs-demo.git
cd iyzico-nextjs-demo
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the root directory with your Iyzico credentials:

```env
IYZIPAY_URI=https://sandbox-api.iyzipay.com # or https://api.iyzipay.com for production
IYZIPAY_API_KEY=your_api_key
IYZIPAY_SECRET_KEY=your_secret_key
```

## Development

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the payment form.

## Project Structure

```
src/
├── app/
│   ├── actions/
│   │   └── payment.ts      # Server actions for payment processing
│   │   └── types/
│   │   └── page.tsx            # Main payment page
│   └── components/
│   │   ├── card/
│   │   │   ├── CardBack.tsx    # Credit card back view
│   │   │   ├── CardForm.tsx    # Payment form component
│   │   │   ├── CardFront.tsx   # Credit card front view
│   │   │   └── CardPreview.tsx # Credit card preview component
│   │   └── PaymentForm.tsx     # Main payment form container
│   └── lib/
│   └── iyzico.ts           # Iyzico configuration
```

## Configuration

The project uses Next.js server components and server actions. The configuration is in `next.config.ts`:

```typescript
const nextConfig = {
  experimental: {
    serverExternalPackages: ["iyzipay"],
  },
};
```

## Testing

For testing purposes, you can use Iyzico's test cards:

- Success: 5890040000000016
- Failure: 5890040000000017
- Success (3D): 4603450000000000
- Failure (3D): 4603451000000000

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Iyzico API Documentation](https://dev.iyzipay.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Support

If you have any questions or run into issues, please open an issue in the repository.
