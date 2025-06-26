import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaSearch, FaUsers, FaMapMarkerAlt, FaMinus, FaPlus, FaChild, FaBaby, FaChevronDown, FaHotel } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Link as IntlLink, useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { City, Sanatorium, SanatoriumListType } from '@/lib/types/sanatorium.type';
import { useLoadingStore } from '@/lib/store/useLoadingStore';
import DateRangePicker from '@/components/ui/inputs/DateRangePicker';
import GuestSelector from '@/components/ui/inputs/GuestSelector';
import Select from '@/components/ui/inputs/Select';

// Define schema for form validation
const searchSchema = z.object({
  checkIn: z.string().min(1, { message: 'check_in_required' }),
  checkOut: z.string().min(1, { message: 'check_out_required' }),
  adults: z.number().min(1, { message: 'min_adults' }),
  children: z.number().min(0),
  childrenAges: z.array(z.number()).optional(),
  location: z.string().optional(),
  sanatorium: z.string().optional()
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface Props {
  locations: City[]
  sanatoriums: SanatoriumListType[]
}

const SearchForm = ({locations, sanatoriums}: Props) => {
  const t = useTranslations('search');
  const tValidation = useTranslations('validation');
  
  const router = useRouter();
  const {setLoading} = useLoadingStore();

  const { register, control, handleSubmit, formState: { errors }, clearErrors,  setValue, watch } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      checkIn: '',
      checkOut: '',
      adults: 0,
      children: 0,
      childrenAges: [],
      location: '',
      sanatorium: ''
    }
  });

  // Watch location value to filter sanatoriums
  const selectedLocation = watch('location');
  
  // Filter sanatoriums based on selected location
  const filteredSanatoriums = selectedLocation 
    ? sanatoriums.filter(s => String(s.location.id) === selectedLocation)
    : sanatoriums; // Show all sanatoriums when no city is selected


  // Reset sanatorium when location changes
  useEffect(() => {
    setValue('sanatorium', '');
  }, [selectedLocation, setValue]);

  const onSubmit = (data: SearchFormValues) => {
    setLoading(true);
    router.push(`/reservation/?city=${data.location}&id=${data.sanatorium}&check_in=${data.checkIn}&check_out=${data.checkOut}&occupancy=${data.adults}&children_ages=${data.childrenAges ? data.childrenAges.join(',') : ''}`);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
          {/* Location Selector */}
          <div className="w-full lg:col-span-2 flex flex-col h-full">
            <label className="block text-gray-700 mb-2 font-medium">{t('city')}</label>
            <Controller
              control={control}
              name="location"
              render={({ field: { value, onChange, name } }) => (
                <Select
                  value={value || ''}
                  onValueChange={onChange}
                  name={name}
                  className="w-full pl-7 pr-3 min-h-[48px]"
                  placeholder={t('select_city')}
                  clearable
                  icon={<FaMapMarkerAlt />}
                >
                  {locations.map(location => (
                    <Select.Item key={location.id} value={String(location.id)}>
                      {location.region}
                    </Select.Item>
                  ))}
                </Select>
              )}
            />
            {errors.location && errors.location.message && (
              <p className="text-red-500 text-sm mt-1">{tValidation(errors.location.message as string)}</p>
            )}
          </div>

          {/* Sanatorium Selector */}
          <div className="w-full lg:col-span-2 flex flex-col h-full">
            <label className="block text-gray-700 mb-2 font-medium">{t('hotel')}</label>
            <Controller
              control={control}
              name="sanatorium"
              render={({ field: { value, onChange, name } }) => (
                <Select
                  value={value || ''}
                  onValueChange={onChange}
                  name={name}
                  className="w-full pl-7 pr-3 min-h-[48px]"
                  placeholder={t('select_hotel')}
                  clearable
                  icon={<FaHotel />}
                >
                  {filteredSanatoriums.map(sanatorium => (
                    <Select.Item key={sanatorium.id} value={String(sanatorium.id)}>
                      {sanatorium.name}
                    </Select.Item>
                  ))}
                </Select>
              )}
            />
            {errors.sanatorium && errors.sanatorium.message && (
              <p className="text-red-500 text-sm mt-1">{tValidation(errors.sanatorium.message as string)}</p>
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

                        // Hataları temizle
                        if (errors.checkIn || errors.checkOut) {
                          clearErrors(['checkIn', 'checkOut']);
                        }
                      }}
                      hasError={!!errors.checkIn || !!errors.checkOut}
                      className="w-full min-h-[48px]"
                      primaryColor="blue"
                      secondaryColor="blue"
                      placeholder={`${t('check_in')} — ${t('check_out')}`}
                     
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

                            // Error sıfırlama koşulu
                            if (errors.adults || errors.children || errors.childrenAges) {
                              clearErrors(['adults', 'children', 'childrenAges']);
                            }
                          }}
                          errors={errors}
                          className="min-h-[48px]"
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
            <label className="invisible block text-gray-700 mb-2 font-medium">Search</label>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 min-h-[48px]"
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