# Currency Conversion Utility

This directory contains utilities for currency conversion with real-time exchange rates.

## Currency Utility

The `currency.ts` file implements multi-currency support with the following features:

- Real-time currency exchange rates from an API
- Currency selection and persistence via cookies
- Currency conversion between different currencies
- Price formatting with appropriate symbols
- Default currency fallback

### Key Features

- **Up-to-date exchange rates**: Fetches current rates from ExchangeRate-API
- **Automatic updates**: Refreshes exchange rates hourly
- **Cookie-based persistence**: Remembers user's currency preference
- **React hook API**: Simple integration with React components
- **Loading state**: Provides loading state for handling initial data fetch

### Usage Example

```tsx
import { useCurrency } from '@/lib/utils/currency';

function MyComponent() {
  const { 
    currentCurrency,     // Current selected currency object 
    setCurrency,         // Function to change currency by code
    convertPrice,        // Function to convert a price from AZN to current currency
    formatPrice,         // Function to format and convert a price with symbol
    currencies,          // List of all available currencies
    isLoading            // Whether currency data is still loading
  } = useCurrency();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Price: {formatPrice(100)}</p>
      
      {/* To change currency */}
      <button onClick={() => setCurrency('USD')}>
        Switch to USD
      </button>
    </div>
  );
}
```

### Components

- `CurrencySelector.tsx` - A dropdown component for selecting currency
- `CurrencyLoadingProvider.tsx` - A component that handles loading state for currency data

### API Used

This implementation uses the [ExchangeRate-API](https://www.exchangerate-api.com/) for fetching real-time currency rates. You may want to consider:

1. Creating an account to get an API key for higher rate limits
2. Switching to a different API provider if needed
3. Adding caching to reduce API calls 