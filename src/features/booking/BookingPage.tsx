// Ultra-Modern Booking Page with Premium UI/UX
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
  FaCheck,
  FaHotel,
  FaBed,
  FaRulerCombined,
  FaChild,
  FaMoneyBillWave,
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaCar,
  FaSwimmingPool,
  FaMoon,
} from "react-icons/fa";
import { createBooking } from "@/lib/services/booking.service";
import { BookingRequestData } from "@/lib/types/booking.type";
import { Room, SanatoriumDetail } from "@/lib/types/sanatorium.type";
import { useCurrencyStore } from "@/lib/store/useCurrencyStore";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import DateRangePicker from "@/components/ui/inputs/DateRangePicker";
import GuestSelector from "@/components/ui/inputs/GuestSelector";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";

interface Props {
  room: Room;
}

// Add a schema for validation (minimal, like ReservationPage)
const bookingSchema = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  adults: 1,
  children: 0,
  childrenAges: [] as number[],
  with_treatment: false,
  special_requests: "",
};

// Modern ve animasyonlu Modal Componenti
function InfoModal({ open, onClose, onAutoRedirect, email, t }: { open: boolean; onClose: () => void; onAutoRedirect: () => void; email?: string; t: any }) {
  // useEffect(() => {
  //   if (!open) return;
  //   const timeout = setTimeout(() => {
  //     onAutoRedirect();
  //   }, 5000);
  //   return () => clearTimeout(timeout);
  // }, [open, onAutoRedirect]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-gradient-to-br from-blue-200/60 via-white/80 to-purple-200/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative animate-fade-in border border-blue-100">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg animate-bounce-in">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" fill="currentColor" fillOpacity="0.15" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">{t('success.title')}</h2>
        <p className="text-gray-700 text-lg mb-6">
          {email ? t('success.message', { email }) : t('success.message')}
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
        >
          {t('success.back_to_home')}
        </button>
      </div>
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; }
        .animate-fade-in { animation: fade-in 0.4s ease; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

export default function BookingPage({ room }: Props) {
  const t = useTranslations("booking");
  const { formatPrice } = useCurrencyStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Use react-hook-form for the form state
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...bookingSchema,
      with_treatment: room.price_info?.with_treatment ?? false,
      checkIn: searchParams.get("check_in") || "",
      checkOut: searchParams.get("check_out") || "",
      adults: searchParams.get("occupancy")
        ? Number(searchParams.get("occupancy"))
        : 1,
      children: searchParams.get("children")
        ? Number(searchParams.get("children"))
        : 0,
      childrenAges: searchParams.get("children_ages")
        ? searchParams.get("children_ages")!.split(",").map(Number)
        : [],
      special_requests: "",
    },
  });

  // Watch values for summary card
  const form = watch();

  // Helper to update URL params without submitting form
  const updateUrlParams = (
    params: Record<string, string | number | undefined>
  ) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        urlParams.set(key, String(value));
      } else {
        urlParams.delete(key);
      }
    });
    router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const bookingData: BookingRequestData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        check_in_date: data.checkIn,
        check_out_date: data.checkOut,
        adults: data.adults,
        children: data.children,
        room_type: room.id,
        sanatorium: room.sanatorium.id,
        with_treatment: data.with_treatment,
        special_requests: data.special_requests || null,
        season: room.price_info?.season ?? 1,
        treatment_option: null,
        price: room.price_info?.price?.toString() ?? "0",
        discounted_price: room.price_info?.discount?.discounted_price?.toString() ?? room.price_info?.price?.toString() ?? "0",
        discount_type: room.price_info?.discount?.discount_type === 'percentage'
          ? 'percent'
          : room.price_info?.discount?.discount_type === 'fixed'
          ? 'amount'
          : null,
        discount_value: room.price_info?.discount?.discount_value?.toString() ?? undefined,
        total_discounted_price: room.price_info?.total_discounted_price?.toString() ?? room.price_info?.total_price?.toString() ?? "0",
        total_price: room.price_info?.total_price?.toString() ?? "0",
        currency: room.price_info?.currency?.id ?? 1,
        guests: [
          {
            first_name: data.first_name,
            last_name: data.last_name,
            gender: null,
            date_of_birth: null,
            age_category: "adult",
            is_main_guest: true,
          },
        ],
        extra_beds: [],
      };
      await createBooking(bookingData as BookingRequestData);
      setSuccess(true);
      setShowInfoModal(true);
    } catch (err: any) {
      setError(err?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    name: string,
    label: string,
    icon: React.ReactNode,
    type: string = "text",
    min?: number,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  ) => (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <span
          className={`transition-colors duration-200 ${
            focusedField === name ? "text-blue-600" : "text-gray-400"
          }`}
        >
          {icon}
        </span>
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(name)}
        onBlur={(e) => {
          setFocusedField(null);
          if (onBlur) onBlur(e);
        }}
        required
        min={min}
        className={`w-full pl-10 pr-3 py-2 bg-gray-50/50 backdrop-blur-sm border rounded-lg 
          transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 text-sm
          ${
            focusedField === name
              ? "border-blue-500 bg-white shadow-md shadow-blue-500/10"
              : "border-gray-200 hover:border-gray-300"
          }`}
        placeholder={label}
      />
    </motion.div>
  );

 

  return (
    <div className="min-h-screen pt-5 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <InfoModal
        open={showInfoModal}
        onClose={() => {
          setShowInfoModal(false);
          router.push("/");
        }}
        onAutoRedirect={() => {
          setShowInfoModal(false);
          router.push("/");
        }}
        email={form.email}
        t={t}
      />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4"
        >
          {/* Booking Form - Takes 2 columns */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-lg rounded-xl p-4 shadow border border-white/10"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Personal Information Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    {t("form.personal_info")}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Controller
                      control={control}
                      name="first_name"
                      render={({ field }) =>
                        renderInput(
                          "first_name",
                          t("first_name"),
                          <FaUser />,
                          "text",
                          undefined,
                          field.value,
                          field.onChange,
                          field.onBlur
                        )
                      }
                    />
                    <Controller
                      control={control}
                      name="last_name"
                      render={({ field }) =>
                        renderInput(
                          "last_name",
                          t("last_name"),
                          <FaUser />,
                          "text",
                          undefined,
                          field.value,
                          field.onChange,
                          field.onBlur
                        )
                      }
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) =>
                        renderInput(
                          "email",
                          t("email"),
                          <FaEnvelope />,
                          "email",
                          undefined,
                          field.value,
                          field.onChange,
                          field.onBlur
                        )
                      }
                    />
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) =>
                        renderInput(
                          "phone",
                          t("phone"),
                          <FaPhone />,
                          "text",
                          undefined,
                          field.value,
                          field.onChange,
                          field.onBlur
                        )
                      }
                    />
                  </div>
                </div>

                {/* Booking Details Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />
                    {t("form.booking_details")}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {/* DateRangePicker */}
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
                                  updateUrlParams({
                                    check_in: startDate,
                                    check_out: endDate,
                                  });
                                }}
                                className="w-full min-h-[48px]"
                                primaryColor="blue"
                                secondaryColor="blue"
                                hasError={!!errors.checkIn || !!errors.checkOut}
                              />
                              {(errors.checkIn?.message ||
                                errors.checkOut?.message) && (
                                <div className="min-h-[22px]">
                                  <p className="text-red-500 text-sm">
                                    {errors.checkIn?.message
                                      ? t(errors.checkIn.message as string)
                                      : t(errors.checkOut?.message as string)}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        />
                      )}
                    />
                    {/* GuestSelector */}
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
                                    clearErrors([
                                      "adults",
                                      "children",
                                      "childrenAges",
                                    ]);
                                    updateUrlParams({
                                      occupancy: adults,
                                      children: children,
                                      children_ages:
                                        childrenAges.length > 0
                                          ? childrenAges.join(",")
                                          : undefined,
                                    });
                                  }}
                                  errors={errors}
                                  maxAdults={room.max_capacity}
                                  maxChildren={room.max_extra_beds}
                                />
                              )}
                            />
                          )}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Treatment Option */}
                {typeof room.price_info?.with_treatment !== "undefined" && (() => {
                  // Determine disabled state
                  const disabled =
                    (!room.price_options?.some(opt => opt.with_treatment === true)) ||
                    (!room.price_options?.some(opt => opt.with_treatment === false));

                  return (
                    <motion.div
                      whileHover={disabled ? {} : { scale: 1.02 }}
                      className={`
                        bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border
                        ${disabled ? "border-gray-200 opacity-60 cursor-not-allowed" : "border-blue-100"}
                        transition-all duration-200
                      `}
                    >
                      <label
                        className={`
                          flex items-center gap-3
                          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                        `}
                      >
                        <div className="relative">
                          <input
                            disabled={disabled}
                            type="checkbox"
                            name="with_treatment"
                            checked={form.with_treatment}
                            onChange={(e) => {
                              setValue("with_treatment", e.target.checked);
                              updateUrlParams({ with_treatment: e.target.checked ? 'true' : 'false' });
                            }}
                            className="sr-only"
                          />
                          <div
                            className={`
                              w-5 h-5 rounded border flex items-center justify-center transition-all duration-200
                              ${form.with_treatment
                                ? (disabled
                                    ? "bg-blue-300 border-blue-300"
                                    : "bg-blue-600 border-blue-600")
                                : (disabled
                                    ? "border-gray-200 bg-gray-100"
                                    : "border-gray-300 bg-white")
                              }
                            `}
                          >
                            {form.with_treatment && (
                              <FaCheck className="text-white text-xs" />
                            )}
                          </div>
                        </div>
                        <div>
                          <span className={`
                            text-base font-semibold
                            ${disabled ? "text-gray-400" : "text-gray-800"}
                          `}>
                            {form.with_treatment
                              ? t("form.treatment_info")
                              : t("form.without_treatment")}
                          </span>
                          <p className={`text-xs ${disabled ? "text-gray-400" : "text-gray-600"}`}>
                            {t("form.treatment_info")}
                          </p>
                        </div>
                      </label>
                    </motion.div>
                  );
                })()}

                {/* Not (Ekstra Açıklama) Alanı */}
                <div>
                  <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.note") || "Not (Ekstra Açıklama)"}
                  </label>
                  <Controller
                    control={control}
                    name="special_requests"
                    render={({ field }) => (
                      <textarea
                        id="special_requests"
                        className="w-full min-h-[80px] p-2 border rounded-lg bg-gray-50/50 backdrop-blur-sm text-gray-800 text-sm focus:border-blue-500 focus:bg-white transition-all duration-300"
                        placeholder={t("form.note_placeholder") || "Ekstra not veya açıklama yazabilirsiniz..."}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Error/Success Messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm"
                    >
                      {t("booking_success")}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold 
                    rounded-xl shadow disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t("loading")}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaCheck />
                      {t("book_now")}
                    </div>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Summary Card - Takes 1 column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-lg rounded-xl p-4 shadow border border-white/10 sticky top-4"
            >
              {room.images.length > 0 && (
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    width={144}
                    height={144}
                    src={
                      typeof room.images[0] === "string"
                        ? room.images[0]
                        : (room.images[0] as any).image
                    }
                    alt={room.name}
                    className="w-full h-36 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-sm flex items-center gap-1">
                    <FaStar className="inline mr-1" />
                    {room.sanatorium.rating}
                  </div>
                </div>
              )}

              {/* Room Details */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {room.name}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                  {room.description}
                </p>

                <div className="border-t border-gray-200 pt-2 space-y-1">
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <FaHotel className="text-blue-500" />
                    <span className="font-semibold">{room.sanatorium.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>{room.sanatorium.address}</span>
                  </div>
                  {form.checkIn && (
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <FaCalendarAlt className="text-blue-500" />
                      <span>
                        {t("check_in")}: {form.checkIn}
                      </span>
                    </div>
                  )}
                  {form.checkOut && (
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <FaCalendarAlt className="text-blue-500" />
                      <span>
                        {t("check_out")}: {form.checkOut}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <FaUser className="text-blue-500" />
                    <span>
                      {form.adults} {t("adults")}
                    </span>
                  </div>
                  {form.children > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <FaChild className="text-blue-500" />
                      <span>
                        {form.children} {t("child")} (
                        {form.childrenAges.join(", ")})
                      </span>
                    </div>
                  )}
                </div>
                {/* Price Section */}
                <div className="rounded-2xl shadow-lg border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 pt-8 mt-3 relative overflow-hidden">
                  {/* Discount badge */}
                  {room.price_info?.discount &&
                    room.price_info.discount.discounted_price <
                      room.price_info.price && (
                      <span className="absolute top-2 right-2 bg-pink-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow z-10">
                        -{room.price_info.discount.discount_value}%
                      </span>
                    )}
                  {/* Total price and nights row */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <FaMoon className="text-blue-400 text-base" />
                      <span className="text-xs text-gray-600 font-medium">
                        {room.price_info?.nights}{" "}
                        {t("night", { count: room.price_info?.nights })}
                      </span>
                    </div>
                    {room.price_info?.total_discounted_price &&
                    room.price_info.total_discounted_price <
                      room.price_info.total_price ? (
                      <span className="flex flex-row items-end justify-end">
                        <span className="text-xs font-semibold text-gray-400 line-through">
                          {formatPrice(room.price_info.total_price)}
                        </span>
                        <span className="text-3xl font-extrabold text-blue-700 ml-2">
                          {formatPrice(room.price_info.total_discounted_price)}
                        </span>
                      </span>
                    ) : (
                      <span className="text-2xl font-extrabold text-blue-700">
                        {formatPrice(room.price_info?.total_price)}
                      </span>
                    )}
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  {/* Nightly price */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {t("nightly_price")}
                    </span>
                    {room.price_info?.discount &&
                    room.price_info.discount.discounted_price <
                      room.price_info.price ? (
                      <span className="flex flex-row items-end justify-end">
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(room.price_info.price)}
                        </span>
                        <span className="text-lg text-blue-600 font-bold ml-2">
                          {formatPrice(
                            room.price_info.discount.discounted_price
                          )}
                        </span>
                      </span>
                    ) : (
                      <span className="text-xs text-gray-700 font-semibold">
                        {formatPrice(room.price_info?.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
