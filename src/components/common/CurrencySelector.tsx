"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/lib/utils/currency";
import { FaGlobeAmericas, FaChevronDown } from "react-icons/fa";

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
    // setIsOpen(false);
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
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
      >
        <FaGlobeAmericas className="mr-2" />
        <span>{currentCurrency?.code}</span>
        <FaChevronDown
          className={`ml-1 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-1">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencySelect(currency.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentCurrency?.code === currency.code
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{currency.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
