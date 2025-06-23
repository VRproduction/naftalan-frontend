import React from 'react';
import ReactDOM from 'react-dom';
import * as RadixSelect from '@radix-ui/react-select';
import { ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons';
import { FaChevronDown } from 'react-icons/fa';

// Component props
interface SelectProps {
  children: React.ReactNode;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
  icon?: React.ReactNode; // Optional left icon
  hasError?: boolean; // Error state for border
}

// SelectItem props
interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

// Select Item Component
const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(({ children, className, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={`
      relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-4 pr-2 text-base outline-none
      focus:bg-blue-50 focus:text-blue-900
      data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-900
      sm:py-2 sm:text-base py-4 text-lg
      ${className || ''}
    `}
    {...props}
  >
    <RadixSelect.ItemText className="flex-1 text-left">{children}</RadixSelect.ItemText>
    <span className="flex h-4 w-4 items-center justify-center ml-2">
      <RadixSelect.ItemIndicator>
        <CheckIcon className="h-5 w-5 text-blue-500" />
      </RadixSelect.ItemIndicator>
    </span>
  </RadixSelect.Item>
)) as React.ForwardRefExoticComponent<
  SelectItemProps & React.RefAttributes<HTMLDivElement>
>;

SelectItem.displayName = 'SelectItem';

// Main Select Component
const SelectRoot: React.FC<SelectProps> = ({
  children,
  placeholder = 'Seçiniz...',
  value,
  onValueChange,
  disabled = false,
  required = false,
  name,
  className = '',
  icon,
  hasError = false,
}) => {
  const [open, setOpen] = React.useState(false);
  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Drag-to-close state
  const [dragY, setDragY] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const dragStartY = React.useRef(0);
  const [isClosing, setIsClosing] = React.useState(false);

  // Handlers for drag gesture
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setDragging(true);
    setDragY(0);
    if ('touches' in e) {
      dragStartY.current = e.touches[0].clientY;
    } else {
      dragStartY.current = e.clientY;
    }
    document.body.style.userSelect = 'none';
  };
  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!dragging) return;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientY = e.touches[0].clientY;
    } else if ('clientY' in e) {
      clientY = e.clientY;
    }
    const deltaY = Math.max(0, clientY - dragStartY.current);
    setDragY(deltaY);
  };
  const handleDragEnd = () => {
    setDragging(false);
    document.body.style.userSelect = '';
    if (dragY > 80) {
      setIsClosing(true);
      setTimeout(() => {
        setOpen(false);
        setIsClosing(false);
      }, 220);
    } else {
      setTimeout(() => setDragY(0), 150); // Animate back if not closed
    }
  };

  // Close with animation for overlay and close button
  const handleCloseWithSlide = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 220);
  };

  // Attach/remove global listeners for drag
  React.useEffect(() => {
    if (!dragging) return;
    const move = (e: any) => handleDragMove(e);
    const up = () => handleDragEnd();
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchend', up);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchend', up);
      window.removeEventListener('mouseup', up);
    };
  }, [dragging, dragY]);

  // Render overlay globally using React portal
  const overlay = open && isMobile
    ? ReactDOM.createPortal(
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={handleCloseWithSlide}
          aria-label="Close select overlay"
        />,
        document.body
      )
    : null;

  // Style for drag animation
  const dragStyle = isMobile && open ? {
    transform: isClosing
      ? 'translateY(100vh)'
      : dragY
        ? `translateY(${dragY}px)`
        : undefined,
    transition: dragging
      ? 'none'
      : 'transform 0.22s cubic-bezier(.4,1.2,.6,1)',
    touchAction: 'none',
  } : undefined;

  return (
    <>
      {overlay}
      <RadixSelect.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
        name={name}
        open={open}
        onOpenChange={setOpen}
      >
        <RadixSelect.Trigger
          className={`
            w-full flex items-center border-2 rounded-lg py-2.5 pl-10 pr-4 bg-white cursor-pointer min-h-[48px]
            hover:border-blue-400 transition-all duration-200
            focus:ring-2 focus:ring-blue-200 focus:border-blue-400
            disabled:cursor-not-allowed disabled:opacity-50
            relative
            ${hasError ? 'border-red-500' : 'border-gray-200'}
            ${className}
          `}
        >
          {/* Left icon slot, absolutely positioned and vertically centered */}
          {icon && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pl-3 pointer-events-none text-gray-500" style={{height: '24px'}}>
              {icon}
            </span>
          )}
          <span className="block w-full truncate text-base text-gray-800 text-left">
            <RadixSelect.Value placeholder={placeholder} />
          </span>
          {/* Chevron icon, styled as in GuestSelector */}
          <FaChevronDown
            className={`text-gray-400 transform transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className={`z-50 mt-2 w-full min-w-[200px] bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fadeIn
              sm:rounded-lg sm:bottom-auto sm:left-auto
              fixed sm:static bottom-0 left-0 right-0 top-auto sm:mt-2
              sm:max-w-[90vw] max-w-full
              sm:p-0 p-0
              sm:shadow-xl shadow-2xl
              sm:border sm:border-gray-100 border-0
              sm:animate-fadeIn animate-slideUp
              sm:rounded-lg rounded-t-2xl
              sm:max-h-[400px] max-h-[70vh] overflow-y-auto
            `}
            position={isMobile ? undefined : 'popper'}
            sideOffset={isMobile ? 0 : 6}
            style={dragStyle}
          >
            {/* Drag handle for mobile */}
            <div className="sm:hidden flex justify-center py-2 relative">
              <div
                className="w-10 h-1.5 bg-gray-300 rounded-full mb-2 cursor-pointer"
                onTouchStart={handleDragStart}
                onMouseDown={handleDragStart}
              />
              {/* Close button */}
              <button
                type="button"
                className="absolute right-4 top-4 z-50 text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow"
                onClick={handleCloseWithSlide}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <RadixSelect.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
            </RadixSelect.ScrollUpButton>

            <RadixSelect.Viewport className="p-1 sm:pt-0 pt-10">
              {children}
            </RadixSelect.Viewport>

            <RadixSelect.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
              <FaChevronDown className="h-4 w-4 text-gray-400" />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </>
  );
};

// Compound component pattern
const Select: React.FC<SelectProps> & { Item: typeof SelectItem } = Object.assign(SelectRoot, {
  Item: SelectItem,
});

export default Select;