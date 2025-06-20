import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaTimes, FaDownload, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSliderModalProps {
  images: { image: string; alt?: string }[];
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

const ZOOM_SCALE = 2;

const ImageSliderModal: React.FC<ImageSliderModalProps> = ({ images, isOpen, initialIndex = 0, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const thumbBarRef = useRef<HTMLDivElement>(null);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowLeft') setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    if (e.key === 'ArrowRight') setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    if (e.key === 'Escape') onClose();
  }, [isOpen, images.length, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    setIsImageLoading(true);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    setZoomOrigin({ x: 50, y: 50 });
    // Auto-scroll thumbnail bar to selected
    if (thumbBarRef.current) {
      const selected = thumbBarRef.current.querySelector('.selected-thumb');
      if (selected && 'scrollIntoView' in selected) {
        (selected as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [current]);

  useEffect(() => {
    if (isOpen) setCurrent(initialIndex);
  }, [isOpen, initialIndex]);

  if (!isOpen || images.length === 0) return null;

  // Drag/swipe support (framer-motion)
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (isZoomed) return;
    const swipe = info.offset.x;
    if (swipe < -70) setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    else if (swipe > 70) setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Download current image
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(images[current].image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = images[current].alt || `image-${current + 1}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
    } catch (e) {
      alert('Resim indirilemedi.');
    }
    setDownloading(false);
  };

  // Double click to zoom
  const handleDoubleClick = () => setIsZoomed(z => !z);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isZoomed) {
      // Calculate click position as percent of image
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
      setIsZoomed(true);
    }
  };

  const handleZoomButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isZoomed) {
      setIsZoomed(false);
      setPan({ x: 0, y: 0 });
      setZoomOrigin({ x: 50, y: 50 });
    } else {
      setIsZoomed(true);
      setZoomOrigin({ x: 50, y: 50 });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Main modal content */}
          <motion.div
            className="relative w-full h-full flex flex-col items-center justify-center z-[200]"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top bar: close, download, counter */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-30 pointer-events-none">
              <div className="pointer-events-auto bg-black/50 rounded-full px-3 py-1 text-white text-sm font-medium shadow">
                {current + 1} / {images.length}
              </div>
              <div className="flex gap-2 pointer-events-auto">
                <button
                  aria-label="Download image"
                  tabIndex={0}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition shadow relative"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <span className="w-4 h-4 block animate-spin border-2 border-white border-r-transparent rounded-full mx-auto" />
                  ) : (
                    <FaDownload />
                  )}
                </button>
                <button
                  aria-label="Close gallery"
                  tabIndex={0}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition shadow"
                  onClick={onClose}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            {/* Main image area */}
            <div className="flex-1 flex items-center justify-center w-full max-h-[80vh]">
              <div className="relative w-full max-w-4xl h-[60vw] max-h-[80vh] min-h-[220px] flex items-center justify-center rounded-xl overflow-hidden bg-black shadow-xl">
                {isImageLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-2"></div>
                    <span className="text-white text-xs">Loading...</span>
                  </div>
                )}
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="h-full w-full"
                  drag={isZoomed ? true : false}
                  dragConstraints={isZoomed ? false : { left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={isZoomed ? (e, info) => setPan({ x: pan.x + info.offset.x, y: pan.y + info.offset.y }) : undefined}
                  onDoubleClick={handleDoubleClick}
                  onClick={handleImageClick}
                  style={{
                    cursor: isZoomed ? 'grab' : 'zoom-in',
                    transform: isZoomed
                      ? `scale(${ZOOM_SCALE}) translate(${pan.x / ZOOM_SCALE}px, ${pan.y / ZOOM_SCALE}px)`
                      : undefined,
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                    transition: isZoomed ? 'transform 0.3s cubic-bezier(.4,0,.2,1)' : undefined,
                  }}
                >
                  <Image
                    src={images[current].image}
                    alt={images[current].alt || `Image ${current + 1}`}
                    fill
                    className={`transition-transform duration-300 ${isZoomed ? 'object-cover' : 'object-contain'} rounded-xl`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    priority
                    quality={90}
                    onLoadingComplete={() => setIsImageLoading(false)}
                    onLoad={() => setIsImageLoading(false)}
                  />
                  {/* Zoom button */}
                  <button
                    aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                    tabIndex={0}
                    className="absolute bottom-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition shadow"
                    onClick={handleZoomButton}
                  >
                    {isZoomed ? <FaSearchMinus /> : <FaSearchPlus />}
                  </button>
                </motion.div>
                {/* Navigation arrows */}
                {!isZoomed && images.length > 1 && (
                  <>
                    <button
                      aria-label="Previous image"
                      tabIndex={0}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
                      onClick={e => { e.stopPropagation(); setCurrent(current === 0 ? images.length - 1 : current - 1); }}
                    >
                      <FaChevronLeft size={22} />
                    </button>
                    <button
                      aria-label="Next image"
                      tabIndex={0}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
                      onClick={e => { e.stopPropagation(); setCurrent(current === images.length - 1 ? 0 : current + 1); }}
                    >
                      <FaChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* Caption */}
            {images[current].alt && (
              <div className="mt-2 text-white text-base bg-black/40 rounded px-3 py-1 max-w-full truncate text-center shadow">
                {images[current].alt}
              </div>
            )}
            {/* Thumbnails - sticky, shadowed, auto-scroll */}
            {images.length > 1 && !isZoomed && (
              <div className="sticky bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent py-3 z-30 shadow-2xl">
                <div
                  ref={thumbBarRef}
                  className="flex justify-center overflow-x-auto gap-2 px-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      aria-label={`Show image ${idx + 1}`}
                      tabIndex={0}
                      className={`relative h-16 w-24 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 shadow-md ${idx === current ? 'border-blue-500 selected-thumb scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      onClick={() => setCurrent(idx)}
                    >
                      <Image
                        src={img.image}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageSliderModal; 