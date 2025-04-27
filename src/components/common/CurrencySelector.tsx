"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/lib/utils/currency";
import { FaGlobeAmericas, FaChevronDown, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function CurrencySelector() {
  const { currentCurrency, setCurrency, currencies, isLoading } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle currency selection
  const handleCurrencySelect = (currencyCode: string) => {
    setCurrency(currencyCode);
    setIsOpen(false);
    window.location.reload()
  };

  if (isLoading) {
    return (
      <div className="flex items-center px-3 py-2 space-x-2">
        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="currency-selector-button flex items-center justify-between gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all active:scale-95 w-full md:min-w-[80px]"
        aria-label="Select currency"
        aria-expanded={isOpen}
      > 
        <div className="flex items-center space-x-1.5">
          <FaGlobeAmericas className="text-blue-500" />
          <span>{currentCurrency?.code}</span>
        </div>
        <FaChevronDown
          className={`transform transition-transform duration-200 text-xs ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-[1000] border border-gray-100 hidden md:block"
            >
              <div className="py-1 min-w-[120px]">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencySelect(currency.code)}
                    className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                      currentCurrency?.code === currency.code
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{currency.code}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {currency.symbol}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-xl z-50 max-h-[80vh] overflow-auto"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-medium">Valyuta seçin</h3>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>
                
                <div className="p-2">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencySelect(currency.code)}
                      className={`flex items-center justify-between w-full px-4 py-4 rounded-lg transition-colors my-1 ${
                        currentCurrency?.code === currency.code
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-lg font-medium">{currency.code}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          {currency.symbol}
                        </span>
                      </div>
                      {currentCurrency?.code === currency.code && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
