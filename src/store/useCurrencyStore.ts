import { create } from 'zustand';
import { setCookie, getCookie } from 'cookies-next';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

const CURRENCY_COOKIE_NAME = 'preferred_currency';
const CURRENCY_COOKIE_EXPIRES = 365; // Days
const API_TIMEOUT = 3000; // 3 saniye API timeout süresi

// Varsayılan para birimleri
const DEFAULT_CURRENCIES: Currency[] = [
  { code: 'AZN', symbol: '₼', name: 'Azərbaycan Manatı', rate: 1 },
  { code: 'USD', symbol: '$', name: 'ABŞ Dolları', rate: 1 },
  { code: 'RUB', symbol: '₽', name: 'Rus Rublu', rate: 1 },
];

// İlk başlatma için cookie kontrolü yapan fonksiyon
const getInitialCurrency = (currencies: Currency[]) => {
  if (typeof window === 'undefined') return currencies[0];
  
  try {
    const cookieCurrencyCode = getCookie(CURRENCY_COOKIE_NAME)?.toString();
    
    if (cookieCurrencyCode) {
      const found = currencies.find(c => c.code === cookieCurrencyCode);
      if (found) return found;
    }
  } catch (error) {
    console.error('Cookie okuma hatası:', error);
  }
  
  return currencies[0];
};

interface CurrencyState {
  currencies: Currency[];
  currentCurrency: Currency;
  isInitialized: boolean;
  isLoading: boolean;
  isFetching: boolean;
  setCurrency: (currencyCode: string) => void;
  convertPrice: (priceInAZN: number | string) => number | null;
  formatPrice: (priceInAZN: number | string) => string;
  fetchExchangeRates: () => Promise<void>;
  initializeFromCookie: () => Promise<void>;
}

const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currencies: DEFAULT_CURRENCIES,
  currentCurrency: getInitialCurrency(DEFAULT_CURRENCIES),
  isInitialized: false,
  isLoading: true,
  isFetching: false,

  initializeFromCookie: async () => {
    if (typeof window === 'undefined') return;
    
    set({ isLoading: true });
    
    try {
      // Önce API'den kurları al
      await get().fetchExchangeRates();
      
      // Sonra cookie'den para birimini ayarla
      const cookieCurrencyCode = getCookie(CURRENCY_COOKIE_NAME)?.toString();
      const { currencies } = get();
      
      if (cookieCurrencyCode) {
        const found = currencies.find(c => c.code === cookieCurrencyCode);
        if (found) {
          set({ currentCurrency: found });
        }
      } else {
        // Cookie yoksa varsayılan para birimini ayarla
        const defaultCurrency = currencies[0];
        setCookie(CURRENCY_COOKIE_NAME, defaultCurrency.code, {
          maxAge: 60 * 60 * 24 * CURRENCY_COOKIE_EXPIRES,
          path: '/',
          sameSite: 'strict',
        });
        set({ currentCurrency: defaultCurrency });
      }
      
      set({ isInitialized: true, isLoading: false });
    } catch (error) {
      console.error('Para birimi başlatma hatası:', error);
      set({ isInitialized: true, isLoading: false });
    }
  },

  setCurrency: (currencyCode: string) => {
    const { currencies } = get();
    const currency = currencies.find(c => c.code === currencyCode);
    if (!currency) return;
    
    setCookie(CURRENCY_COOKIE_NAME, currency.code, {
      maxAge: 60 * 60 * 24 * CURRENCY_COOKIE_EXPIRES,
      path: '/',
      sameSite: 'strict',
    });
    
    set({ currentCurrency: currency });
    
    // Arka planda kurları güncellemeyi dene
    get().fetchExchangeRates();
  },

  convertPrice: (priceInAZN: number | string) => {
    const { currentCurrency, isLoading, isInitialized } = get();
    
    if (!isInitialized || isLoading) return null;
    
    const price = typeof priceInAZN === 'string' ? parseFloat(priceInAZN) : priceInAZN;
    if (isNaN(price)) return null;
    
    if (currentCurrency.code === 'AZN') {
      return price;
    }
    
    return Number((price * currentCurrency.rate).toFixed(2));
  },

  formatPrice: (priceInAZN: number | string) => {
    const { currentCurrency, isLoading, isInitialized } = get();
    
    if (!isInitialized || isLoading) {
      return 'Yükleniyor...';
    }
    
    const price = typeof priceInAZN === 'string' ? parseFloat(priceInAZN) : priceInAZN;
    if (isNaN(price)) return '0';
    
    if (currentCurrency.code === 'AZN') {
      const formattedNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
      
      return `${formattedNumber} ${currentCurrency.symbol}`;
    }
    
    const convertedPrice = Number((price * currentCurrency.rate).toFixed(2));
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(convertedPrice);
    
    if (currentCurrency.code === 'USD' || currentCurrency.code === 'EUR') {
      return `${currentCurrency.symbol}${formattedNumber}`;
    } else {
      return `${formattedNumber} ${currentCurrency.symbol}`;
    }
  },

  fetchExchangeRates: async () => {
    if (get().isFetching) return;
    
    set({ isFetching: true });
    
    // Timeout ile API çağrısı
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('API zaman aşımı')), API_TIMEOUT)
    );
    
    try {
      // API çağrısı ve timeout yarışı
      const response = await Promise.race([
        fetch('https://open.er-api.com/v6/latest/AZN'),
        timeoutPromise
      ]) as Response;
      
      const data = await response.json();
      
      if (data && data.rates) {
        // Başarılı API yanıtı, kurları güncelle
        const { currencies: currentCurrencies } = get();
        const updatedCurrencies = currentCurrencies.map(currency => {
          if (currency.code !== 'AZN') {
            const rate = data.rates[currency.code];
            if (rate) {
              return { ...currency, rate };
            }
          }
          return currency;
        });
        
        set({ currencies: updatedCurrencies });
        
        // Aktif para biriminin kurunu güncelle
        const { currentCurrency } = get();
        if (currentCurrency.code !== 'AZN') {
          const updatedCurrency = updatedCurrencies.find(c => c.code === currentCurrency.code);
          if (updatedCurrency) {
            set({ currentCurrency: updatedCurrency });
          }
        }
      }
    } catch (error) {
      console.error('Kur bilgisi alınamadı:', error);
    } finally {
      set({ isFetching: false });
    }
  },
}));

export { useCurrencyStore };