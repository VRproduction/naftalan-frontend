'use client';

import { useState, useRef, useEffect } from 'react';
import { format, isToday, isAfter, isBefore, addMonths, startOfMonth, endOfMonth, 
  eachDayOfInterval, getDay, parseISO, isValid, addYears, subYears, getYear } from 'date-fns';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import * as Popover from '@radix-ui/react-popover';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';

type ColorOption = 'slate' | 'zinc' | 'blue' | 'indigo' | 'violet' | 'purple' | 'teal';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
  primaryColor?: ColorOption;
  secondaryColor?: ColorOption;
  label?: string;
  placeholder?: string;
  className?: string;
  hasError?: boolean;
}

const colorVariants = {
  slate: {
    primary: 'bg-slate-400 text-slate-800 hover:bg-slate-500',
    light: 'bg-slate-200 text-slate-700 border-slate-100',
    text: 'text-slate-600',
    hover: 'hover:bg-slate-50',
    ring: 'ring-slate-200',
    border: 'border-slate-400'
  },
  zinc: {
    primary: 'bg-zinc-400 text-zinc-800 hover:bg-zinc-205',
    light: 'bg-zinc-200 text-zinc-700 border-zinc-100',
    text: 'text-zinc-600',
    hover: 'hover:bg-zinc-50',
    ring: 'ring-zinc-200',
    border: 'border-zinc-400'
  },
  blue: {
    primary: 'bg-blue-400 text-blue-800 hover:bg-blue-205',
    light: 'bg-blue-200 text-blue-700 border-blue-100',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-50',
    ring: 'ring-blue-200',
    border: 'border-blue-400'
  },
  indigo: {
    primary: 'bg-indigo-400 text-indigo-800 hover:bg-indig5-200',
    light: 'bg-indigo-200 text-indigo-700 border-indigo-100',
    text: 'text-indigo-600',
    hover: 'hover:bg-indigo-50',
    ring: 'ring-indigo-200',
    border: 'border-indigo-400'
  },
  violet: {
    primary: 'bg-violet-400 text-violet-800 hover:bg-viole5-200',
    light: 'bg-violet-200 text-violet-700 border-violet-100',
    text: 'text-violet-600',
    hover: 'hover:bg-violet-50',
    ring: 'ring-violet-200',
    border: 'border-violet-400'
  },
  purple: {
    primary: 'bg-purple-400 text-purple-800 hover:bg-purpl5-200',
    light: 'bg-purple-200 text-purple-700 border-purple-100',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-50',
    ring: 'ring-purple-200',
    border: 'border-purple-400'
  },
  teal: {
    primary: 'bg-teal-400 text-teal-800 hover:bg-teal-205',
    light: 'bg-teal-200 text-teal-700 border-teal-100',
    text: 'text-teal-600',
    hover: 'hover:bg-teal-50',
    ring: 'ring-teal-200',
    border: 'border-teal-400'
  }
};

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  primaryColor = 'indigo',
  secondaryColor = 'violet',
  label,
  placeholder,
  className = '',
  hasError
}: DateRangePickerProps) {
  const t = useTranslations('search');
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    startDate && isValid(parseISO(startDate)) ? parseISO(startDate) : new Date()
  );
  const [secondCurrentMonth, setSecondCurrentMonth] = useState(addMonths(
    startDate && isValid(parseISO(startDate)) ? parseISO(startDate) : new Date(), 1
  ));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [activeSelection, setActiveSelection] = useState<'start' | 'end'>('start');
  
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  
  const parsedStartDate = startDate ? parseISO(startDate) : null;
  const parsedEndDate = endDate ? parseISO(endDate) : null;
  
  // Format for display
  const displayValue = parsedStartDate && parsedEndDate 
    ? `${format(parsedStartDate, 'MMM dd, yyyy')} — ${format(parsedEndDate, 'MMM dd, yyyy')}`
    : t('select_dates') || placeholder;
  
  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update second month when first month changes
  useEffect(() => {
    setSecondCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);
  
  // Navigate month independently for each calendar
  const navigateMonth = (direction: 'prev' | 'next', monthIndex: number) => {
    if (monthIndex === 0) {
      setCurrentMonth(prevMonth => 
        direction === 'prev' ? addMonths(prevMonth, -1) : addMonths(prevMonth, 1)
      );
    } else {
      setSecondCurrentMonth(prevMonth => 
        direction === 'prev' ? addMonths(prevMonth, -1) : addMonths(prevMonth, 1)
      );
    }
  };

  // Handle year change
  const handleYearChange = (newYear: number, monthIndex: number) => {
    const currentYear = getYear(monthIndex === 0 ? currentMonth : secondCurrentMonth);
    const yearDiff = newYear - currentYear;
    
    if (monthIndex === 0) {
      setCurrentMonth(prevMonth => addYears(prevMonth, yearDiff));
    } else {
      setSecondCurrentMonth(prevMonth => addYears(prevMonth, yearDiff));
    }
  };
  
  // Get days for current month with empty slots for alignment
  const getDaysInMonth = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const startDay = getDay(monthStart);
    
    // Add empty slots for days before the 1st of the month
    const blanks = Array(startDay).fill(null);
    
    return [...blanks, ...daysInMonth];
  };
  
  // Handle day selection
  const handleDayClick = (day: Date) => {
    if (activeSelection === 'start') {
      // If selecting start date
      onChange(format(day, 'yyyy-MM-dd'), endDate);
      setActiveSelection('end');
      
      // If clicked date is after current end date, reset end date
      if (parsedEndDate && isAfter(day, parsedEndDate)) {
        onChange(format(day, 'yyyy-MM-dd'), '');
      }
    } else {
      // If selecting end date
      if (parsedStartDate && isBefore(day, parsedStartDate)) {
        // If clicked date is before start date, switch them
        onChange(format(day, 'yyyy-MM-dd'), format(parsedStartDate, 'yyyy-MM-dd'));
      } else {
        // Set as end date
        onChange(startDate, format(day, 'yyyy-MM-dd'));
      }
      
      // Don't close calendar after selecting both dates - only reset to select start date
      setActiveSelection('start');
    }
  };
  
  // Clear selection
  const clearSelection = () => {
    onChange('', '');
    setActiveSelection('start');
  };
  
  // Check if a day should be highlighted in the selection range
  const isDayHighlighted = (day: Date) => {
    if (!parsedStartDate) return false;
    
    if (!parsedEndDate && hoverDate && activeSelection === 'end') {
      return isAfter(day, parsedStartDate) && isBefore(day, hoverDate);
    }
    
    if (parsedEndDate) {
      return isAfter(day, parsedStartDate) && isBefore(day, parsedEndDate);
    }
    
    return false;
  };

  // Generate year options (5 years before and after current year)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  };

  const yearOptions = generateYearOptions();

  // Render calendar month
  const renderCalendarMonth = (monthDate: Date, monthIndex: number) => {
    const days = getDaysInMonth(monthDate);
    const currentYear = getYear(monthDate);
    
    return (
      <div className="space-y-3">
        <div className="hidden sm:flex items-center justify-between">
          <button 
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => navigateMonth('prev', monthIndex)}
          >
            <FaChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium text-gray-800">
              {format(monthDate, 'MMMM')}
            </h2>
            <select
              className="text-base font-medium text-gray-800 bg-white border border-gray-200 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentYear}
              onChange={(e) => handleYearChange(parseInt(e.target.value), monthIndex)}
              aria-label={t('select_year')}
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <button 
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => navigateMonth('next', monthIndex)}
          >
            <FaChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1.5 select-none overflow-visible">
          {/* Day headers */}
          {DAYS_OF_WEEK.map((day, i) => (
            <div key={i} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => {
            if (!day) {
              return <div key={`blank-${monthDate}-${index}`} className="p-1 sm:p-2" />;
            }
            
            const dateKey = format(day, 'yyyy-MM-dd');
            const isStart = parsedStartDate && format(parsedStartDate, 'yyyy-MM-dd') === dateKey;
            const isEnd = parsedEndDate && format(parsedEndDate, 'yyyy-MM-dd') === dateKey;
            const isHighlighted = isDayHighlighted(day);
            const isCurrentDay = isToday(day);
            
            return (
              <button
                key={`${monthDate}-${dateKey}`}
                type="button"
                className={twMerge(
                  "relative text-center aspect-square w-full h-auto rounded-md text-xs sm:text-sm transition-all font-medium border border-transparent text-gray-800 bg-gray-100 flex items-center justify-center p-0 overflow-visible",
                  isStart && `${colorVariants[primaryColor].primary} border-2 border-${primaryColor}-500 z-10 !aspect-square !w-full !h-auto flex items-center justify-center`,
                  isEnd && `${colorVariants[secondaryColor].primary} border-2 border-${secondaryColor}-500 z-10 !aspect-square !w-full !h-auto flex items-center justify-center`,
                  isHighlighted && `${colorVariants[secondaryColor].light} border border-${secondaryColor}-300 !aspect-square !w-full !h-auto flex items-center justify-center`,
                  !isStart && !isEnd && !isHighlighted && colorVariants[primaryColor].hover,
                  isCurrentDay && !isStart && !isEnd && !isHighlighted && "ring-1 ring-blue-400 font-bold",
                  "relative group"
                )}
                onClick={() => handleDayClick(day)}
                onMouseEnter={() => setHoverDate(day)}
                onMouseLeave={() => setHoverDate(null)}
              >
                {/* Date indicator */}
                <div className="relative z-10">
                  {isStart && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></span>
                  )}
                  {isEnd && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></span>
                  )}
                  {format(day, 'd')}
                </div>
                
                {/* Hover effect */}
                {!isStart && !isEnd && !isHighlighted && (
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 bg-current transition-opacity" />
                )}
                
                {/* Range connector - left side */}
                {(isStart || isHighlighted) && (
                  <span className="absolute top-0 bottom-0 right-0 w-1/2 bg-opacity-50 z-0" 
                    style={{ backgroundColor: isStart ? `var(--${primaryColor}-200)` : `var(--${secondaryColor}-200)` }} />
                )}
                
                {/* Range connector - right side */}
                {(isEnd || isHighlighted) && (
                  <span className="absolute top-0 bottom-0 left-0 w-1/2 bg-opacity-50 z-0" 
                    style={{ backgroundColor: isEnd ? `var(--${secondaryColor}-200)` : `var(--${primaryColor}-200)` }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper to detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div className={`relative`}>
      {/* Input field */}
      {isMobile ? (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <div ref={inputRef} className="relative h-full w-full">
              <div
                className={twMerge(
                  `w-full flex items-center border-2 rounded-lg py-3 pl-12 pr-4 bg-white shadow-sm cursor-pointer transition-all duration-200`,
                  hasError ? 'border-red-500' : 'border-gray-200',
                  `hover:${colorVariants[primaryColor].border}`,
                  isOpen && `ring-2 ${colorVariants[primaryColor].ring} ${colorVariants[primaryColor].border}`,
                  `${className}`
                )}
              >
                <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none ${colorVariants[primaryColor].text}`}>
                  <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                </div>
                <span className={twMerge(
                  "block w-full truncate text-base",
                  startDate && endDate ? "text-gray-800 font-medium" : "text-gray-400"
                )}>
                  {displayValue}
                </span>
                {(startDate || endDate) && (
                  <button
                    type="button"
                    className="absolute right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSelection();
                    }}
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[9998]" />
            <Dialog.Content
              ref={calendarRef}
              className="fixed inset-x-0 bottom-0 top-20 z-[9999] w-full bg-gradient-to-b from-white via-blue-50 to-white rounded-t-3xl shadow-2xl border border-gray-100 overflow-hidden animate-slideUp"
              onOpenAutoFocus={e => e.preventDefault()}
            >
              <Dialog.Title>
                <VisuallyHidden>{label || 'Select date range'}</VisuallyHidden>
              </Dialog.Title>
              {/* Mobile month navigation */}
              <div className="sm:hidden bg-gray-50 border-b border-gray-100 p-2 sticky top-0 z-10 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                    onClick={() => navigateMonth('prev', 0)}
                  >
                    <FaChevronLeft className="h-5 w-5 text-blue-500" />
                  </button>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-blue-700 tracking-tight">
                      {format(currentMonth, 'MMMM')}
                    </h2>
                    <select
                      className="text-base font-semibold text-blue-700 bg-white border border-blue-100 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={getYear(currentMonth)}
                      onChange={(e) => handleYearChange(parseInt(e.target.value), 0)}
                      aria-label={t('select_year')}
                    >
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="p-1.5 rounded-full hover:bg-blue-100 transition-colors"
                    onClick={() => navigateMonth('next', 0)}
                  >
                    <FaChevronRight className="h-5 w-5 text-blue-500" />
                  </button>
                </div>
                
                {/* Date range summary (mobile) */}
                <div className="flex mt-2 pt-2 border-t border-gray-200 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={twMerge(
                      "h-3 w-3 rounded-full flex-shrink-0",
                      colorVariants[primaryColor].primary
                    )} />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {parsedStartDate ? format(parsedStartDate, 'MMM dd') : t('check_in')}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">→</div>
                  
                  <div className="flex items-center gap-2">
                    <div className={twMerge(
                      "h-3 w-3 rounded-full flex-shrink-0",
                      colorVariants[secondaryColor].primary
                    )} />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {parsedEndDate ? format(parsedEndDate, 'MMM dd') : t('check_out')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="w-full p-3 sm:p-5 bg-white/80 rounded-2xl shadow-md mx-auto mt-2 mb-3">
                  {renderCalendarMonth(currentMonth, 0)}
                </div>
              </div>
              {/* Selection controls */}
              <div className="bg-white/80 p-4 border-t border-gray-100 sticky bottom-0 rounded-b-2xl shadow-md">
                <div className="flex flex-col items-stretch gap-4">
                  <div className="flex flex-row items-center justify-between w-full gap-6">
                    {/* Start date */}
                    <div className="flex items-center gap-2">
                      <div className={twMerge(
                        "h-4 w-4 rounded-full shadow-sm flex-shrink-0",
                        colorVariants[primaryColor].primary
                      )} />
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {parsedStartDate 
                          ? format(parsedStartDate, 'MMM dd, yyyy')
                          : t('check_in')}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">→</div>
                    
                    {/* End date */}
                    <div className="flex items-center gap-2">
                      <div className={twMerge(
                        "h-4 w-4 rounded-full shadow-sm flex-shrink-0",
                        colorVariants[secondaryColor].primary
                      )} />
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {parsedEndDate 
                          ? format(parsedEndDate, 'MMM dd, yyyy')
                          : t('check_out')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-row gap-2 w-full mt-2">
                    <button
                      type="button"
                      className="w-1/2 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 rounded-lg font-semibold text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
                      onClick={() => {
                        clearSelection();
                      }}
                    >
                      {t('clear')}
                    </button>
                    <button
                      type="button"
                      className={twMerge(
                        "w-1/2 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 shadow-md",
                        colorVariants[primaryColor].primary,
                        colorVariants[primaryColor].ring
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('apply')}
                    </button>
                  </div>
                </div>
                
                {/* Additional information about selection */}
                {parsedStartDate && parsedEndDate && (
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                    <span>
                      {(() => {
                        const diff = Math.ceil((parsedEndDate.getTime() - parsedStartDate.getTime()) / (1000 * 60 * 60 * 24));
                        return `${diff} ${diff === 1 ? t('night') : t('nights')}`;
                      })()}
                    </span>
                    <span className="hidden sm:inline">{format(parsedStartDate, 'EEEE')} - {format(parsedEndDate, 'EEEE')}</span>
                  </div>
                )}
              </div>
              {/* Close button for mobile */}
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <div ref={inputRef} className="relative h-full w-full">
              <div 
                className={twMerge(
                  "w-full flex items-center border-2 border-gray-200 rounded-lg py-3 pl-12 pr-4 bg-white  cursor-pointer transition-all duration-200",
                  hasError ? 'border-red-500' : 'border-gray-200',
                  `hover:${colorVariants[primaryColor].border}`,
                  isOpen && `ring-2 ${colorVariants[primaryColor].ring} ${colorVariants[primaryColor].border}`,
                  `${className}`
                )}
              >
                <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none ${colorVariants[primaryColor].text}`}>
                  <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                </div>
                <span className={twMerge(
                  "block w-full truncate text-sm", // text-xs for smaller text
                  startDate && endDate ? "text-gray-800 font-medium" : "text-gray-400"
                )}>
                  {displayValue}
                </span>
                {(startDate || endDate) && (
                  <button 
                    type="button"
                    className="absolute right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSelection();
                    }}
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              ref={calendarRef}
              sideOffset={8}
              className="z-[9999] mt-2 w-full sm:w-auto sm:min-w-[680px] max-w-full bg-white rounded-t-xl sm:rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
              style={{
                maxHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? '80vh' : 'calc(100vh - 100px)',
                overflowY: 'auto',
              }}
              onOpenAutoFocus={e => e.preventDefault()}
            >
              {/* Desktop calendar */}
              <div className="flex flex-col sm:flex-row w-full">
                {/* First month */}
                <div className="w-full sm:w-1/2 p-3 sm:p-5 sm:border-r border-gray-200">
                  {renderCalendarMonth(currentMonth, 0)}
                </div>
                {/* Second month */}
                <div className="hidden sm:block w-1/2 p-5">
                  {renderCalendarMonth(secondCurrentMonth, 1)}
                </div>
              </div>
              {/* Calendar legend */}
              <div className="hidden sm:flex px-5 py-3 border-t border-gray-200 bg-gray-50 justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className={twMerge("h-3 w-3 rounded-full", colorVariants[primaryColor].primary)} />
                  <span className="text-xs text-gray-600">{t('check_in_date')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={twMerge("h-3 w-3 rounded-full", colorVariants[secondaryColor].primary)} />
                  <span className="text-xs text-gray-600">{t('check_out_date')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={twMerge("h-3 w-3 rounded-full bg-gray-100 ring-2 ring-blue-400")} />
                  <span className="text-xs text-gray-600">{t('today')}</span>
                </div>
              </div>
              {/* Selection controls */}
              <div className="bg-gray-50 p-3 border-t border-gray-200 sticky bottom-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex flex-row items-center justify-between w-full sm:w-auto sm:justify-start gap-4 sm:gap-8">
                    {/* Start date */}
                    <div className="flex items-center gap-2">
                      <div className={twMerge(
                        "h-4 w-4 rounded-full shadow-sm flex-shrink-0",
                        colorVariants[primaryColor].primary
                      )} />
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {parsedStartDate 
                          ? format(parsedStartDate, 'MMM dd, yyyy')
                          : t('check_in')}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">→</div>
                    
                    {/* End date */}
                    <div className="flex items-center gap-2">
                      <div className={twMerge(
                        "h-4 w-4 rounded-full shadow-sm flex-shrink-0",
                        colorVariants[secondaryColor].primary
                      )} />
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {parsedEndDate 
                          ? format(parsedEndDate, 'MMM dd, yyyy')
                          : t('check_out')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors sm:w-auto w-1/2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      onClick={() => {
                        clearSelection();
                        setIsOpen(false);
                      }}
                    >
                      {t('clear')}
                    </button>
                    <button
                      type="button"
                      className={twMerge(
                        "px-4 py-2 rounded-lg font-medium text-sm transition-colors sm:w-auto w-1/2 focus:outline-none focus:ring-2",
                        colorVariants[primaryColor].primary,
                        colorVariants[primaryColor].ring
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('apply')}
                    </button>
                  </div>
                </div>
                
                {/* Additional information about selection */}
                {parsedStartDate && parsedEndDate && (
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                    <span>
                      {(() => {
                        const diff = Math.ceil((parsedEndDate.getTime() - parsedStartDate.getTime()) / (1000 * 60 * 60 * 24));
                        return `${diff} ${diff === 1 ? t('night') : t('nights')}`;
                      })()}
                    </span>
                    <span className="hidden sm:inline">{format(parsedStartDate, 'EEEE')} - {format(parsedEndDate, 'EEEE')}</span>
                  </div>
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </div>
  );
}