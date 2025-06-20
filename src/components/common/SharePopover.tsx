import React, { useState, useRef, useEffect } from 'react';
import { RiShareForwardLine, RiCloseLine, RiCheckLine, RiFileCopyLine, RiWhatsappFill, RiTelegramFill, RiFacebookFill, RiTwitterFill } from 'react-icons/ri';

interface SharePopoverProps {
  url: string;
  title: string;
  className?: string;
  onShare?: () => void;
}

const SharePopover: React.FC<SharePopoverProps> = ({
  url,
  title,
  className = '',
  onShare,
}) => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  const handleShare = async () => {
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    if (isMobile && navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
        onShare?.();
      } catch {}
    } else {
      setShow((v) => !v);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-label="Paylaş"
        className="flex items-center gap-2 p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-colors shadow-sm border border-gray-200"
        onClick={handleShare}
      >
        <RiShareForwardLine className="w-5 h-5" />
        <span className="hidden md:inline text-sm font-medium">Paylaş</span>
      </button>
      {/* Popover (desktop) */}
      {show && (
        <div ref={popoverRef} className="absolute right-0 mt-2 z-50 min-w-[260px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-4 flex flex-col items-center animate-fade-in">
          <button
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            onClick={() => setShow(false)}
            aria-label="Kapat"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
          <div className="flex gap-3 justify-center mt-1">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-700 text-xl transition-all"
            >
              <RiWhatsappFill className="w-6 h-6" />
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-xl transition-all"
            >
              <RiTelegramFill className="w-6 h-6" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-200 text-blue-700 text-xl transition-all"
            >
              <RiFacebookFill className="w-6 h-6" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-200 text-blue-500 text-xl transition-all"
            >
              <RiTwitterFill className="w-6 h-6" />
            </a>
            <button
              type="button"
              aria-label="Kopyala"
              className={`w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-xl transition-all ${copied ? 'bg-green-100 text-green-600' : ''}`}
              onClick={handleCopy}
            >
              {copied ? <RiCheckLine className="w-6 h-6" /> : <RiFileCopyLine className="w-6 h-6" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePopover; 