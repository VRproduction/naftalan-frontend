'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUserFriends, FaSearch, FaMapMarkerAlt, FaInfoCircle, FaTags, FaFilter, FaSort, FaThumbsUp, FaSlidersH, FaChevronDown, FaPercent, FaHotel, FaSwimmingPool, FaSpa, FaUtensils, FaWheelchair, FaStar, FaTimes, FaArrowRight, FaMinus, FaPlus, FaChild, FaBaby } from 'react-icons/fa';
import SanatoriumHorizontal from '@/features/common/SanatoriumHorizontal';
import { Sanatorium, City } from '@/lib/types/sanatorium.type';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DateRangePicker from '@/components/ui/inputs/DateRangePicker';
import { useRouter } from '@/i18n/navigation';
import { useLoadingStore } from '@/lib/store/useLoadingStore';

// Define schema for form validation
const searchSchema = z.object({
  checkIn: z.string().min(1, { message: 'check_in_required' }),
  checkOut: z.string().min(1, { message: 'check_out_required' }),
  adults: z.number().min(1, { message: 'min_adults' }),
  children: z.number().min(0),
  childrenAges: z.array(z.number()).optional(),
  location: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  ratings: z.array(z.number()).optional()
});

type SearchFormValues = z.infer<typeof searchSchema>;

