# SaaS Dashboard

A modern, professional SaaS application with dark theme UI built with Next.js, Material-UI, and TypeScript.

## Features

- 🔐 **User Authentication** - Complete auth system with login, signup, and password reset
- 🎨 **Dark Theme UI** - Professional dark theme with consistent styling
- 📊 **Dashboard Analytics** - Interactive charts showing API usage, storage, and bandwidth
- 💳 **Credits System** - Credit balance tracking and purchase management
- 💰 **Stripe Integration** - Payment processing for subscriptions and credits
- 📈 **Usage Monitoring** - Real-time tracking of API calls and resource consumption
- 👤 **User Management** - Profile settings and account management
- 📱 **Responsive Design** - Mobile-friendly navigation and layouts

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: Material-UI (MUI) v5
- **Charts**: MUI X Charts
- **Styling**: Emotion + MUI Theme
- **Language**: TypeScript
- **Icons**: Material-UI Icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.saasui.tsx    # Main preview page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── billing/          # Billing and pricing components
│   ├── charts/           # Chart components
│   ├── dashboard/        # Dashboard widgets
│   ├── layout/           # Layout components
│   ├── navigation/       # Navigation components
│   ├── pages/            # Page components
│   └── tables/           # Table components
├── data/                 # Mock data
├── theme/                # MUI theme configuration
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Key Components

- **AuthForm** - Authentication with validation
- **DashboardLayout** - Main app layout with sidebar
- **NavigationSidebar** - Responsive navigation
- **DashboardCard** - Metric cards with progress indicators
- **UsageChart** - Interactive usage analytics charts
- **PricingCard** - Subscription plan cards
- **DataTable** - Payment history and data tables

## Mock Data

The application includes comprehensive mock data for:
- User profiles and authentication
- Usage statistics and analytics
- Payment history and billing
- Subscription plans and pricing
- Credits and transactions

## Customization

The application uses a centralized theme system. Modify `theme/theme.ts` to customize:
- Color palette
- Typography
- Component styling
- Dark/light mode settings

## License

This project is for demonstration purposes.# test_kombai
