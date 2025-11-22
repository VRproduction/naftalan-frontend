'use client';

import React, { useEffect, useState, useRef } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber = '994501234567',
  message = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const positionRef = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  useEffect(() => {
    // Initialize position on client side
    positionRef.current = {
      x: window.innerWidth - 90,
      y: window.innerHeight - 150
    };
    
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 3000);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleStart = (clientX: number, clientY: number, e: Event) => {
    e.preventDefault();
    isDraggingRef.current = false;
    startPosRef.current = { x: clientX, y: clientY };
    dragStartPos.current = {
      x: clientX - positionRef.current.x,
      y: clientY - positionRef.current.y
    };
  };

  const handleMove = (clientX: number, clientY: number) => {
    const distance = Math.sqrt(
      Math.pow(clientX - startPosRef.current.x, 2) + 
      Math.pow(clientY - startPosRef.current.y, 2)
    );
    
    // 5 piksel üzerinde hareket varsa dragging başlat
    if (distance > 5) {
      isDraggingRef.current = true;
    }

    if (isDraggingRef.current) {
      const newX = clientX - dragStartPos.current.x;
      const newY = clientY - dragStartPos.current.y;
      
      const maxX = window.innerWidth - 56;
      const maxY = window.innerHeight - 56;
      
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));
      
      positionRef.current = { x: boundedX, y: boundedY };
      
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY, e.nativeEvent);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleMove(moveEvent.clientX, moveEvent.clientY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY, e.nativeEvent);
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length > 0) {
        const touch = moveEvent.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Eğer sürükleme yapıldıysa, linke gitmesini engelle
    if (isDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={buttonRef}
      className={`fixed z-50 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      } transition-opacity duration-300`}
      style={{
        left: 0,
        top: 0,
        cursor: 'grab',
        touchAction: 'none',
        willChange: 'transform'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group ${
          isPulsing ? 'animate-pulse' : ''
        }`}
        aria-label="Contact us on WhatsApp"
        style={{ pointerEvents: 'auto' }}
      >
        <svg 
          className="text-white" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-75"></span>
      </a>
    </div>
  );
};

export default WhatsAppButton;