import { useEffect, useRef, useState } from "react";
import {
  FaUserFriends,
  FaMinus,
  FaPlus,
  FaChevronDown,
  FaChild,
  FaBaby,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export interface GuestSelectorProps {
  value: { adults: number; children: number; childrenAges: number[] };
  onChange: (data: {
    adults: number;
    children: number;
    childrenAges: number[];
  }) => void;
  errors: any;
  className?: string;
}

const GuestSelector = ({ value, onChange, errors, className }: GuestSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("search");

  // Calculate total guests
  const totalGuests = value.adults + value.children;

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update adults count
  const handleAdultsChange = (increment: boolean) => {
    const newValue = increment
      ? value.adults + 1
      : Math.max(1, value.adults - 1);
    onChange({ ...value, adults: newValue });
  };

  // Update children count and manage children ages array
  const handleChildrenChange = (increment: boolean) => {
    if (increment) {
      // Add a child with age 7
      const newChildrenAges = [...(value.childrenAges || []), 7];
      onChange({
        ...value,
        children: value.children + 1,
        childrenAges: newChildrenAges,
      });
    } else if (value.children > 0) {
      // Remove the last child
      const newChildrenAges = [...(value.childrenAges || [])];
      newChildrenAges.pop();
      onChange({
        ...value,
        children: value.children - 1,
        childrenAges: newChildrenAges,
      });
    }
  };

  // Update a specific child's age
  const handleChildAgeChange = (index: number, age: number) => {
    const newChildrenAges = [...(value.childrenAges || [])];
    newChildrenAges[index] = age;
    onChange({ ...value, childrenAges: newChildrenAges });
  };

  // Error state for border color
  const hasError = !!(errors.adults && errors.adults.message);

  return (
    <div className={`relative ${className || ''}`} ref={dropdownRef}>
      <div
        className={`
          w-full flex items-center border-2 rounded-lg py-2.5 pl-10 pr-4 bg-white cursor-pointer 
          hover:border-blue-400 transition-all duration-200
          ${isOpen ? "ring-2 ring-blue-200 border-blue-400" : ""}
          ${hasError ? "border-red-500" : "border-gray-200"}
          `}
        onClick={() => setIsOpen(!isOpen)}
        style={{ minHeight: "48px", position: "relative" }} // Ensure consistent height
      >
        {/* Icon absolutely positioned, always present */}
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors"
          style={{ height: "100%" }}
        >
          <FaUserFriends />
        </div>
        {/* Main content and chevron, always vertically centered */}
        <div className="flex flex-1 justify-between items-center min-h-6">
          <span className="text-gray-800">
            {value.adults === 0 && value.children === 0
              ? t("select")
              : `${value.adults} ${t(value.adults === 1 ? "adult" : "adults")}${
                  value.children > 0
                    ? ` • ${value.children} ${t(
                        value.children === 1 ? "child" : "children"
                      )}`
                    : ""
                }`}
          </span>
          <FaChevronDown
            className={`text-gray-400 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {/* Error message, but does not affect layout of input above */}
      {hasError && (
        <div style={{ minHeight: "22px" }}>
          <p className="text-red-500 text-sm mt-1">
            {t(errors.adults.message as string)}
          </p>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 p-4"
          >
            {/* Adults selector */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="font-medium">{t("adults")}</div>
                <div className="text-sm text-gray-500">{t("age")} 18+</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`p-2 rounded-full ${
                    value.adults <= 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleAdultsChange(false)}
                  disabled={value.adults <= 1}
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-6 text-center">{value.adults}</span>
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                  onClick={() => handleAdultsChange(true)}
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
            {/* Children selector */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="font-medium">{t("children")}</div>
                <div className="text-sm text-gray-500">{t("age")} 7-18</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`p-2 rounded-full ${
                    value.children <= 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleChildrenChange(false)}
                  disabled={value.children <= 0}
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-6 text-center">{value.children}</span>
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                  onClick={() => handleChildrenChange(true)}
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
            {/* Children ages */}
            {value.children > 0 && (
              <div className="mt-3">
                <div className="font-medium mb-2">{t("children_ages")}</div>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: value.children }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaChild className="text-blue-400" />
                      <select
                        value={value.childrenAges?.[index] || 7}
                        onChange={(e) =>
                          handleChildAgeChange(index, parseInt(e.target.value))
                        }
                        className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 11 }).map((_, age) => (
                          <option key={age + 7} value={age + 7}>
                            {age + 7} {t("years")}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("apply")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuestSelector;
