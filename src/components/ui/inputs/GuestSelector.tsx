import { useState } from "react";
import {
  FaUserFriends,
  FaMinus,
  FaPlus,
  FaChild,
} from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
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
  maxAdults?: number;
  maxChildren?: number;
}

const GuestSelector = ({ value, onChange, errors, className, maxAdults, maxChildren }: GuestSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("search");

  // Update adults count
  const handleAdultsChange = (increment: boolean) => {
    let newValue = value.adults;
    if (increment) {
      if (typeof maxAdults === 'number') {
        newValue = Math.min(value.adults + 1, maxAdults);
      } else {
        newValue = value.adults + 1;
      }
    } else {
      newValue = Math.max(1, value.adults - 1);
    }
    onChange({ ...value, adults: newValue });
  };

  // Update children count and manage children ages array
  const handleChildrenChange = (increment: boolean) => {
    if (increment) {
      if (typeof maxChildren === 'number' && value.children >= maxChildren) return;
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
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className={`relative ${className || ''}`}>
        <Dialog.Trigger asChild>
          <div
            className={`
            w-full flex items-center border-2 rounded-lg py-2.5 pl-10 pr-4 bg-white cursor-pointer 
            hover:border-blue-400 transition-all duration-200
            ${isOpen ? "ring-2 ring-blue-200 border-blue-400" : ""}
            ${hasError ? "border-red-500" : "border-gray-200"}
            `}
            style={{ minHeight: "48px", position: "relative" }}
          >
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors"
              style={{ height: "100%" }}
            >
              <FaUserFriends />
            </div>
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
            </div>
          </div>
        </Dialog.Trigger>
        {hasError && (
          <div style={{ minHeight: "22px" }}>
            <p className="text-red-500 text-sm mt-1">
              {t(errors.adults.message as string)}
            </p>
          </div>
        )}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-[9998]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md bg-white rounded-xl shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              {t("select")}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <Cross2Icon className="w-4 h-4 text-gray-500" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {/* Adults selector */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <div>
                <div className="font-medium text-gray-800">{t("adults")}</div>
                <div className="text-sm text-gray-500">{t("age")} 18+</div>
              </div>
              <div className="flex items-center gap-4">
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
                  <FaMinus size={14} />
                </button>
                <span className="w-8 text-center font-medium">{value.adults}</span>
                <button
                  type="button"
                  className={`p-2 rounded-full ${
                    (typeof maxAdults === 'number' && value.adults >= maxAdults)
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => handleAdultsChange(true)}
                  disabled={typeof maxAdults === 'number' && value.adults >= maxAdults}
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>

            {/* Children selector */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <div>
                <div className="font-medium text-gray-800">{t("children")}</div>
                <div className="text-sm text-gray-500">{t("age")} 7-18</div>
              </div>
              <div className="flex items-center gap-4">
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
                  <FaMinus size={14} />
                </button>
                <span className="w-8 text-center font-medium">{value.children}</span>
                <button
                  type="button"
                  className={`p-2 rounded-full ${
                    (typeof maxChildren === 'number' && value.children >= maxChildren)
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => handleChildrenChange(true)}
                  disabled={typeof maxChildren === 'number' && value.children >= maxChildren}
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>

            {/* Children ages */}
            {value.children > 0 && (
              <div className="mt-4">
                <div className="font-medium mb-3 text-gray-800">{t("children_ages")}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: value.children }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaChild className="text-blue-500" />
                      <select
                        value={value.childrenAges?.[index] || 7}
                        onChange={(e) =>
                          handleChildAgeChange(index, parseInt(e.target.value))
                        }
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Array.from({ length: 11 }).map((_, age) => (
                          <option key={age + 7} value={age + 7}>
                            {age + 7} {t("age")}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Dialog.Close asChild>
              <button
                type="button"
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {t("apply")}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GuestSelector;
