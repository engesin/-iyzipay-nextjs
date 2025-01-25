# Iyzico Payment Integration with Next.js

This project demonstrates how to integrate Iyzico payment gateway with a Next.js application, featuring a beautiful credit card form with real-time card preview and support for both regular and 3D Secure payments.

![Demo Preview](demo.gif)

## Features

- 💳 Real-time credit card preview
- 🔄 Live form validation
- 📱 Responsive design
- 🔒 Secure payment processing
- ⚡ Server-side payment handling with Next.js Server Actions
- 🎨 Modern UI with Tailwind CSS
- 🔐 3D Secure Payment Support
- 🔄 Automatic card type detection
- ✨ Real-time form validation
- 🌐 Support for multiple currencies (TRY, USD, EUR)

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
NEXT_PUBLIC_BASE_URL=http://localhost:3000 # Your application URL for 3D Secure callback
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
│   ├── api/
│   │   └── payment/
│   │       └── 3ds-callback/ # 3D Secure callback handling
│   ├── types/
│   │   └── payment.ts      # TypeScript types for payment
│   └── page.tsx            # Main payment page
├── components/
│   ├── card/
│   │   ├── CardBack.tsx    # Credit card back view
│   │   ├── CardForm.tsx    # Payment form component
│   │   ├── CardFront.tsx   # Credit card front view
│   │   └── CardPreview.tsx # Credit card preview component
│   ├── PaymentForm.tsx     # Main payment form container
│   └── ThreeDSForm.tsx     # 3D Secure form handler
└── lib/
    └── iyzico.ts           # Iyzico configuration
```

## Payment Flow

### Regular Payment

1. User fills in the card details
2. Payment is processed directly through Iyzico
3. Response is handled and displayed to the user

### 3D Secure Payment

1. User fills in the card details and opts for 3D Secure
2. Initial request is sent to Iyzico
3. User is redirected to bank's 3D Secure page
4. User enters SMS/verification code
5. Bank validates and redirects back to the application
6. Payment completion is handled and result displayed

## Testing

For testing purposes, you can use Iyzico's test cards:

- Success (Non-3D): 5890040000000016
- Failure (Non-3D): 5890040000000017
- Success (3D): 4603450000000000
- Failure (3D): 4603451000000000

For 3D Secure test cards:

- Any SMS code will work in the sandbox environment
- Use any valid future date for expiration
- Use any 3-digit number for CVC

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