// Guest selector component
const GuestSelector = ({ 
  value, 
  onChange, 
  errors, 
  translateFn 
}: { 
  value: { adults: number; children: number; childrenAges: number[] }; 
  onChange: (data: { adults: number; children: number; childrenAges: number[] }) => void;
  errors: any;
  translateFn: (key: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Calculate total guests
  const totalGuests = value.adults + value.children;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Update adults count
  const handleAdultsChange = (increment: boolean) => {
    const newValue = increment ? value.adults + 1 : Math.max(1, value.adults - 1);
    onChange({ ...value, adults: newValue });
  };
  
  // Update children count and manage children ages array
  const handleChildrenChange = (increment: boolean) => {
    if (increment) {
      // Add a child with age 0
      const newChildrenAges = [...(value.childrenAges || []), 0];
      onChange({ ...value, children: value.children + 1, childrenAges: newChildrenAges });
    } else if (value.children > 0) {
      // Remove the last child
      const newChildrenAges = [...(value.childrenAges || [])];
      newChildrenAges.pop();
      onChange({ ...value, children: value.children - 1, childrenAges: newChildrenAges });
    }
  };
  
  // Update a specific child's age
  const handleChildAgeChange = (index: number, age: number) => {
    const newChildrenAges = [...(value.childrenAges || [])];
    newChildrenAges[index] = age;
    onChange({ ...value, childrenAges: newChildrenAges });
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`w-full flex items-center border-2 border-gray-200 rounded-lg py-3 pl-10 pr-4 bg-white shadow-sm cursor-pointer hover:border-blue-400 transition-all duration-200 ${isOpen ? 'ring-2 ring-blue-200 border-blue-400' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors">
          <FaUserFriends />
        </div>
        
        <div className="flex flex-1 justify-between items-center">
          <span className="text-gray-800">
            {totalGuests} {translateFn(totalGuests === 1 ? 'guest' : 'guests')}
            {value.children > 0 && ` • ${value.children} ${translateFn(value.children === 1 ? 'child' : 'children')}`}
          </span>
          <FaChevronDown className={`text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {errors.adults && errors.adults.message && (
        <p className="text-red-500 text-sm mt-1">{translateFn(errors.adults.message as string)}</p>
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
                <div className="font-medium">{translateFn('adults')}</div>
                <div className="text-sm text-gray-500">{translateFn('age')} 18+</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`p-2 rounded-full ${value.adults <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
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
                <div className="font-medium">{translateFn('children')}</div>
                <div className="text-sm text-gray-500">{translateFn('age')} 0-18</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`p-2 rounded-full ${value.children <= 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
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
                <div className="font-medium mb-2">{translateFn('children_ages')}</div>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: value.children }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {(value.childrenAges?.[index] || 0) < 2 ? <FaBaby className="text-blue-400" /> : <FaChild className="text-blue-400" />}
                      <select
                        value={value.childrenAges?.[index] || 0}
                        onChange={(e) => handleChildAgeChange(index, parseInt(e.target.value))}
                        className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 18 }).map((_, age) => (
                          <option key={age} value={age}>{age} {translateFn('years')}</option>
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
                {translateFn('apply')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ReservationPage({ sanatoriums, locations = [] }: { sanatoriums: Sanatorium[], locations?: City[] }) {
  const t = useTranslations('pages.reservation');
  const tSearch = useTranslations('search');
  const tValidation = useTranslations('validation');
  const router = useRouter();
  const { setLoading } = useLoadingStore();
  
  // Define dynamic price range limits (still needed for form defaults)
  const MIN_PRICE_DEFAULT = 0;
  const MAX_PRICE_DEFAULT = 30000;
  
  // Main search form state that includes all parameters
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    minPrice: MIN_PRICE_DEFAULT,
    maxPrice: MAX_PRICE_DEFAULT,
    ratings: [] as number[]
  });
  

  
  // Form handling with react-hook-form
  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      childrenAges: [],
      location: '',
      minPrice: MIN_PRICE_DEFAULT,
      maxPrice: MAX_PRICE_DEFAULT,
      ratings: []
    }
  });

  // Initialize form from URL params
  useEffect(() => {
    // Get URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');
    const checkIn = urlParams.get('check_in');
    const checkOut = urlParams.get('check_out');
    const occupancy = urlParams.get('occupancy');
    const childrenAges = urlParams.get('children_ages');
    const minPrice = urlParams.get('min_total_price');
    const maxPrice = urlParams.get('max_total_price');
    const ratings = urlParams.get('ratings');
    
    // Parse ratings properly
    const parsedRatings = ratings ? ratings.split(',').map(r => parseInt(r)) : [];
    
    // Set form values from URL
    if (city) setValue('location', city);
    if (checkIn) setValue('checkIn', checkIn);
    if (checkOut) setValue('checkOut', checkOut);
    if (occupancy) setValue('adults', parseInt(occupancy));
    if (minPrice) setValue('minPrice', parseInt(minPrice));
    if (maxPrice) setValue('maxPrice', parseInt(maxPrice));
    if (ratings) setValue('ratings', parsedRatings);
    
    // Handle children ages
    if (childrenAges) {
      const ages = childrenAges.split(',').map(age => parseInt(age));
      setValue('children', ages.length);
      setValue('childrenAges', ages);
    }
    
    // Update searchParams state with all parameters
    setSearchParams({
      location: city || "",
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      guests: occupancy ? parseInt(occupancy) : 1,
      minPrice: minPrice ? parseInt(minPrice) : MIN_PRICE_DEFAULT,
      maxPrice: maxPrice ? parseInt(maxPrice) : MAX_PRICE_DEFAULT,
      ratings: parsedRatings
    });


  }, [setValue]);

  // Watch values for displaying in UI
  const { adults, children, childrenAges } = watch();
  
  // Handle main search form submission
  const onSubmit = (data: SearchFormValues) => {
    setLoading(true);
    
    // Update searchParams for existing code compatibility
    setSearchParams({
      location: data.location || "",
      checkIn: data.checkIn || "",
      checkOut: data.checkOut || "",
      guests: data.adults || 1,
      minPrice: data.minPrice || MIN_PRICE_DEFAULT,
      maxPrice: data.maxPrice || MAX_PRICE_DEFAULT,
      ratings: data.ratings || []
    });
    
    // Build URL parameters including ratings
    let url = `/reservation/?city=${data.location}&check_in=${data.checkIn}&check_out=${data.checkOut}&occupancy=${data.adults}&children_ages=${data.childrenAges ? data.childrenAges.join(',') : ''}&min_total_price=${data.minPrice || MIN_PRICE_DEFAULT}&max_total_price=${data.maxPrice || MAX_PRICE_DEFAULT}`;
    
    // Add ratings if they exist
    if (data.ratings && data.ratings.length > 0) {
      url += `&ratings=${data.ratings.join(',')}`;
    }
    
    // Navigate with search params
    router.push(url);
    
    setLoading(false);
  };
  
  // Apply sidebar filters
  const applyFilters = () => {
    setLoading(true);
    
    // Get current URL params
    const urlParams = new URLSearchParams(window.location.search);
    
    // Update price range parameters
    urlParams.set('min_total_price', searchParams.minPrice.toString());
    urlParams.set('max_total_price', searchParams.maxPrice.toString());
    
    // Update ratings parameter
    if (searchParams.ratings.length > 0) {
      urlParams.set('ratings', searchParams.ratings.join(','));
    } else {
      urlParams.delete('ratings');
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
      const minPrice = urlParams.get('min_total_price');
      const maxPrice = urlParams.get('max_total_price');
      const ratings = urlParams.get('ratings');
      
      // Parse the ratings properly
      const parsedRatings = ratings ? ratings.split(',').map(r => parseInt(r)) : [];
      
      // Update searchParams with new values from URL
      if (minPrice || maxPrice || ratings) {
        setSearchParams(prev => ({
          ...prev,
          minPrice: minPrice ? parseInt(minPrice) : prev.minPrice,
          maxPrice: maxPrice ? parseInt(maxPrice) : prev.maxPrice,
          ratings: parsedRatings
        }));
        
        // Also update the form values to keep them in sync
        if (ratings) setValue('ratings', parsedRatings);
        

      }
    };

    // Load filters on component mount
    loadFiltersFromURL();

    // Set up event listener for popstate (browser back/forward navigation)
    window.addEventListener('popstate', loadFiltersFromURL);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('popstate', loadFiltersFromURL);
    };
  }, []);  // Empty dependency array - run only on mount/unmount
  
  // Clear sidebar filters
  const clearFilters = () => {
    // Create a copy of current searchParams
    const updatedParams = { ...searchParams, minPrice: MIN_PRICE_DEFAULT, maxPrice: MAX_PRICE_DEFAULT, ratings: [] };
    
    // Update the state
    setSearchParams(updatedParams);
    
    // Update form values
    setValue('minPrice', MIN_PRICE_DEFAULT);
    setValue('maxPrice', MAX_PRICE_DEFAULT);
    setValue('ratings', []);
  };
  
  // Handle rating filter toggle
  const toggleRating = (rating: number) => {
    const newRatings = [...searchParams.ratings];
    
    if (newRatings.includes(rating)) {
      // Remove rating
      const updatedRatings = newRatings.filter(r => r !== rating);
      setSearchParams({ ...searchParams, ratings: updatedRatings });
      setValue('ratings', updatedRatings);
    } else {
      // Add rating
      const updatedRatings = [...newRatings, rating];
      setSearchParams({ ...searchParams, ratings: updatedRatings });
      setValue('ratings', updatedRatings);
    }
  };
  




  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Remove unused scroll position effect
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
 
  return (
    <div className="bg-gray-50 min-h-screen pb-5">
      {/* Search Form - Styled to match the page */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
              {/* Location Selector */}
              <div className="w-full lg:col-span-3">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors">
                    <FaMapMarkerAlt />
                  </div>
                  <select
                    {...register('location')}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all"
                  >
                    <option value="">{tSearch('select_city')}</option>
                    {locations?.map(location => (
                      <option key={location.id} value={location.id}>{location.region}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DateRangePicker */}
              <div className="w-full lg:col-span-3">
                <Controller
                  control={control}
                  name="checkIn"
                  render={({ field: { value: checkInValue } }) => (
                    <Controller
                      control={control}
                      name="checkOut"
                      render={({ field: { value: checkOutValue } }) => (
                        <DateRangePicker
                          startDate={checkInValue}
                          endDate={checkOutValue}
                          onChange={(startDate, endDate) => {
                            setValue('checkIn', startDate);
                            setValue('checkOut', endDate);
                          }}
                          className="w-full"
                          primaryColor="blue"
                          secondaryColor="blue"
                          placeholder={`${tSearch('check_in')} — ${tSearch('check_out')}`}
                          translations={{
                            checkIn: tSearch('check_in'),
                            checkOut: tSearch('check_out'),
                            selectDates: tSearch('select_dates'),
                            apply: tSearch('apply'),
                            clear: tSearch('clear'),
                            night: tSearch('night'),
                            nights: tSearch('nights'),
                            today: tSearch('today'),
                            checkInDate: tSearch('check_in_date'),
                            checkOutDate: tSearch('check_out_date'),
                            selectYear: tSearch('select_year')
                          }}
                        />
                      )}
                    />
                  )}
                />
              </div>

              {/* Guest Selector */}
              <div className="w-full lg:col-span-3">
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
                          render={({ field: { value: childrenAgesValue = [] } }) => (
                            <GuestSelector
                              value={{ 
                                adults: adultsValue, 
                                children: childrenValue, 
                                childrenAges: childrenAgesValue 
                              }}
                              onChange={({ adults, children, childrenAges }) => {
                                setValue('adults', adults);
                                setValue('children', children);
                                setValue('childrenAges', childrenAges);
                              }}
                              errors={errors}
                              translateFn={tSearch}
                            />
                          )}
                        />
                      )}
                    />
                  )}
                />
              </div>

              {/* Search Button */}
              <div className="w-full lg:col-span-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg flex items-center justify-center gap-2 font-medium shadow-md hover:from-blue-700 hover:to-blue-900 transition-all"
                >
                  <FaSearch />
                  <span>{tSearch('search_button')}</span>
                </button>
              </div>
            </div>
            
            {/* Hidden fields for price range - only for main search form */}
            <input type="hidden" {...register('minPrice')} />
            <input type="hidden" {...register('maxPrice')} />
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
            {t('search.filters.show')}
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
                  <h3 className="text-lg font-bold">{t('search.filters.show')}</h3>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">

                  
                  {/* Star rating section */}
                  <div className="p-4 space-y-4">
                    <h4 className="text-base font-bold text-gray-800 flex items-center">
                      <FaStar className="mr-2 text-blue-600" />
                      Star Rating
                    </h4>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <label key={stars} className="flex items-center p-2 rounded-lg transition-colors hover:bg-blue-50 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="rounded text-blue-600 mr-3 focus:ring-blue-500 h-5 w-5" 
                            checked={searchParams.ratings.includes(stars)}
                            onChange={() => toggleRating(stars)}
                          />
                          <div className="flex items-center">
                            {[...Array(stars)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 mr-0.5" />
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
                        clearFilters();
                        setShowMobileFilters(false);
                      }}
                      className="py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
                    >
                      {tSearch('clear')}
                    </button>
                    <button 
                      onClick={() => {
                        applyFilters();
                        setShowMobileFilters(false);
                      }}
                      className="py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md font-medium"
                    >
                      {tSearch('apply')}
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
                  {t('search.filters.show')}
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200">

                
                {/* Star rating section */}
                <div className="p-5 space-y-4">
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                    <FaStar className="mr-2 text-blue-600" />
                    Star Rating
                  </h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <label key={stars} className="flex items-center p-2 rounded-lg transition-colors hover:bg-blue-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-600 mr-3 focus:ring-blue-500 h-5 w-5" 
                          checked={searchParams.ratings.includes(stars)}
                          onChange={() => toggleRating(stars)}
                        />
                        <div className="flex items-center">
                          {[...Array(stars)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400 mr-0.5" />
                          ))}
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={clearFilters}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium flex-1"
                    >
                      {tSearch('clear')}
                    </button>
                    <button
                      onClick={applyFilters}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-medium flex-1"
                    >
                      {tSearch('apply')}
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
                {sanatoriums.length} {sanatoriums.length === 1 ? 'sanatorium' : 'sanatoriums'} {t('results.found')}
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
                <h3 className="text-xl font-bold text-gray-800 mb-3">{t('results.no_results.title')}</h3>
                <p className="text-gray-600 mb-6">{t('results.no_results.description')}</p>
                <button
                  onClick={() => {
                    setSearchParams({
                      location: "",
                      checkIn: "",
                      checkOut: "",
                      guests: 1,
                      minPrice: MIN_PRICE_DEFAULT,
                      maxPrice: MAX_PRICE_DEFAULT,
                      ratings: []
                    });
                    clearFilters();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 transition-all font-medium"
                >
                  {t('results.no_results.clear_filters')}
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {sanatoriums.map((sanatorium, index) => (
                  <SanatoriumHorizontal 
                    key={sanatorium.id}
                    sanatorium={sanatorium}
                    index={index}
                  />
                ))}
                
                {/* Pagination */}
                {/* <div className="flex justify-center mt-6">
                  <div className="inline-flex overflow-hidden rounded-lg shadow-sm">
                    <button className="w-12 h-12 border border-r-0 border-gray-300 bg-white text-blue-600 font-medium hover:bg-blue-50 flex items-center justify-center">
                      &lt;
                    </button>
                    {[1, 2, 3].map((page) => (
                      <button 
                        key={page}
                        className={`w-12 h-12 border border-r-0 border-gray-300 ${page === 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} font-medium hover:bg-blue-50 flex items-center justify-center`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="w-12 h-12 border border-gray-300 bg-white text-blue-600 font-medium hover:bg-blue-50 flex items-center justify-center">
                      &gt;
                    </button>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 