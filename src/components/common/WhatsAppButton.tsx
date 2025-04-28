'use client';

import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber,
  message = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Clean the phone number - remove any non-digit characters
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Create the WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  useEffect(() => {
    // Wait a bit before showing the button for a nice entry effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Start/stop pulsing animation every 10 seconds
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 3000);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${isPulsing ? 'animate-pulse' : ''}`}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-white text-3xl" />
      
      {/* Tooltip on hover */}
      <span className="absolute top-0 right-0 -mt-12 bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        WhatsApp ile əlaqə
      </span>
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-75"></span>
    </a>
  );
};

export default WhatsAppButton; 