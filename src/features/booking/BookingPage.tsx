'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaInfoCircle, FaCheck, FaHotel } from 'react-icons/fa';
import { createBooking } from '@/lib/services/booking.service';
import { BookingRequestData } from '@/lib/types/booking.type';
import { SanatoriumDetail } from '@/lib/types/sanatorium.type';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import { useTranslations } from 'next-intl';

interface Props {
  sanatorium: SanatoriumDetail
}

export default function BookingPage({ sanatorium }: Props) {
  const { formatPrice } = useCurrencyStore();
  const t = useTranslations('booking');
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    childrenAges: [] as number[],
    sanatoriumId: sanatorium.id || '',
    roomTypeId: '',
    withTreatment: true,
    specialRequests: '',
    termsAccepted: false,
    season: 1, // Default season, should be dynamic in production
    currency: 1, // Default currency ID, should be based on currentCurrency
  });
  
  // Add price update trigger
  const [priceUpdateTrigger, setPriceUpdateTrigger] = useState(0);
  
  // Form error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Booking success state
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Set up effect to refresh price display when adults count changes
  useEffect(() => {
    // The component will re-render any time priceUpdateTrigger changes
    console.log(`Updating prices due to adults change: ${formData.adults} people`);
    // Force re-render without actually changing state
  }, [formData.adults, priceUpdateTrigger]);
  
  // Handle room type selection with auto-adjustment of adults
  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomTypeId = e.target.value;
    
    if (roomTypeId) {
      const selectedRoom = sanatorium.room_types.find(r => r.id.toString() === roomTypeId);
      
      // If room has prices with occupancy
      if (selectedRoom && selectedRoom.prices && selectedRoom.prices.length > 0) {
        // Get all available occupancy options
        const occupancyOptions = selectedRoom.prices.map(price => price.occupancy);
        
        // Sort them to get smallest first
        occupancyOptions.sort((a: number, b: number) => a - b);
        
        // Default to first (smallest) occupancy value
        let defaultOccupancy = occupancyOptions[0];
        
        // Try to find a 2-person occupancy option as that's a common default
        const twoPersonIndex = occupancyOptions.findIndex(occ => occ === 2);
        if (twoPersonIndex >= 0) {
          defaultOccupancy = 2;
        }
        
        // If current adults selection is valid for this room, keep it
        if (occupancyOptions.includes(formData.adults)) {
          defaultOccupancy = formData.adults;
        }
        
        // Adjust children count based on max_extra_beds
        let adjustedChildrenCount = formData.children;
        let newChildrenAges = [...formData.childrenAges];
        
        // Only adjust if max_extra_beds is defined and not null
        if (selectedRoom.max_extra_beds !== null && selectedRoom.max_extra_beds !== undefined) {
          const maxExtraBeds = selectedRoom.max_extra_beds;
          
          if (formData.children > maxExtraBeds) {
            // Need to reduce children count
            adjustedChildrenCount = maxExtraBeds;
            newChildrenAges = newChildrenAges.slice(0, maxExtraBeds);
            console.log(`Adjusting children count from ${formData.children} to ${adjustedChildrenCount} based on room's max_extra_beds`);
          }
        }
        
        setFormData({
          ...formData,
          roomTypeId,
          adults: defaultOccupancy,
          children: adjustedChildrenCount,
          childrenAges: newChildrenAges
        });
      } else {
        // Adjust children count based on max_extra_beds
        let adjustedChildrenCount = formData.children;
        let newChildrenAges = [...formData.childrenAges];
        
        // Only adjust if max_extra_beds is defined and not null
        if (selectedRoom?.max_extra_beds !== null && selectedRoom?.max_extra_beds !== undefined) {
          const maxExtraBeds = selectedRoom.max_extra_beds;
          
          if (formData.children > maxExtraBeds) {
            // Need to reduce children count
            adjustedChildrenCount = maxExtraBeds;
            newChildrenAges = newChildrenAges.slice(0, maxExtraBeds);
            console.log(`Adjusting children count from ${formData.children} to ${adjustedChildrenCount} based on room's max_extra_beds`);
          }
        }
        
        // Otherwise just update the room type
        setFormData({
          ...formData,
          roomTypeId,
          children: adjustedChildrenCount,
          childrenAges: newChildrenAges
        });
      }
    } else {
      // No room selected
      setFormData({
        ...formData,
        roomTypeId
      });
    }
    
    // Clear error for this field if it exists
    if (errors.roomTypeId) {
      setErrors({
        ...errors,
        roomTypeId: ''
      });
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Special handling for room type to auto-set adults
    if (name === 'roomTypeId') {
      handleRoomTypeChange(e as React.ChangeEvent<HTMLSelectElement>);
      return;
    }

    // Special handling for adults to trigger price recalculation
    if (name === 'adults') {
      const adultsValue = parseInt(value);
      
      // Update form data with new adults count
      setFormData(prevData => ({
        ...prevData,
        adults: adultsValue
      }));
      
      // Force a price recalculation
      setPriceUpdateTrigger(prev => prev + 1);
      
      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
      
      // We don't need to do anything else since our price calculations
      // will use the updated adults count
      return;
    }
    
    // Handle checkbox
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
      return;
    }
    
    // Handle children count change to update childrenAges array
    if (name === 'children') {
      const newChildrenCount = parseInt(value);
      const currentChildrenCount = formData.childrenAges.length;
      
      // Check if selected room has a max_extra_beds limitation
      let maxAllowedChildren = 10; // Default max children if no room selected or unlimited
      let isUnlimitedExtraBeds = false;
      
      if (formData.roomTypeId) {
        const selectedRoom = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
        if (selectedRoom) {
          if (selectedRoom.max_extra_beds === null) {
            // Null değeri sınırsız yatak anlamına gelir
            isUnlimitedExtraBeds = true;
            maxAllowedChildren = Math.max(newChildrenCount, 10); // Dinamik olarak artırılabilir
          } else if (selectedRoom.max_extra_beds !== undefined) {
            maxAllowedChildren = selectedRoom.max_extra_beds;
          }
        }
      }
      
      // Limit children count to max_extra_beds - unless max_extra_beds is null
      const limitedChildrenCount = isUnlimitedExtraBeds ? newChildrenCount : Math.min(newChildrenCount, maxAllowedChildren);
      
      if (limitedChildrenCount !== newChildrenCount && !isUnlimitedExtraBeds) {
        console.log(`Children count limited to ${limitedChildrenCount} due to room's max_extra_beds`);
      }
      
      let newChildrenAges = [...formData.childrenAges];
      
      if (limitedChildrenCount > currentChildrenCount) {
        // Add new children with default age of 6
        const agesToAdd = limitedChildrenCount - currentChildrenCount;
        for (let i = 0; i < agesToAdd; i++) {
          newChildrenAges.push(6);
        }
      } else if (limitedChildrenCount < currentChildrenCount) {
        // Remove extra children
        newChildrenAges = newChildrenAges.slice(0, limitedChildrenCount);
      }
      
      setFormData({
        ...formData,
        children: limitedChildrenCount,
        childrenAges: newChildrenAges
      });
      
      // Force a price recalculation when children count changes
      setPriceUpdateTrigger(prev => prev + 1);
      
      return;
    }
    
    // Handle child age change
    if (name.startsWith('childAge_')) {
      const index = parseInt(name.split('_')[1]);
      const newAge = parseInt(value);
      
      const newChildrenAges = [...formData.childrenAges];
      newChildrenAges[index] = newAge;
      
      setFormData({
        ...formData,
        childrenAges: newChildrenAges
      });
      
      // Force a price recalculation when child age changes
      setPriceUpdateTrigger(prev => prev + 1);
      
      return;
    }
    
    // Handle other inputs
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.firstName) newErrors.firstName = t('validation.first_name_required');
    if (!formData.lastName) newErrors.lastName = t('validation.last_name_required');
    if (!formData.email) newErrors.email = t('validation.email_required');
    if (!formData.phone) newErrors.phone = t('validation.phone_required');
    if (!formData.checkIn) newErrors.checkIn = t('validation.check_in_required');
    if (!formData.checkOut) newErrors.checkOut = t('validation.check_out_required');
    if (!formData.roomTypeId) newErrors.roomTypeId = t('validation.room_type_required');
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.email_invalid');
    }
    
    // Phone validation
    if (formData.phone && !/^\+?[0-9\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = t('validation.phone_invalid');
    }
    
    // Date validation
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      
      if (checkIn >= checkOut) {
        newErrors.checkOut = t('validation.check_out_after_check_in');
      }
      
      // Check if check-in date is in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkIn < today) {
        newErrors.checkIn = t('validation.check_in_not_past');
      }
    }
    
    // Terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = t('validation.terms_required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Show loading state
        setIsLoading(true);
        
        // Calculate total price
        const nights = calculateNights();
        const selectedRoom = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
        
        // Get room price using the helper function
        const roomPricePerNight = selectedRoom ? getRoomPrice(selectedRoom) : 0;
        const extraBedCost = selectedRoom ? calculateExtraBedPrices(selectedRoom) : 0;
        const totalPrice = roomPricePerNight 
          ? ((roomPricePerNight + extraBedCost) * nights).toString() 
          : "0";
        
        // Prepare extra beds data
        const extraBeds = [];
        if (selectedRoom && formData.childrenAges.length > 0) {
          // Null değeri sınırsız yatak anlamına gelir, tüm çocuklar için yatak ekle
          const isUnlimitedExtraBeds = selectedRoom.max_extra_beds === null;
          const maxExtraBeds = isUnlimitedExtraBeds 
            ? formData.childrenAges.length  // Limitsiz - tüm çocuklar için yatak ekle
            : (selectedRoom.max_extra_beds || 0);  // Sınırlı yatak sayısı
          
          let extraBedsUsed = 0;
          
          for (let i = 0; i < formData.childrenAges.length && extraBedsUsed < maxExtraBeds; i++) {
            const childAge = formData.childrenAges[i];
            const extraBedPrice = getExtraBedPrice(selectedRoom, childAge);
            
            if (extraBedPrice !== null) {
              extraBeds.push({
                quantity: 1, // One extra bed per child
                for_adult: false, // Extra bed is for a child
                with_treatment: formData.withTreatment,
                treatment_option: null,
                price_per_night: extraBedPrice.price.toString(),
                extra_bed_price: extraBedPrice.id
              });
              extraBedsUsed++;
            }
          }
        }
        
        // Create booking data object
        const bookingData: BookingRequestData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          sanatorium: parseInt(formData.sanatoriumId.toString()),
          room_type: parseInt(formData.roomTypeId.toString()),
          season: formData.season,
          check_in_date: formData.checkIn,
          check_out_date: formData.checkOut,
          adults: formData.adults,
          children: formData.children,
          special_requests: formData.specialRequests || null,
          with_treatment: formData.withTreatment,
          treatment_option: null,
          total_price: totalPrice,
          currency: formData.currency,
          guests: [
            {
              first_name: formData.firstName,
              last_name: formData.lastName,
              gender: null, // This should be collected in the form
              date_of_birth: null, // This should be collected in the form
              age_category: 'adult' as 'adult', // Using 'as' type assertion to ensure correct literal type
              is_main_guest: true
            },
            // Add children as guests
            ...formData.childrenAges.map((age, index) => ({
              first_name: `Uşaq ${index + 1}`, // Placeholder name, could be collected in the form
              last_name: formData.lastName,
              gender: null,
              date_of_birth: calculateChildBirthdate(age), // Helper function to calculate birthdate from age
              age_category: 'child' as 'child', // Using 'as' type assertion to ensure correct literal type
              is_main_guest: false
            }))
          ],
          extra_beds: extraBeds // Add the prepared extra beds data
        };
        
        console.log(bookingData)

        // Send data to backend
        await createBooking(bookingData);
      
      // Show success message
      setBookingSuccess(true);
      } catch (error) {
        console.error('Error creating booking:', error);
        setErrors({
          ...errors,
          submit: 'Rezervasiya yaradılarkən xəta baş verdi. Yenidən cəhd edin.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const calculateNights = (checkInDate?: string, checkOutDate?: string) => {
    // Use provided dates or form data dates
    const startDate = checkInDate || formData.checkIn;
    const endDate = checkOutDate || formData.checkOut;
    
    if (!startDate || !endDate) return 0;
    
    // Convert to date objects only once
    const checkIn = new Date(startDate);
    const checkOut = new Date(endDate);
    
    // Calculate the time difference in milliseconds and convert to days
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.round(timeDiff / (1000 * 60 * 60 * 24));
  };
  
  const nights = calculateNights();
  
  // Helper function to calculate child birthdate from age
  const calculateChildBirthdate = (age: number): string => {
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    return `${birthYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };
  
  // Memoized price calculation for extra bed price by child age
  const getExtraBedPrice = (() => {
    // Cache for price calculations to avoid redundant calculations for the same child age
    const priceCache = new Map();
    
    return (room: any, childAge: number): { price: number, id: number } | null => {
      // Create a cache key from room id, child age, treatment option, and check-in date (if available)
      const cacheKey = `${room.id}_${childAge}_${formData.withTreatment}_${formData.checkIn || 'no-date'}`;
      
      // Return cached result if available
      if (priceCache.has(cacheKey)) {
        return priceCache.get(cacheKey);
      }
      
      // Return null if no room or no extra bed prices
      if (!room || !room.extra_bed_prices || room.extra_bed_prices.length === 0) {
        priceCache.set(cacheKey, null);
        return null;
      }
      
      // Variables for price matching
      let extraBedPrice = null;
      const { withTreatment } = formData;
      const extraBedPrices = room.extra_bed_prices;
      
      // Find the matching age group with exact matches first (age group + treatment)
      // Yaş grubu yoksa veya yaş grubu sınırları dışındaysa fiyat eklenmeyecek
      extraBedPrice = extraBedPrices.find((price: any) => {
        if (!price.age_group || !price.age_group.min_age || !price.age_group.max_age) return false;
        const { min_age, max_age } = price.age_group;
        return childAge >= min_age && childAge <= max_age && price.with_treatment === withTreatment;
      });
      
      // If no match with treatment, try just age match
      if (!extraBedPrice) {
        extraBedPrice = extraBedPrices.find((price: any) => {
          if (!price.age_group || !price.age_group.min_age || !price.age_group.max_age) return false;
          const { min_age, max_age } = price.age_group;
          return childAge >= min_age && childAge <= max_age;
        });
      }
      
      // If still no match don't try highest age group - simply return null
      // Çocuğun yaşına uygun bir ekstra yatak fiyatı bulunamadı
      if (!extraBedPrice) {
        priceCache.set(cacheKey, null);
        return null;
      }
      
      let finalPrice = parseFloat(extraBedPrice.price);
      let extraBedPriceId = extraBedPrice.id;
      
      // Check for seasonal pricing if dates are selected
      if (formData.checkIn && formData.checkOut) {
        const checkInDate = new Date(formData.checkIn);
        
        // Find if there's a seasonal price for this period
        if (room.season_prices && room.season_prices.length > 0) {
          const matchingSeason = room.season_prices.find((seasonPrice: any) => {
            const seasonStartDate = new Date(seasonPrice.start_date);
            const seasonEndDate = new Date(seasonPrice.end_date);
            return checkInDate >= seasonStartDate && checkInDate <= seasonEndDate;
          });
          
          if (matchingSeason) {
            // Look for seasonal extra bed price with exact match (age + season + treatment)
            const seasonExtraBedPrice = extraBedPrices.find((price: any) => {
              if (!price.age_group || !price.age_group.min_age || !price.age_group.max_age) return false;
              const { min_age, max_age } = price.age_group;
              const ageMatches = childAge >= min_age && childAge <= max_age;
              
              // Match season and treatment option
              const seasonMatches = price.season && price.season.id === matchingSeason.id;
              const treatmentMatches = price.with_treatment === withTreatment;
              
              return ageMatches && seasonMatches && treatmentMatches;
            });
            
            if (seasonExtraBedPrice) {
              finalPrice = parseFloat(seasonExtraBedPrice.price);
              extraBedPriceId = seasonExtraBedPrice.id;
            } else {
              // If no match with treatment, try just age and season
              const fallbackSeasonPrice = extraBedPrices.find((price: any) => {
                if (!price.age_group || !price.age_group.min_age || !price.age_group.max_age) return false;
                const { min_age, max_age } = price.age_group;
                return childAge >= min_age && childAge <= max_age && price.season && price.season.id === matchingSeason.id;
              });
              
              if (fallbackSeasonPrice) {
                finalPrice = parseFloat(fallbackSeasonPrice.price);
                extraBedPriceId = fallbackSeasonPrice.id;
              }
            }
          }
        }
      }
      
      // Cache and return the calculated price and id
      const result = { price: finalPrice, id: extraBedPriceId };
      priceCache.set(cacheKey, result);
      return result;
    };
  })();

  // Cached calculation of extra bed prices
  const calculateExtraBedPrices = (() => {
    let lastParams = {
      roomId: null as number | null,
      childrenAges: [] as number[],
      checkIn: '',
      checkOut: '',
      withTreatment: true
    };
    let cachedResult = 0;
    
    return (room: any) => {
      // Check if we can use the cached result
      const currentParams = {
        roomId: room?.id || null,
        childrenAges: [...formData.childrenAges],
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        withTreatment: formData.withTreatment
      };
      
      // Use cached result if parameters haven't changed
      if (
        lastParams.roomId === currentParams.roomId &&
        JSON.stringify(lastParams.childrenAges) === JSON.stringify(currentParams.childrenAges) &&
        lastParams.checkIn === currentParams.checkIn &&
        lastParams.checkOut === currentParams.checkOut &&
        lastParams.withTreatment === currentParams.withTreatment
      ) {
        return cachedResult;
      }
      
      // Quick return if no children or no room
      if (!room || !formData.childrenAges || formData.childrenAges.length === 0) {
        lastParams = currentParams;
        cachedResult = 0;
        return 0;
      }
      
      // Check if extra beds are unlimited (max_extra_beds === null)
      const isUnlimitedExtraBeds = room.max_extra_beds === null;
      
      // Determine max extra beds - null değerini tüm çocuklar için yatak olarak değerlendir
      const maxExtraBeds = isUnlimitedExtraBeds 
        ? formData.childrenAges.length  // Sınırsız yatak senaryosu - tüm çocuklar için yatak
        : (room.max_extra_beds !== undefined ? room.max_extra_beds : formData.children);
      
      // Return early if no extra beds are available
      if (maxExtraBeds === 0) {
        lastParams = currentParams;
        cachedResult = 0;
        return 0;
      }
      
      // Calculate prices for each child
      let totalExtraBedPrice = 0;
      
      // Yatakları belirlerken, limitsiz (null) durumunda tüm çocuklar için yatak fiyatı hesapla
      const childCount = isUnlimitedExtraBeds 
        ? formData.childrenAges.length  // Tüm çocuklar için hesapla
        : Math.min(formData.childrenAges.length, maxExtraBeds);  // Limitli durumda sınırla
      
      for (let i = 0; i < childCount; i++) {
        const childAge = formData.childrenAges[i];
        const extraBedPrice = getExtraBedPrice(room, childAge);
        
        if (extraBedPrice !== null) {
          totalExtraBedPrice += extraBedPrice.price;
        }
      }
      
      // Update cache and return result
      lastParams = currentParams;
      cachedResult = totalExtraBedPrice;
      return totalExtraBedPrice;
    };
  })();

  // Memoized room price calculation
  const getRoomPrice = (() => {
    // Cache for room price calculations
    let lastParams = {
      roomId: null as number | null,
      adults: 0,
      checkIn: '',
      checkOut: '',
      withTreatment: true
    };
    let cachedResult: number | null = null;
    
    return (room: any) => {
      // Check if we can use cached result
      const currentParams = {
        roomId: room?.id || null,
        adults: formData.adults,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        withTreatment: formData.withTreatment
      };
      
      // Use cached value if parameters haven't changed
      if (
        lastParams.roomId === currentParams.roomId &&
        lastParams.adults === currentParams.adults &&
        lastParams.checkIn === currentParams.checkIn &&
        lastParams.checkOut === currentParams.checkOut &&
        lastParams.withTreatment === currentParams.withTreatment
      ) {
        return cachedResult;
      }
      
      // Return null if no room is selected
      if (!room || !room.prices || room.prices.length === 0) {
        lastParams = currentParams;
        cachedResult = null;
        return null;
      }
      
      // Find the price that matches the current adults count (occupancy)
      const occupancyPrice = room.prices.find((price: any) => price.occupancy === formData.adults);
      
      // Return null if no matching occupancy price
      if (!occupancyPrice) {
        lastParams = currentParams;
        cachedResult = null;
        return null;
      }
      
      // Base price from standard pricing
      let finalPrice = parseFloat(occupancyPrice.price);
      
      // Check for seasonal pricing if dates are selected
      if (formData.checkIn && formData.checkOut && room.season_prices?.length > 0) {
        const checkInDate = new Date(formData.checkIn);
        
        // Find a season that matches our check-in date
        const matchingSeason = room.season_prices.find((seasonPrice: any) => {
          const seasonStartDate = new Date(seasonPrice.start_date);
          const seasonEndDate = new Date(seasonPrice.end_date);
          return checkInDate >= seasonStartDate && checkInDate <= seasonEndDate;
        });
        
        if (matchingSeason?.prices?.length > 0) {
          // Try to find a matching occupancy price for this season
          const seasonOccupancyPrice = matchingSeason.prices.find((price: any) => 
            price.occupancy === formData.adults
          );
          
          // Use the seasonal price if found
          if (seasonOccupancyPrice) {
            finalPrice = parseFloat(seasonOccupancyPrice.price);
          }
        }
      }
      
      // Update cache and return final price
      lastParams = currentParams;
      cachedResult = finalPrice;
      return finalPrice;
    };
  })();
  
  
  // Fade in animation variant
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{t('title')}</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Booking Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              {bookingSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-green-500 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('success.title')}</h2>
                  <p className="text-gray-600 mb-6">
                    {t('success.message', { email: formData.email })}
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 text-left">
                    <h3 className="font-bold text-gray-800 mb-2">{t('success.details')}</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li><strong>{t('success.sanatorium')}</strong> {sanatorium.name}</li>
                      <li><strong>{t('success.dates')}</strong> {new Date(formData.checkIn).toLocaleDateString()} — {new Date(formData.checkOut).toLocaleDateString()}</li>
                      <li><strong>{t('success.guests')}</strong> {formData.adults} {formData.adults === 1 ? t('form.adult') : t('form.adults_plural')}{formData.children > 0 ? `, ${formData.children} ${formData.children === 1 ? t('form.child') : t('form.children_plural')}` : ''}</li>
                      {formData.children > 0 && (
                        <li><strong>{t('success.children_ages')}</strong> {formData.childrenAges.join(', ')} {t('form.years')}</li>
                      )}
                      <li><strong>{t('success.room')}</strong> {sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString())?.name}</li>
                    </ul>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Link 
                      href="/"
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all inline-block"
                    >
                      {t('success.back_to_home')}
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                  {/* Hotel Information */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-8 flex items-start">
                    <FaHotel className="text-blue-500 mt-1 mr-3 flex-shrink-0 text-xl" />
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{sanatorium.name}</h3>
                      <p className="text-gray-600">{sanatorium.location.region}, {sanatorium.location.country}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('form.room_guest_selection')}</h2>
                  
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    <div>
                      <label htmlFor="roomTypeId" className="block text-sm font-medium text-gray-700 mb-1">{t('form.room_type')}</label>
                      <select
                        id="roomTypeId"
                        name="roomTypeId"
                        value={formData.roomTypeId}
                          onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.roomTypeId ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">{t('form.select_room')}</option>
                        {sanatorium.room_types.map(room => (
                          <option key={room.id} value={room.id}>
                            {room.name} {room.max_extra_beds ? `(${room.max_extra_beds} ${t('form.extra_beds')})` : ''}
                          </option>
                        ))}
                      </select>
                      {errors.roomTypeId && <p className="mt-1 text-sm text-red-500">{errors.roomTypeId}</p>}
                      {formData.roomTypeId && formData.children > 0 && (() => {
                        const room = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                        if (!room) return null;
                        if (room.max_extra_beds === null) return null;
                        if (room.max_extra_beds === 0) {
                          return (
                            <p className="mt-1 text-xs text-amber-600">
                              <FaInfoCircle className="inline mr-1" />
                              {t('form.extra_bed_not_available')}
                            </p>
                          );
                        }
                        if (formData.children > room.max_extra_beds) {
                          return (
                            <p className="mt-1 text-xs text-amber-600">
                              <FaInfoCircle className="inline mr-1" />
                              {t('form.extra_bed_limit_exceeded', { count: room.max_extra_beds, selected: formData.children })}
                            </p>
                          );
                        }
                        return null;
                      })()}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">{t('form.adults')}</label>
                        <select
                          id="adults"
                          name="adults"
                          value={formData.adults}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {(() => {
                            if (formData.roomTypeId) {
                              const selectedRoom = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                              if (selectedRoom && selectedRoom.prices && selectedRoom.prices.length > 0) {
                                const occupancyOptions = [...new Set(selectedRoom.prices.map(price => price.occupancy))];
                                return occupancyOptions.map(occupancy => (
                                  <option key={occupancy} value={occupancy}>
                                    {occupancy} {occupancy === 1 ? t('form.adult') : t('form.adults_plural')}
                                  </option>
                                ));
                              }
                            }
                            
                            return [1, 2, 3, 4].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? t('form.adult') : t('form.adults_plural')}</option>
                            ));
                          })()}
                        </select>
                        {formData.roomTypeId && (
                          <p className="mt-1 text-xs text-gray-500">
                            <FaInfoCircle className="inline mr-1" />
                            {t('summary.price_info')}
                          </p>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">{t('form.children')}</label>
                        <select
                          id="children"
                          name="children"
                          value={formData.children}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {(() => {
                            let maxAllowedChildren = 10;
                            let isUnlimitedExtraBeds = false;
                            
                            if (formData.roomTypeId) {
                              const selectedRoom = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                              if (selectedRoom) {
                                if (selectedRoom.max_extra_beds === null) {
                                  isUnlimitedExtraBeds = true;
                                  maxAllowedChildren = Math.max(20, formData.children);
                                } else if (selectedRoom.max_extra_beds !== undefined) {
                                  maxAllowedChildren = selectedRoom.max_extra_beds;
                                }
                              }
                            }
                            
                            const options = [];
                            for (let i = 0; i <= maxAllowedChildren; i++) {
                              options.push(
                                <option key={i} value={i}>{i} {i === 1 ? t('form.child') : t('form.children_plural')}</option>
                              );
                            }
                            return options;
                          })()}
                        </select>
                        {formData.roomTypeId && (
                          <p className="mt-1 text-xs text-gray-500">
                            <FaInfoCircle className="inline mr-1" />
                            {(() => {
                              if (formData.roomTypeId) {
                                const selectedRoom = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                                if (selectedRoom) {
                                  if (selectedRoom.max_extra_beds === null) {
                                    return t('form.unlimited_extra_beds');
                                  } else if (selectedRoom.max_extra_beds !== undefined) {
                                    if (selectedRoom.max_extra_beds === 0) {
                                      return t('form.extra_bed_not_available');
                                    }
                                    return t('form.extra_bed_limit', { count: selectedRoom.max_extra_beds });
                                  }
                                }
                              }
                              return '';
                            })()}
                          </p>
                        )}
                      </div>
                    </div>
                    </div>
                    
                  {formData.children > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">{t('form.children_ages')}</h3>
                      <div className="bg-blue-50 p-3 rounded-md mb-4">
                        <p className="text-sm text-gray-700">
                          <FaInfoCircle className="inline mr-1 text-blue-500" />
                          {t('form.child_age_info')}
                          {formData.roomTypeId && (() => {
                            const selectedRoom = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                            if (selectedRoom) {
                              if (selectedRoom.max_extra_beds !== null && selectedRoom.max_extra_beds !== undefined) {
                                const maxExtraBeds = selectedRoom.max_extra_beds;
                                if (maxExtraBeds === 0) return ` ${t('form.extra_bed_not_available')}`;
                                if (maxExtraBeds < formData.children) {
                                  return ` ${t('form.extra_bed_limit_exceeded', { count: maxExtraBeds, selected: formData.children })}`;
                                }
                                return ` ${t('form.extra_bed_limit', { count: maxExtraBeds })}`;
                              } else {
                                return " Uşaqlar üçün əlavə çarpayı limiti yoxdur.";
                              }
                            }
                            return "";
                          })()}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.childrenAges.map((age, index) => (
                          <div key={index}>
                            <label htmlFor={`childAge_${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                              {t('form.child_age', { index: index + 1 })}
                            </label>
                            <select
                              id={`childAge_${index}`}
                              name={`childAge_${index}`}
                              value={age}
                          onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {[...Array(17)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1} {t('form.years')}</option>
                              ))}
                            </select>
                      </div>
                        ))}
                    </div>
                  </div>
                  )}
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('form.date_selection')}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">{t('form.check_in')}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaCalendarAlt />
                        </span>
                        <input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.checkIn ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                      {errors.checkIn && <p className="mt-1 text-sm text-red-500">{errors.checkIn}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">{t('form.check_out')}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaCalendarAlt />
                        </span>
                        <input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.checkOut ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                      {errors.checkOut && <p className="mt-1 text-sm text-red-500">{errors.checkOut}</p>}
                    </div>
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">{t('form.treatment_selection')}</label>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="with-treatment"
                            name="withTreatment"
                            checked={formData.withTreatment}
                          onChange={() => {
                            setFormData({...formData, withTreatment: true});
                            setPriceUpdateTrigger(prev => prev + 1);
                          }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                        <label htmlFor="with-treatment" className="ml-2 text-gray-700">{t('form.with_treatment')}</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="without-treatment"
                            name="withTreatment"
                            checked={!formData.withTreatment}
                          onChange={() => {
                            setFormData({...formData, withTreatment: false});
                            setPriceUpdateTrigger(prev => prev + 1);
                          }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                        <label htmlFor="without-treatment" className="ml-2 text-gray-700">{t('form.without_treatment')}</label>
                        </div>
                      </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">{t('form.personal_info')}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">{t('form.first_name')}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder={t('form.first_name')}
                        />
                      </div>
                      {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">{t('form.last_name')}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder={t('form.last_name')}
                        />
                      </div>
                      {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="sizin@email.com"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('form.phone')}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaPhone />
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="+994 XX XXX XX XX"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">{t('form.special_requests')}</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('form.special_requests_placeholder')}
                    ></textarea>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="termsAccepted"
                          name="termsAccepted"
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className={`h-4 w-4 rounded text-blue-600 focus:ring-blue-500 ${errors.termsAccepted ? 'border-red-400' : ''}`}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                          {t('form.terms_acceptance')}
                        </label>
                        <p className="text-gray-500">{t('form.terms_description')}</p>
                        {errors.termsAccepted && <p className="mt-1 text-sm text-red-500">{errors.termsAccepted}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-8">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">{t('form.booking_info')}</h3>
                        <p className="text-sm text-gray-600">
                          {t('form.booking_info_message')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors font-medium text-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('form.sending')}
                      </span>
                    ) : (
                      t('form.submit')
                    )}
                  </button>
                  
                  {errors.submit && (
                    <p className="mt-3 text-center text-red-500">{errors.submit}</p>
                  )}
                </form>
              )}
            </div>
            
            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{t('summary.title')}</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.sanatorium')}</span>
                    <span className="font-medium text-gray-800">{sanatorium.name}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.check_in')}</span>
                    <span className="font-medium text-gray-800">
                      {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString() : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.check_out')}</span>
                    <span className="font-medium text-gray-800">
                      {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString() : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.nights')}</span>
                    <span className="font-medium text-gray-800">{nights > 0 ? `${nights} ${nights === 1 ? t('summary.night') : t('summary.nights_plural')}` : '-'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.guests')}</span>
                    <span className="font-medium text-gray-800">
                      {formData.adults} {formData.adults === 1 ? t('form.adult') : t('form.adults_plural')}{formData.children > 0 ? `, ${formData.children} ${formData.children === 1 ? t('form.child') : t('form.children_plural')}` : ''}
                    </span>
                  </div>
                  
                  {formData.children > 0 && (
                  <div className="flex justify-between">
                      <span className="text-gray-600">{t('summary.children_ages')}</span>
                      <span className="font-medium text-gray-800">
                        {formData.childrenAges.join(', ')} {t('form.years')}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.room_type')}</span>
                    <span className="font-medium text-gray-800">
                      {formData.roomTypeId 
                        ? sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString())?.name || '-'
                        : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.treatment')}</span>
                    <span className="font-medium text-gray-800">
                      {formData.withTreatment ? t('form.with_treatment') : t('form.without_treatment')}
                    </span>
                  </div>
                </div>
                
                {formData.roomTypeId && nights > 0 && (
                  <div className="border-t pt-4 mt-4" key={`total-${formData.adults}-${formData.roomTypeId}-${nights}-${priceUpdateTrigger}`}>
                    <h3 className="font-semibold mb-3 text-gray-800">{t('summary.estimated_price')}</h3>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span>{t('summary.room_price', { nights, adults: formData.adults })}</span>
                        <span className="font-medium">
                          {(() => {
                            const room = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                            if (!room) return '-';
                            
                            const roomPricePerNight = getRoomPrice(room);
                            if (roomPricePerNight === null) {
                              return <span className="text-red-500">{t('summary.price_not_available')}</span>;
                            }
                            
                            const totalPrice = roomPricePerNight * nights;
                            return formatPrice(totalPrice.toString());
                          })()}
                        </span>
                      </div>
                      
                      {formData.children > 0 && (() => {
                        const room = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                        if (!room) return null;
                        
                        const extraBedCost = calculateExtraBedPrices(room);
                        if (extraBedCost <= 0) return null;
                        
                        return (
                        <div className="flex justify-between">
                            <span>{t('summary.extra_beds', { nights, children: formData.children })}</span>
                          <span className="font-medium">
                              {formatPrice((extraBedCost * nights).toString())}
                          </span>
                        </div>
                        );
                      })()}
                    </div>
                    
                    <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-dashed">
                      <span>{t('summary.total')}</span>
                      <span>
                        {(() => {
                          const room = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                          if (!room) return '-';
                          
                          const roomPricePerNight = getRoomPrice(room);
                          if (roomPricePerNight === null) return '-';
                          
                          const extraBedCost = calculateExtraBedPrices(room);
                          const totalPrice = (roomPricePerNight * nights) + (extraBedCost * nights);
                          
                          return formatPrice(totalPrice.toString());
                        })()}
                      </span>
                    </div>
                  </div>
                )}
                
                {formData.roomTypeId && !formData.checkIn && !formData.checkOut && (
                  <div className="border-t pt-4 mt-4" key={`price-${formData.adults}-${formData.roomTypeId}-${priceUpdateTrigger}`}>
                    <h3 className="font-semibold mb-3 text-gray-800">{t('summary.price_info')}</h3>
                    <div className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">{t('summary.nightly_price', { adults: formData.adults })}</span> {(() => {
                        const room = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                        const price = room ? getRoomPrice(room) : null;
                        
                        if (price === null) {
                          return <span className="text-red-500">{t('summary.price_not_available')}</span>;
                        }
                        
                        return formatPrice(price.toString());
                      })()}
                    </div>
                    
                    {formData.children > 0 && (() => {
                      const room = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                      if (!room) return null;
                      
                      const extraBedCost = calculateExtraBedPrices(room);
                      const childrenWithoutBed = formData.childrenAges.filter(age => {
                        const extraBedPrice = getExtraBedPrice(room, age);
                        return extraBedPrice === null;
                      });
                      
                      if (extraBedCost <= 0 && childrenWithoutBed.length === 0) return null;
                      
                      return (
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">{t('summary.extra_beds', { children: formData.children })}</span> {formatPrice(extraBedCost.toString())}
                          {childrenWithoutBed.length > 0 && (
                            <div className="text-xs text-amber-600 mt-1">
                              <FaInfoCircle className="inline mr-1" />
                              {childrenWithoutBed.length === formData.children 
                                ? t('summary.child_price_not_found')
                                : t('summary.child_price_not_found')}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="flex flex-col gap-1">
                              {formData.childrenAges.map((age, index) => {
                                const extraBedPrice = getExtraBedPrice(room, age);
                                if (extraBedPrice === null) return (
                                  <div key={index} className="flex justify-between">
                                    <span>{t('form.child_age', { index: index + 1 })} ({age} {t('form.years')}):</span>
                                    <span className="text-amber-600">{t('summary.child_price_not_found')}</span>
                                  </div>
                                );
                                return (
                                  <div key={index} className="flex justify-between">
                                    <span>{t('form.child_age', { index: index + 1 })} ({age} {t('form.years')}):</span>
                                    <span>{formatPrice(extraBedPrice.price.toString())}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    
                    {(() => {
                      const room = sanatorium.room_types.find(r => r.id.toString() === formData.roomTypeId.toString());
                      if (!room) return null;
                      
                      const roomPrice = getRoomPrice(room);
                      if (roomPrice === null) return null;
                      
                      const extraBedCost = calculateExtraBedPrices(room);
                      if (extraBedCost <= 0) return null;
                      
                      return (
                        <div className="text-sm font-semibold text-gray-800 mt-2 pt-2 border-t border-dashed">
                          <div className="flex justify-between">
                            <span>{t('summary.total_nightly')}</span>
                            <span>{formatPrice((roomPrice + extraBedCost).toString())}</span>
                          </div>
                        </div>
                      );
                    })()}
                    
                    <p className="text-sm text-gray-600 mt-2">
                      {t('summary.price_will_be_shown')}
                    </p>
                  </div>
                )}
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                  <p className="text-sm text-gray-700 text-center">
                    {t('summary.contact_after_booking')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('why_choose_us.title')}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              {t('why_choose_us.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('why_choose_us.items.simple.title'),
                description: t('why_choose_us.items.simple.description')
              },
              {
                title: t('why_choose_us.items.personal.title'),
                description: t('why_choose_us.items.personal.description')
              },
              {
                title: t('why_choose_us.items.flexible.title'),
                description: t('why_choose_us.items.flexible.description')
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUpVariant}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 