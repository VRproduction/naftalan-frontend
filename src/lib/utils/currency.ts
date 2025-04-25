'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

// Default currencies with initial rates 
// (will be updated with actual rates from API)
export const currencies: Currency[] = [
  { code: 'AZN', symbol: '₼', name: 'Azərbaycan Manatı', rate: 1 },
  { code: 'USD', symbol: '$', name: 'ABŞ Dolları', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Avro', rate: 1 },
  { code: 'RUB', symbol: '₽', name: 'Rus Rublu', rate: 1 },
  { code: 'TRY', symbol: '₺', name: 'Türk Lirəsi', rate: 1 },
];

// Cookie name for storing currency preference
const CURRENCY_COOKIE_NAME = 'preferred_currency';
const CURRENCY_COOKIE_EXPIRES = 365; // Days

// Fetch current exchange rates from API
const fetchExchangeRates = async () => {
  try {
    // Using ExchangeRate-API for real-time rates (you can use any API of your choice)
    // Replace with your preferred API and API key 
    const response = await fetch('https://open.er-api.com/v6/latest/AZN');
    const data = await response.json();
    
    if (data && data.rates) {
      // Update currency rates 
      currencies.forEach(currency => {
        if (currency.code !== 'AZN') { // AZN is base currency, rate stays 1
          currency.rate = 1 / data.rates[currency.code]; // Invert rate since API gives AZN to other currency
        }
      });
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return false;
  }
};

// Custom hook for currency operations
export function useCurrency() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency | null>();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize currency from cookie and fetch rates
  useEffect(() => {
    const initCurrency = async () => {
      setIsLoading(true);
      
      // Get preferred currency from cookie
      const cookieCurrencyCode = getCookie(CURRENCY_COOKIE_NAME)?.toString();
      let selectedCurrency = currencies[0]; // Default to AZN
      
      if (cookieCurrencyCode) {
        const found = currencies.find(c => c.code === cookieCurrencyCode);
        if (found) {
          selectedCurrency = found;
        }
      }
      
      // Fetch current exchange rates
      await fetchExchangeRates();
      
      // Set the current currency (now with updated rates)
      setCurrentCurrency(selectedCurrency);
      setIsLoading(false);
    };
    
    initCurrency();
    
    // Refresh exchange rates every hour
    const intervalId = setInterval(() => {
      fetchExchangeRates();
    }, 60 * 60 * 1000); // 1 hour
    
    return () => clearInterval(intervalId);
  }, []);

  // Function to change currency
  const setCurrency = (currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    if (!currency) return;
    
    // Save to cookie
    setCookie(CURRENCY_COOKIE_NAME, currency.code, {
      maxAge: 60 * 60 * 24 * CURRENCY_COOKIE_EXPIRES,
      path: '/',
      sameSite: 'strict',
    });
    
    // Update state
    setCurrentCurrency(currency);
  };

  // Convert price from AZN to current currency
  const convertPrice = (priceInAZN: number | string) => {
    const price = typeof priceInAZN === 'string' ? parseFloat(priceInAZN) : priceInAZN;
    if (isNaN(price)) return 0;
    
    return currentCurrency && Number((price * currentCurrency.rate).toFixed(2));
  };

  // Format price with currency symbol
  const formatPrice = (priceInAZN: number | string) => {
    const convertedPrice = convertPrice(priceInAZN);
    return currentCurrency && `${convertedPrice} ${currentCurrency.symbol}`;
  };

  return {
    currentCurrency,
    setCurrency,
    convertPrice,
    formatPrice,
    currencies,
    isLoading
  };
} 