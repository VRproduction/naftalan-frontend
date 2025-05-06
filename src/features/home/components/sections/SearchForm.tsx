import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaSearch, FaUsers, FaMapMarkerAlt, FaMinus, FaPlus, FaChild, FaBaby, FaChevronDown } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Link as IntlLink, useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { City } from '@/lib/types/sanatorium.type';
import { useLoadingStore } from '@/lib/store/useLoadingStore';
import DateRangePicker from '@/components/ui/inputs/DateRangePicker';

// Define schema for form validation
const searchSchema = z.object({
  checkIn: z.string().min(1, { message: 'check_in_required' }),
  checkOut: z.string().min(1, { message: 'check_out_required' }),
  adults: z.number().min(1, { message: 'min_adults' }),
  children: z.number().min(0),
  childrenAges: z.array(z.number()).optional(),
  location: z.string().optional()
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
          <FaUsers />
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

interface Props {
  locations: City[]
}

const SearchForm = ({locations}: Props) => {
  const t = useTranslations('search');
  const tValidation = useTranslations('validation');
  
  const router = useRouter();
  const {setLoading} = useLoadingStore();

  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      childrenAges: [],
      location: ''
    }
  });

  // Watch values for displaying in UI
  const { adults, children, childrenAges } = watch();

  const onSubmit = (data: SearchFormValues) => {
    setLoading(true);
    router.push(`/reservation/?city=${data.location}&check_in=${data.checkIn}&check_out=${data.checkOut}&occupancy=${data.adults}&children_ages=${data.childrenAges ? data.childrenAges.join(',') : ''}`);

    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-xl shadow-xl p-6 lg:p-8 mx-4 -mt-16 md:-mt-22 lg:-mt-32 relative z-30 backdrop-blur-sm bg-opacity-95 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {t('title')}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
          {/* Location Selector */}
          <div className="w-full lg:col-span-3 flex flex-col h-full">
            <label className="block text-gray-700 mb-2 font-medium">{t('city')}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors">
                <FaMapMarkerAlt />
              </div>
              <select
                {...register('location')}
                className="w-full pl-10 pr-3 py-[14px] border-[2.5px] border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-200"
              >
                <option value="">{t('select_city')}</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.region}</option>
                ))}
              </select>
            </div>
            {errors.location && errors.location.message && (
              <p className="text-red-500 text-sm mt-1">{tValidation(errors.location.message as string)}</p>
            )}
          </div>

          {/* DateRangePicker */}
          <div className="w-full lg:col-span-3 flex flex-col h-full">
            <label className="block text-gray-700 mb-2 font-medium">{t('dates')}</label>
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
                      placeholder={`${t('check_in')} — ${t('check_out')}`}
                      translations={{
                        checkIn: t('check_in'),
                        checkOut: t('check_out'),
                        selectDates: t('select_dates'),
                        apply: t('apply'),
                        clear: t('clear'),
                        night: t('night'),
                        nights: t('nights'),
                        today: t('today'),
                        checkInDate: t('check_in_date'),
                        checkOutDate: t('check_out_date'),
                        selectYear: t('select_year')
                      }}
                    />
                  )}
                />
              )}
            />
            {(errors.checkIn?.message || errors.checkOut?.message) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.checkIn?.message ? tValidation(errors.checkIn.message as string) : tValidation(errors.checkOut?.message as string)}
              </p>
            )}
          </div>

          {/* Guest Selector */}
          <div className="w-full lg:col-span-3 flex flex-col h-full">
            <label className="block text-gray-700 mb-2 font-medium">{t('guests')}</label>
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
                          translateFn={t}
                        />
                      )}
                    />
                  )}
                />
              )}
            />
          </div>

          {/* Search Button */}
          <div className="w-full lg:col-span-3 flex flex-col h-full">
            <label className="invisible block text-gray-700 mb-2 font-medium">Search</label>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              <FaSearch />
              <span>{t('search_button')}</span>
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <IntlLink href="/reservation" className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center gap-1 transition-colors">
          <span>{t('view_all_offers')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </IntlLink>
      </div>
    </motion.div>
  );
};

export default SearchForm; 