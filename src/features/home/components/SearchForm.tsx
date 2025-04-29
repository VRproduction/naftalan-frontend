import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaCalendarAlt, FaSearch, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Link as IntlLink, useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { City } from '@/lib/types/sanatorium.type';
import { useLoadingStore } from '@/lib/store/useLoadingStore';

// Define schema for form validation
const searchSchema = z.object({
  checkIn: z.string().min(1, { message: 'check_in_required' }),
  checkOut: z.string().min(1, { message: 'check_out_required' }),
  adults: z.number().min(1, { message: 'min_adults' }),
  children: z.number().min(0),
  location: z.string().min(1, { message: 'city_required' })
});

type SearchFormValues = z.infer<typeof searchSchema>;



interface Props {
  locations: City []
}

const SearchForm = ({locations}: Props) => {
  const t = useTranslations('search');
  const tValidation = useTranslations('validation');
  
  const router = useRouter();
  const {setLoading} = useLoadingStore();

  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      location: ''
    }
  });

  const onSubmit = (data: SearchFormValues) => {
    setLoading(true)
    setTimeout(() => {
      router.push(`/reservation/?city=${data.location}`)
      setLoading(false)
    }, 300)
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-5">
        <div className="w-full lg:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">{t('city')}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors">
                <FaMapMarkerAlt />
              </div>
              <select
                {...register('location')}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-200"
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
          <div className="w-full lg:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">{t('check_in')}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors">
                <FaCalendarAlt />
              </div>
              <input
                type="date"
                {...register('checkIn')}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-200"
              />
            </div>
            {errors.checkIn && errors.checkIn.message && (
              <p className="text-red-500 text-sm mt-1">{tValidation(errors.checkIn.message as string)}</p>
            )}
          </div>

          <div className="w-full lg:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">{t('check_out')}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors">
                <FaCalendarAlt />
              </div>
              <input
                type="date"
                {...register('checkOut')}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-200"
              />
            </div>
            {errors.checkOut && errors.checkOut.message && (
              <p className="text-red-500 text-sm mt-1">{tValidation(errors.checkOut.message as string)}</p>
            )}
          </div>

          <div className="w-full lg:col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">{t('guests')}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 group-hover:text-blue-500 transition-colors">
                <FaUsers />
              </div>
              <div className="flex">
                <div className="flex-1">
                  <select
                    {...register('adults', { valueAsNumber: true })}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-200"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {t('adults')}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <select
                    {...register('children', { valueAsNumber: true })}
                    className="w-full px-3 py-3 border border-gray-300 border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-200"
                  >
                    {[0, 1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num} {t('children')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

         

          <div className="w-full lg:col-span-2">
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