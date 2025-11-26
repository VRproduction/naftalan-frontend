"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaSearch,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaTags,
  FaFilter,
  FaSort,
  FaThumbsUp,
  FaSlidersH,
  FaChevronDown,
  FaPercent,
  FaHotel,
  FaSwimmingPool,
  FaSpa,
  FaUtensils,
  FaWheelchair,
  FaStar,
  FaTimes,
  FaArrowRight,
  FaMinus,
  FaPlus,
  FaChild,
  FaBaby,
} from "react-icons/fa";
import SanatoriumHorizontal from "@/features/common/SanatoriumHorizontal";
import {
  Sanatorium,
  City,
  SanatoriumListType,
} from "@/lib/types/sanatorium.type";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DateRangePicker from "@/components/ui/inputs/DateRangePicker";
import { useRouter } from "@/i18n/navigation";
import { useLoadingStore } from "@/lib/store/useLoadingStore";
import { Range, getTrackBackground } from "react-range";
import { useSearchParams } from "next/navigation";
import GuestSelector from "@/components/ui/inputs/GuestSelector";
import Select from "@/components/ui/inputs/Select";

// Define schema for form validation
const searchSchema = z.object({
  checkIn: z.string().min(1, { message: "check_in_required" }),
  checkOut: z.string().min(1, { message: "check_out_required" }),
  adults: z.number().min(1, { message: "min_adults" }),
  children: z.number().min(0),
  childrenAges: z.array(z.number()).optional(),
  location: z.string().optional(),
  sanatorium: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  ratings: z.array(z.number()).optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

// Helper to calculate nights between two dates
function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export default function ReservationPage({
  sanatoriums,
  locations = [],
  sanatoriumsList = [],
}: {
  sanatoriums: Sanatorium[];
  locations?: City[];
  sanatoriumsList?: SanatoriumListType[];
}) {
  const t = useTranslations("pages.reservation");
  const tSearch = useTranslations("search");
  const router = useRouter();
  const { setLoading } = useLoadingStore();
  
  // Define dynamic price range limits (still needed for form defaults)
  const MIN_PRICE_DEFAULT = 0;
  const MAX_PRICE_DEFAULT = 30000;
  
  const params = useSearchParams();
  
  // Add local state for price inputs inside ReservationPage
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  // Sync local input state with main state when searchParams changes
  useEffect(() => {
    setMinPriceInput(
      MIN_PRICE_DEFAULT === MIN_PRICE_DEFAULT
        ? ""
        : String(MIN_PRICE_DEFAULT)
    );
    setMaxPriceInput(
      MAX_PRICE_DEFAULT === MAX_PRICE_DEFAULT
        ? ""
        : String(MAX_PRICE_DEFAULT)
    );
  }, []);
  
  // Form handling with react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      checkIn: params.get("check_in") || "",
      checkOut: params.get("check_out") || "",
      adults: params.get("occupancy") ? parseInt(params.get("occupancy")!) : 0,
      children: params.get("children_ages") ? params.get("children_ages")!.split(",").length : 0,
      childrenAges: params.get("children_ages") ? params.get("children_ages")!.split(",").map((age) => parseInt(age)) : [],
      location: params.get("city") || "",
      sanatorium: params.get("id") || "",
      minPrice: params.get("min_total_price") ? parseInt(params.get("min_total_price")!) : MIN_PRICE_DEFAULT,
      maxPrice: params.get("max_total_price") ? parseInt(params.get("max_total_price")!) : MAX_PRICE_DEFAULT,
      ratings: params.get("ratings") ? params.get("ratings")!.split(",").map((r) => parseInt(r)) : [],
    },
  });
  
  // Handle main search form submission
  const onSubmit = (data: SearchFormValues) => {
    setLoading(true);
    
    // Build URL parameters
    let url = `/reservation/?city=${data.location}&id=${
      data.sanatorium
    }&check_in=${data.checkIn}&check_out=${data.checkOut}&occupancy=${
      data.adults
    }&children_ages=${
      data.childrenAges ? data.childrenAges.join(",") : ""
    }`;
    
    // Only add price filters if date range is selected
    if (data.checkIn && data.checkOut) {
      url += `&min_total_price=${data.minPrice || MIN_PRICE_DEFAULT}&max_total_price=${
        data.maxPrice || MAX_PRICE_DEFAULT
      }`;
    }
    
    // Always add ratings if they exist (independent of date range)
    if (data.ratings && data.ratings.length > 0) {
      url += `&ratings=${data.ratings.join(",")}`;
    }
    
    // Navigate with search params
    router.push(url);
    
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  
  // Apply sidebar filters
  const applyFilters = () => {
    setLoading(true);
    
    // Get current URL params
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if date range is selected
    const checkIn = watch('checkIn');
    const checkOut = watch('checkOut');
    
    // Only apply price filters if date range is selected
    if (checkIn && checkOut) {
      urlParams.set("min_total_price", String(watch('minPrice')));
      urlParams.set("max_total_price", String(watch('maxPrice')));
    } else {
      urlParams.delete("min_total_price");
      urlParams.delete("max_total_price");
    }
    
    // Always apply ratings parameter (independent of date range)
    const ratings = watch('ratings') ?? [];
    if (ratings.length > 0) {
      urlParams.set("ratings", ratings.join(","));
    } else {
      urlParams.delete("ratings");
    }
    
    // Navigate with updated search params
    router.push(`/reservation/?${urlParams.toString()}`);
    
    setLoading(false);
  };
  
  // Use this useEffect to update UI when URL changes (for back/forward navigation)
  useEffect(() => {
    // Function to load filter params from URL
    const loadFiltersFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const minPrice = urlParams.get("min_total_price");
      const maxPrice = urlParams.get("max_total_price");
      const ratings = urlParams.get("ratings");
      
      // Parse the ratings properly
      const parsedRatings = ratings
        ? ratings.split(",").map((r) => parseInt(r))
        : [];
      
      // Update searchParams with new values from URL
      if (minPrice || maxPrice || ratings) {
        setValue("minPrice", minPrice ? parseInt(minPrice) : MIN_PRICE_DEFAULT);
        setValue("maxPrice", maxPrice ? parseInt(maxPrice) : MAX_PRICE_DEFAULT);
        setValue("ratings", parsedRatings);
      }
    };

    // Load filters on component mount
    loadFiltersFromURL();

    // Set up event listener for popstate (browser back/forward navigation)
    window.addEventListener("popstate", loadFiltersFromURL);
    
    // Clean up event listener
    return () => {
      window.removeEventListener("popstate", loadFiltersFromURL);
    };
  }, []); // Empty dependency array - run only on mount/unmount

  // Sadece sidebar filtrelerini sıfırlayan fonksiyon
  const clearSidebarFilters = () => {
    setValue("minPrice", MIN_PRICE_DEFAULT);
    setValue("maxPrice", MAX_PRICE_DEFAULT);
    setValue("ratings", []);

    // URL'den sadece sidebar filtrelerini kaldır
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("min_total_price");
    urlParams.delete("max_total_price");
    urlParams.delete("ratings");
    router.push(`/reservation/?${urlParams.toString()}`);
  };

  const clearFilters = () => {
    // Formu sıfırla
    setValue("location", "");
    setValue("sanatorium", "");
    setValue("checkIn", "");
    setValue("checkOut", "");
    setValue("adults", 0);
    setValue("children", 0);
    setValue("childrenAges", []);
    // Sidebar filtrelerini de sıfırla
    clearSidebarFilters();

    // URL'deki parametreleri temizle
    router.push("/reservation/");
  };
  
  // Handle rating filter toggle
  const toggleRating = (rating: number) => {
    const ratings = watch('ratings') ?? [];
    const newRatings = [...ratings];
    
    if (newRatings.includes(rating)) {
      // Remove rating
      const updatedRatings = newRatings.filter((r) => r !== rating);
      setValue("ratings", updatedRatings);
    } else {
      // Add rating
      const updatedRatings = [...newRatings, rating];
      setValue("ratings", updatedRatings);
    }
  };

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Watch location value to filter sanatoriums
  const selectedLocation = watch('location');

  // Reset sanatorium when location changes
  useEffect(() => {
    setValue('sanatorium', '');
  }, [selectedLocation, setValue]);

  return (
    <div className="bg-gray-50 min-h-screen pb-5">
      {/* Search Form - Styled to match the page */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
              {/* Location Selector */}
              <div className="w-full lg:col-span-2 flex flex-col h-full">
                <Controller
                  control={control}
                  name="location"
                  render={({ field: { value, onChange, name } }) => (
                    <Select
                      value={value ? String(value) : ""}
                      onValueChange={(val) => {
                        onChange(val);
                        clearErrors("location");
                      }}
                      name={name}
                      className="w-full pl-7 pr-3 min-h-[48px]"
                      placeholder={tSearch("select_city")}
                      icon={<FaMapMarkerAlt />}
                      clearable
                      hasError={!!errors.location}
                    >
                      {locations?.map((location) => (
                        <Select.Item
                          key={location.id}
                          value={String(location.id)}
                        >
                          {location.region}
                        </Select.Item>
                      ))}
                    </Select>
                  )}
                />
                {errors.location && errors.location.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {tSearch(errors.location.message as string)}
                  </p>
                )}
              </div>

              {/* Sanatorium Selector */}
              <div className="w-full lg:col-span-2 flex flex-col h-full">
                <Controller
                  control={control}
                  name="sanatorium"
                  render={({ field: { value, onChange, name } }) => (
                    <Select
                      value={value ? String(value) : ""}
                      onValueChange={(val) => {
                        onChange(val);
                        clearErrors("sanatorium");
                      }}
                      name={name}
                      className="w-full pl-7 pr-3 min-h-[48px]"
                      placeholder={tSearch("select_hotel")}
                      icon={<FaHotel />}
                      hasError={!!errors.sanatorium}
                      clearable
                    >
                      {(watch('location')
                        ? sanatoriumsList?.filter(s => String(s.location.id) === watch('location'))
                        : sanatoriumsList
                      )?.map((sanatorium) => (
                        <Select.Item
                          key={sanatorium.id}
                          value={String(sanatorium.id)}
                        >
                          {sanatorium.name}
                        </Select.Item>
                      ))}
                    </Select>
                  )}
                />
                {errors.sanatorium && errors.sanatorium.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {tSearch(errors.sanatorium.message as string)}
                  </p>
                )}
              </div>

              {/* DateRangePicker */}
              <div className="w-full lg:col-span-3 flex flex-col h-full">
                <Controller
                  control={control}
                  name="checkIn"
                  render={({ field: { value: checkInValue } }) => (
                    <Controller
                      control={control}
                      name="checkOut"
                      render={({ field: { value: checkOutValue } }) => (
                        <div className="flex flex-col">
                        <DateRangePicker
                          startDate={checkInValue}
                          endDate={checkOutValue}
                          onChange={(startDate, endDate) => {
                              setValue("checkIn", startDate);
                              setValue("checkOut", endDate);
                              clearErrors(["checkIn", "checkOut"]);
                          }}
                            className="w-full min-h-[48px]"
                          primaryColor="blue"
                          secondaryColor="blue"
                            placeholder={`${tSearch("check_in")} — ${tSearch(
                              "check_out"
                            )}`}
                            hasError={!!errors.checkIn || !!errors.checkOut}
                          />
                          {(errors.checkIn?.message ||
                            errors.checkOut?.message) && (
                            <div className="min-h-[22px]">
                              <p className="text-red-500 text-sm">
                                {errors.checkIn?.message
                                  ? tSearch(errors.checkIn.message as string)
                                  : tSearch(errors.checkOut?.message as string)}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    />
                  )}
                />
              </div>

              {/* Guest Selector */}
              <div className="w-full lg:col-span-3 flex flex-col h-full">
                <Controller
                  control={control}
                  name="adults"
                  render={({ field: { value: adultsValue } }) => (
                    <Controller
                      control={control}
                      name="children"
                      render={({ field: { value: childrenValue } }) => (
                        <Controller
                          control={control}
                          name="childrenAges"
                          render={({
                            field: { value: childrenAgesValue = [] },
                          }) => (
                            <GuestSelector
                              value={{ 
                                adults: adultsValue, 
                                children: childrenValue, 
                                childrenAges: childrenAgesValue,
                              }}
                              onChange={({
                                adults,
                                children,
                                childrenAges,
                              }) => {
                                setValue("adults", adults);
                                setValue("children", children);
                                setValue("childrenAges", childrenAges);
                                clearErrors(["adults", "children", "childrenAges"]);
                              }}
                              errors={errors}
                            />
                          )}
                        />
                      )}
                    />
                  )}
                />
              </div>

              {/* Search Button */}
              <div className="w-full lg:col-span-2 flex flex-col h-full">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg flex items-center justify-center gap-2 font-medium shadow-md hover:from-blue-700 hover:to-blue-900 transition-all"
                >
                  <FaSearch />
                  <span>{tSearch("search_button")}</span>
                </button>
              </div>
            </div>
            
            {/* Hidden fields for price range - only for main search form */}
            <input type="hidden" {...register("minPrice")} />
            <input type="hidden" {...register("maxPrice")} />
          </form>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-0">
        {/* Mobile Filter Button - Moved above results */}
        <div className="md:hidden mb-4">
                  <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center"
          >
            <FaFilter className="mr-2" />
            {t("search.filters.show")}
              </button>
        </div>
      
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filters Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-black/50 z-[10000] flex justify-end">
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                transition={{ duration: 0.3 }}
                className="bg-white h-full w-full max-w-xs overflow-y-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold">
                    {t("search.filters.show")}
                  </h3>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {/* Price Range Filter - Only show if dates are selected */}
                  {watch('checkIn') && watch('checkOut') && (
                  <div className="p-4 space-y-4">
                    <h4 className="text-base font-bold text-gray-800 flex items-center">
                      <FaTags className="mr-2 text-blue-600" />
                      {tSearch("price_range") || "Fiyat aralığı"}
                    </h4>
                    <div className="flex flex-col gap-3">
                      <Range
                        values={[watch('minPrice') ?? MIN_PRICE_DEFAULT, watch('maxPrice') ?? MAX_PRICE_DEFAULT]}
                        step={100}
                        min={MIN_PRICE_DEFAULT}
                        max={MAX_PRICE_DEFAULT}
                        onChange={([min, max]) => {
                          setValue("minPrice", min);
                          setValue("maxPrice", max);
                        }}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: "6px",
                              width: "100%",
                              background: getTrackBackground({
                                values: [
                                  watch('minPrice') ?? MIN_PRICE_DEFAULT,
                                  watch('maxPrice') ?? MAX_PRICE_DEFAULT,
                                ],
                                colors: ["#d1d5db", "#2563eb", "#d1d5db"],
                                min: MIN_PRICE_DEFAULT,
                                max: MAX_PRICE_DEFAULT,
                              }),
                              borderRadius: "4px",
                              margin: "16px 0",
                            }}
                          >
                            {children}
                          </div>
                        )}
                        renderThumb={({ props, index, isDragged }) => {
                          const { key, ...restProps } = props;
                          return (
                            <div
                              key={key}
                              {...restProps}
                              style={{
                                ...restProps.style,
                                height: "24px",
                                width: "24px",
                                borderRadius: "50%",
                                backgroundColor: "#2563eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: isDragged
                                  ? "0 0 0 4px #bfdbfe"
                                  : "0 1px 4px rgba(0,0,0,0.12)",
                              }}
                            >
                              <span className="text-xs text-white font-bold select-none">
                                {index === 0
                                  ? (watch('minPrice') ?? MIN_PRICE_DEFAULT)
                                  : (watch('maxPrice') ?? MAX_PRICE_DEFAULT)}
                              </span>
                            </div>
                          );
                        }}
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={MIN_PRICE_DEFAULT}
                          max={watch('maxPrice') ?? MAX_PRICE_DEFAULT}
                          value={minPriceInput}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMinPriceInput(val);
                          }}
                          onBlur={() => {
                            if (
                              minPriceInput === "" ||
                              isNaN(Number(minPriceInput))
                            ) {
                              setValue("minPrice", MIN_PRICE_DEFAULT);
                              setValue("maxPrice", MAX_PRICE_DEFAULT);
                              setMinPriceInput("");
                            } else {
                              const value = Math.min(
                                Number(minPriceInput),
                                watch('maxPrice') ?? MAX_PRICE_DEFAULT
                              );
                              setValue("minPrice", value);
                              setValue("maxPrice", value);
                              setMinPriceInput(String(value));
                            }
                          }}
                          className="w-1/2 p-2 border border-gray-200 rounded focus:outline-none"
                          placeholder={tSearch("min_price") || "Min"}
                        />
                        <span>-</span>
                        <input
                          type="number"
                          min={watch('minPrice') ?? MIN_PRICE_DEFAULT}
                          max={MAX_PRICE_DEFAULT}
                          value={maxPriceInput}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMaxPriceInput(val);
                          }}
                          onBlur={() => {
                            if (
                              maxPriceInput === "" ||
                              isNaN(Number(maxPriceInput))
                            ) {
                              setValue("minPrice", MIN_PRICE_DEFAULT);
                              setValue("maxPrice", MAX_PRICE_DEFAULT);
                              setMaxPriceInput("");
                            } else {
                              const value = Math.max(
                                Number(maxPriceInput),
                                watch('minPrice') ?? MIN_PRICE_DEFAULT
                              );
                              setValue("minPrice", value);
                              setValue("maxPrice", value);
                              setMaxPriceInput(String(value));
                            }
                          }}
                          className="w-1/2 p-2 border border-gray-200 rounded focus:outline-none"
                          placeholder={tSearch("max_price") || "Max"}
                        />
                      </div>
                    </div>
                  </div>
                  )}
                  
                  {/* Star rating section */}
                  <div className="p-4 space-y-4">
                    <h4 className="text-base font-bold text-gray-800 flex items-center">
                      <FaStar className="mr-2 text-blue-600" />
                      Reytinq
                    </h4>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <label
                          key={stars}
                          className="flex items-center p-2 rounded-lg transition-colors hover:bg-blue-50 cursor-pointer"
                        >
                          <input 
                            type="checkbox" 
                            className="rounded text-blue-600 mr-3 focus:ring-blue-500 h-5 w-5" 
                            checked={(watch('ratings') ?? []).includes(stars)}
                            onChange={() => toggleRating(stars)}
                          />
                          <div className="flex items-center">
                            {[...Array(stars)].map((_, i) => (
                              <FaStar
                                key={i}
                                className="text-yellow-400 mr-0.5"
                              />
                            ))}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-200 sticky bottom-0">
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        clearSidebarFilters();
                        setShowMobileFilters(false);
                      }}
                      className="py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
                    >
                      {tSearch("clear")}
                    </button>
                    <button 
                      onClick={() => {
                        applyFilters();
                        setShowMobileFilters(false);
                      }}
                      className="py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md font-medium"
                    >
                      {tSearch("apply")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Desktop Sidebar Filters - Hidden on mobile */}
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-20">
              <div className="p-5 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <h3 className="text-lg font-bold flex items-center">
                  <FaSlidersH className="mr-2" />
                  {t("search.filters.show")}
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {/* Price Range Filter - Only show if dates are selected */}
                {watch('checkIn') && watch('checkOut') && (
                <div className="p-5 space-y-4">
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                    <FaTags className="mr-2 text-blue-600" />
                    {tSearch("price_range") || "Fiyat aralığı"}
                  </h4>
                  <div className="flex flex-col gap-3">
                    <Range
                      values={[watch('minPrice') ?? MIN_PRICE_DEFAULT, watch('maxPrice') ?? MAX_PRICE_DEFAULT]}
                      step={100}
                      min={MIN_PRICE_DEFAULT}
                      max={MAX_PRICE_DEFAULT}
                      onChange={([min, max]) => {
                        setValue("minPrice", min);
                        setValue("maxPrice", max);
                      }}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            background: getTrackBackground({
                              values: [
                                watch('minPrice') ?? MIN_PRICE_DEFAULT,
                                watch('maxPrice') ?? MAX_PRICE_DEFAULT,
                              ],
                              colors: ["#d1d5db", "#2563eb", "#d1d5db"],
                              min: MIN_PRICE_DEFAULT,
                              max: MAX_PRICE_DEFAULT,
                            }),
                            borderRadius: "4px",
                            margin: "16px 0",
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props, index, isDragged }) => {
                        const { key, ...restProps } = props;
                        return (
                          <div
                            key={key}
                            {...restProps}
                            style={{
                              ...restProps.style,
                              height: "24px",
                              width: "24px",
                              borderRadius: "50%",
                              backgroundColor: "#2563eb",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: isDragged
                                ? "0 0 0 4px #bfdbfe"
                                : "0 1px 4px rgba(0,0,0,0.12)",
                            }}
                          >
                            <span className="text-xs text-white font-bold select-none">
                              {index === 0
                                ? (watch('minPrice') ?? MIN_PRICE_DEFAULT)
                                : (watch('maxPrice') ?? MAX_PRICE_DEFAULT)}
                            </span>
                          </div>
                        );
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={MIN_PRICE_DEFAULT}
                        max={watch('maxPrice') ?? MAX_PRICE_DEFAULT}
                        value={minPriceInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMinPriceInput(val);
                        }}
                        onBlur={() => {
                          if (
                            minPriceInput === "" ||
                            isNaN(Number(minPriceInput))
                          ) {
                            setValue("minPrice", MIN_PRICE_DEFAULT);
                            setValue("maxPrice", MAX_PRICE_DEFAULT);
                            setMinPriceInput("");
                          } else {
                            const value = Math.min(
                              Number(minPriceInput),
                              watch('maxPrice') ?? MAX_PRICE_DEFAULT
                            );
                            setValue("minPrice", value);
                            setValue("maxPrice", value);
                            setMinPriceInput(String(value));
                          }
                        }}
                        className="w-1/2 p-2 border border-gray-200 rounded focus:outline-none"
                        placeholder={tSearch("min_price") || "Min"}
                      />
                      <span>-</span>
                      <input
                        type="number"
                        min={watch('minPrice') ?? MIN_PRICE_DEFAULT}
                        max={MAX_PRICE_DEFAULT}
                        value={maxPriceInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMaxPriceInput(val);
                        }}
                        onBlur={() => {
                          if (
                            maxPriceInput === "" ||
                            isNaN(Number(maxPriceInput))
                          ) {
                            setValue("minPrice", MIN_PRICE_DEFAULT);
                            setValue("maxPrice", MAX_PRICE_DEFAULT);
                            setMaxPriceInput("");
                          } else {
                            const value = Math.max(
                              Number(maxPriceInput),
                              watch('minPrice') ?? MIN_PRICE_DEFAULT
                            );
                            setValue("minPrice", value);
                            setValue("maxPrice", value);
                            setMaxPriceInput(String(value));
                          }
                        }}
                        className="w-1/2 p-2 border border-gray-200 rounded focus:outline-none"
                        placeholder={tSearch("max_price") || "Max"}
                      />
                    </div>
                  </div>
                </div>
                )}
                
                {/* Star rating section */}
                <div className="p-5 space-y-4">
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                    <FaStar className="mr-2 text-blue-600" />
                    Reytinq
                  </h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <label
                        key={stars}
                        className="flex items-center p-2 rounded-lg transition-colors hover:bg-blue-50 cursor-pointer"
                      >
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-600 mr-3 focus:ring-blue-500 h-5 w-5" 
                          checked={(watch('ratings') ?? []).includes(stars)}
                          onChange={() => toggleRating(stars)}
                        />
                        <div className="flex items-center">
                          {[...Array(stars)].map((_, i) => (
                            <FaStar
                              key={i}
                              className="text-yellow-400 mr-0.5"
                            />
                          ))}
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={clearSidebarFilters}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium flex-1"
                    >
                      {tSearch("clear")}
                    </button>
                    <button
                      onClick={applyFilters}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-medium flex-1"
                    >
                      {tSearch("apply")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="flex-1">
            {/* Mobile result count */}
            <div className="md:hidden px-1 mb-3">
              <p className="text-sm text-gray-500">
                {sanatoriums.length}{" "}
                {sanatoriums.length === 1 ? "sanatorium" : "sanatoriums"}{" "}
                {t("results.found")}
              </p>
            </div>
            
            {sanatoriums.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-200"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaInfoCircle className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {t("results.no_results.title")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("results.no_results.description")}
                </p>
                <button
                  onClick={() => {
                    setValue("minPrice", MIN_PRICE_DEFAULT);
                    setValue("maxPrice", MAX_PRICE_DEFAULT);
                    setValue("ratings", []);
                    clearFilters();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 transition-all font-medium"
                >
                  {t("results.no_results.clear_filters")}
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {/* Get URL parameters once for all sanatorium cards */}
                {(() => {
                  const urlParams = new URLSearchParams(params.toString());
                  const checkIn = urlParams.get("check_in") || "";
                  const checkOut = urlParams.get("check_out") || "";
                  const adults = parseInt(urlParams.get("occupancy") || "");
                  const childrenAgesStr = urlParams.get("children_ages") || "";
                  const childrenAges = childrenAgesStr
                    ? childrenAgesStr.split(",").map((age) => parseInt(age))
                    : [];

                  return sanatoriums.map((sanatorium, index) => (
                  <SanatoriumHorizontal 
                    key={sanatorium.id}
                    sanatorium={sanatorium}
                    index={index}
                      nights={getNights(checkIn, checkOut)}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      adults={adults}
                      childrenAges={childrenAges}
                  />
                  ));
                })()}
               
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
