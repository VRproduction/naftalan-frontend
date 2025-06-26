"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import {
  RiMapPin2Line,
  RiStarSFill,
  RiCheckLine,
  RiCloseLine,
  RiHeart3Line,
  RiImageLine,
  RiMoonClearLine,
} from "react-icons/ri";
import { SanatoriumDetail } from "@/lib/types/sanatorium.type";
import SanatoriumCard from "../common/SanatoriumCard";
import { useTranslations } from "next-intl";
import { useCurrencyStore } from "@/lib/store/useCurrencyStore";
import ImageSliderModal from "@/components/common/ImageSliderModal";
import SharePopover from "@/components/common/SharePopover";
import DateRangePicker from "@/components/ui/inputs/DateRangePicker";
import GuestSelector from "@/components/ui/inputs/GuestSelector";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadingStore } from "@/lib/store/useLoadingStore";
import MatchedRoomHorizontalCard from "./components/MatchedRoomHorizontalCard";

interface PageProps {
  sanatorium: SanatoriumDetail;
}

export default function SanatoriumDetailPage({ sanatorium }: PageProps) {
  const t = useTranslations("sanatoriums");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const validTabs = [
    "overview",
    "treatments",
    "rooms",
    "reviews",
    "reservation",
  ];
  const tabParam = searchParams.get("tab");
  const initialTab:
    | "overview"
    | "treatments"
    | "rooms"
    | "reviews"
    | "reservation" =
    tabParam && validTabs.includes(tabParam) ? (tabParam as any) : "overview";
  const [activeTab, setActiveTab] = useState<
    "overview" | "treatments" | "rooms" | "reviews" | "reservation"
  >(initialTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<
    { image: string; alt?: string }[]
  >([]);
  const [modalIndex, setModalIndex] = useState(0);
  const { formatPrice } = useCurrencyStore();
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [roomModalImages, setRoomModalImages] = useState<
    { image: string; alt?: string }[]
  >([]);
  const [roomModalIndex, setRoomModalIndex] = useState(0);
  const { setLoading } = useLoadingStore();

  // Helper to calculate nights between two dates
  const getNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // Calculate nights from URL parameters
  const checkInDate = searchParams.get("check_in");
  const checkOutDate = searchParams.get("check_out");
  const nights = getNights(checkInDate || "", checkOutDate || "");

  // Zod schema for reservation form
  const reservationSchema = z.object({
    checkIn: z.string().min(1, { message: "check_in_required" }),
    checkOut: z.string().min(1, { message: "check_out_required" }),
    adults: z.number().min(1, { message: "min_adults" }),
    children: z.number().min(0),
    childrenAges: z.array(z.number()).optional(),
  });

  type ReservationFormValues = z.infer<typeof reservationSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
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
    },
  });

  // On form submit, update the URL with form values
  const onReservationSubmit = (data: ReservationFormValues) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "reservation");
    params.set("check_in", data.checkIn);
    params.set("check_out", data.checkOut);
    params.set("occupancy", String(data.adults));
    params.set("children", String(data.children));
    if (data.childrenAges && data.childrenAges.length > 0) {
      params.set("children_ages", data.childrenAges.join(","));
    } else {
      params.delete("children_ages");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setTimeout(() => setLoading(false), 800);
  };

  // When tab changes, update URL (client only)
  const handleTabChange = (
    tab: "overview" | "treatments" | "rooms" | "reviews" | "reservation"
  ) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("tab", tab);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const openImageModal = (
    images: { image: string; alt?: string }[],
    index: number
  ) => {
    setModalImages(images);
    setModalIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const openRoomModal = (
    images: { image: string; alt?: string }[],
    index: number
  ) => {
    setRoomModalImages(images);
    setRoomModalIndex(index);
    setRoomModalOpen(true);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeRoomModal = () => {
    setRoomModalOpen(false);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "auto";
    }
  };

  if (!sanatorium) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t("not_found")}
          </h2>
          <p className="text-gray-600 mb-8">{t("not_found_description")}</p>
          <Link
            href="/sanatoriums"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t("all_sanatoriums")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav
        className="container mx-auto px-4 pt-8 pb-2 text-sm"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <li>
            <Link href="/" className="hover:text-blue-600 font-medium">
              {t("home")}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/sanatoriums/naftalan"
              className="hover:text-blue-600 font-medium"
            >
              {t("all_sanatoriums")}
            </Link>
          </li>
          <li>/</li>
          <li
            className="text-gray-800 font-semibold truncate max-w-[120px] md:max-w-md"
            title={sanatorium.name}
          >
            {sanatorium.name}
          </li>
        </ol>
      </nav>

      {/* Important Info Header */}
      <div className="container mx-auto px-4 pt-4 pb-2">
        <div className="flex justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 truncate">
              {sanatorium.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap text-gray-600 text-sm mb-1">
              <span className="inline-flex items-center gap-1">
                <RiMapPin2Line className="text-blue-500" />
                {sanatorium.location.region}, {sanatorium.location.country}
              </span>
              {sanatorium.rating && (
                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium text-xs">
                  <RiStarSFill className="text-yellow-400" />
                  {sanatorium.rating}
                </span>
              )}
            </div>
          </div>
          {/* Desktop: Share button in header */}
          <div className="flex gap-2 items-center mt-0 relative">
            <SharePopover
              url={typeof window !== "undefined" ? window.location.href : ""}
              title={sanatorium.name}
            />
          </div>
        </div>
      </div>

      {/* Add custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[2.4fr_1fr] gap-6">
          {/* Left Column - Images */}
          <div className="w-full">
            {/* Responsive gallery: mobile = big image + horizontal thumbnails, desktop = grid */}
            {sanatorium.images && sanatorium.images.length > 0 && (
              <div className="w-full mb-8">
                {/* 1 resim: tam genişlikte büyük görsel */}
                {sanatorium.images.length === 1 && (
                  <div
                    className="relative w-full aspect-[2/1] md:min-h-[420px] rounded-xl shadow-lg overflow-hidden cursor-pointer"
                    onClick={() =>
                      openImageModal(
                        [
                          {
                            image: sanatorium.images[0].image,
                            alt: sanatorium.name,
                          },
                        ],
                        0
                      )
                    }
                  >
                    <Image
                      src={sanatorium.images[0].image}
                      alt={sanatorium.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                )}
                {/* 2 resim: yan yana iki büyük görsel */}
                {sanatorium.images.length === 2 && (
                  <div className="grid grid-cols-2 gap-3">
                    {sanatorium.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[2/1] md:min-h-[420px] rounded-xl shadow-lg overflow-hidden cursor-pointer"
                        onClick={() =>
                          openImageModal(
                            sanatorium.images.map((img) => ({
                              image: img.image,
                              alt: sanatorium.name,
                            })),
                            idx
                          )
                        }
                      >
                        <Image
                          src={img.image}
                          alt={`${sanatorium.name} - ${idx + 1}`}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {/* 3 resim: masaüstü sol büyük, sağda üst/alt iki küçük; mobil üstte büyük, altta iki küçük yan yana */}
                {sanatorium.images.length === 3 && (
                  <>
                    {/* Mobil */}
                    <div className="block md:hidden">
                      <div
                        className="relative w-full aspect-[2/1] rounded-xl shadow-lg overflow-hidden mb-2 cursor-pointer"
                        onClick={() =>
                          openImageModal(
                            sanatorium.images.map((img) => ({
                              image: img.image,
                              alt: sanatorium.name,
                            })),
                            0
                          )
                        }
                      >
                        <Image
                          src={sanatorium.images[0].image}
                          alt={sanatorium.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex gap-2">
                        {sanatorium.images.slice(1, 3).map((img, idx) => (
                          <div
                            key={1 + idx}
                            className="relative flex-1 aspect-[2/1] rounded-xl shadow-md overflow-hidden cursor-pointer"
                            onClick={() =>
                              openImageModal(
                                sanatorium.images.map((img) => ({
                                  image: img.image,
                                  alt: sanatorium.name,
                                })),
                                1 + idx
                              )
                            }
                          >
                            <Image
                              src={img.image}
                              alt={`${sanatorium.name} - ${1 + idx + 1}`}
                              fill
                              className="object-cover rounded-xl"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Masaüstü */}
                    <div className="hidden md:grid grid-cols-[2fr_1fr] grid-rows-2 gap-3">
                      {/* Sol büyük */}
                      <div
                        className="relative group cursor-pointer select-none row-span-2 col-span-1 min-h-[200px] md:min-h-[420px]"
                        onClick={() =>
                          openImageModal(
                            sanatorium.images.map((img) => ({
                              image: img.image,
                              alt: sanatorium.name,
                            })),
                            0
                          )
                        }
                      >
                        <Image
                          src={sanatorium.images[0].image}
                          alt={sanatorium.name}
                          fill
                          className="object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Sağ üst küçük */}
                      <div
                        className="relative group cursor-pointer select-none col-start-2 row-start-1 h-28 md:h-52"
                        onClick={() =>
                          openImageModal(
                            sanatorium.images.map((img) => ({
                              image: img.image,
                              alt: sanatorium.name,
                            })),
                            1
                          )
                        }
                      >
                        <Image
                          src={sanatorium.images[1].image}
                          alt={`${sanatorium.name} - 2`}
                          fill
                          className="object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Sağ alt küçük */}
                      <div
                        className="relative group cursor-pointer select-none col-start-2 row-start-2 h-28 md:h-52"
                        onClick={() =>
                          openImageModal(
                            sanatorium.images.map((img) => ({
                              image: img.image,
                              alt: sanatorium.name,
                            })),
                            2
                          )
                        }
                      >
                        <Image
                          src={sanatorium.images[2].image}
                          alt={`${sanatorium.name} - 3`}
                          fill
                          className="object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* 4+ resim: mevcut grid/thumbnails yapısı */}
                {sanatorium.images.length > 3 && (
                  <>
                    {/* Mobile: big image + horizontal thumbnails */}
                    <div className="block md:hidden">
                      <div
                        className="relative w-full aspect-[2/1] rounded-xl shadow-lg overflow-hidden mb-2 cursor-pointer"
                        onClick={() =>
                          openImageModal(
                            sanatorium.images.map((img) => ({
                              image: img.image,
                              alt: sanatorium.name,
                            })),
                            0
                          )
                        }
                      >
                        <Image
                          src={sanatorium.images[0].image}
                          alt={sanatorium.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {sanatorium.images.slice(1, 6).map((img, idx) => {
                          const isLast =
                            idx === 4 && sanatorium.images.length > 6;
                          return (
                            <div
                              key={1 + idx}
                              className="relative group cursor-pointer select-none h-16 w-24 flex-shrink-0"
                              onClick={() =>
                                openImageModal(
                                  sanatorium.images.map((img) => ({
                                    image: img.image,
                                    alt: sanatorium.name,
                                  })),
                                  1 + idx
                                )
                              }
                            >
                              <Image
                                src={img.image}
                                alt={`${sanatorium.name} - ${1 + idx + 1}`}
                                fill
                                className="object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                              />
                              {isLast && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
                                  <span className="text-white text-base font-bold">
                                    +{sanatorium.images.length - 6} {t("photo")}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Desktop: grid */}
                    <div className="hidden md:block">
                      <div className="grid grid-cols-[2fr_1fr] grid-rows-2 gap-3">
                        {/* 1st image: big, left, spans 2 rows */}
                        <div
                          className="relative group cursor-pointer select-none row-span-2 col-span-1 min-h-[200px] md:min-h-[420px]"
                          onClick={() =>
                            openImageModal(
                              sanatorium.images.map((img) => ({
                                image: img.image,
                                alt: sanatorium.name,
                              })),
                              0
                            )
                          }
                        >
                          <Image
                            src={sanatorium.images[0].image}
                            alt={sanatorium.name}
                            fill
                            className="object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {/* 2nd image: top right, now more narrow */}
                        {sanatorium.images[1] && (
                          <div
                            className="relative group cursor-pointer select-none col-start-2 row-start-1 h-28 md:h-52"
                            onClick={() =>
                              openImageModal(
                                sanatorium.images.map((img) => ({
                                  image: img.image,
                                  alt: sanatorium.name,
                                })),
                                1
                              )
                            }
                          >
                            <Image
                              src={sanatorium.images[1].image}
                              alt={`${sanatorium.name} - 2`}
                              fill
                              className="object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        {/* 3rd image: bottom right, now more narrow, +N overlay if more images */}
                        {sanatorium.images[2] && (
                          <div
                            className="relative group cursor-pointer select-none col-start-2 row-start-2 h-28 md:h-52"
                            onClick={() =>
                              openImageModal(
                                sanatorium.images.map((img) => ({
                                  image: img.image,
                                  alt: sanatorium.name,
                                })),
                                2
                              )
                            }
                          >
                            <Image
                              src={sanatorium.images[2].image}
                              alt={`${sanatorium.name} - 3`}
                              fill
                              className="object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                            {sanatorium.images.length > 3 &&
                              sanatorium.images.length < 8 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
                                  <span className="text-white text-xl font-bold">
                                    +{sanatorium.images.length - 3} {t("photo")}
                                  </span>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                      {/* Bottom row: only show if there are at least 4 images in the bottom row (i.e. sanatorium.images.length >= 8) */}
                      {sanatorium.images.length >= 8 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 w-full">
                          {sanatorium.images.slice(3, 7).map((img, idx) => {
                            const isLast =
                              idx === 3 && sanatorium.images.length > 7;
                            return (
                              <div
                                key={3 + idx}
                                className="relative group cursor-pointer select-none h-20 md:h-32 w-full"
                                onClick={() =>
                                  openImageModal(
                                    sanatorium.images.map((img) => ({
                                      image: img.image,
                                      alt: sanatorium.name,
                                    })),
                                    3 + idx
                                  )
                                }
                              >
                                <Image
                                  src={img.image}
                                  alt={`${sanatorium.name} - ${3 + idx + 1}`}
                                  fill
                                  className="object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                                />
                                {isLast && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
                                    <span className="text-white text-xl font-bold">
                                      +{sanatorium.images.length - 7}{" "}
                                      {t("photo")}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Tabs */}
            <div className="mb-8">
              <div
                className="flex overflow-x-auto gap-2 border-b border-gray-200 no-scrollbar px-1 sm:px-0"
                role="tablist"
                aria-label="Sanatorium Tabs"
              >
                <button
                  className={`flex-shrink-0 px-4 md:px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 rounded-t-lg ${
                    activeTab === "overview"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-200"
                  }`}
                  onClick={() => handleTabChange("overview")}
                  role="tab"
                  aria-selected={activeTab === "overview"}
                  tabIndex={activeTab === "overview" ? 0 : -1}
                >
                  {t("overview")}
                </button>
                <button
                  className={`flex-shrink-0 px-4 md:px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 rounded-t-lg ${
                    activeTab === "reservation"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-200"
                  }`}
                  onClick={() => handleTabChange("reservation")}
                  role="tab"
                  aria-selected={activeTab === "reservation"}
                  tabIndex={activeTab === "reservation" ? 0 : -1}
                >
                  {t("reservation")}
                </button>
                <button
                  className={`flex-shrink-0 px-4 md:px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 rounded-t-lg ${
                    activeTab === "treatments"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-200"
                  }`}
                  onClick={() => handleTabChange("treatments")}
                  role="tab"
                  aria-selected={activeTab === "treatments"}
                  tabIndex={activeTab === "treatments" ? 0 : -1}
                >
                  {t("treatments")}
                </button>
                <button
                  className={`flex-shrink-0 px-4 md:px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 rounded-t-lg ${
                    activeTab === "rooms"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-200"
                  }`}
                  onClick={() => handleTabChange("rooms")}
                  role="tab"
                  aria-selected={activeTab === "rooms"}
                  tabIndex={activeTab === "rooms" ? 0 : -1}
                >
                  {t("rooms")}
                </button>
                <button
                  className={`flex-shrink-0 px-4 md:px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 rounded-t-lg ${
                    activeTab === "reviews"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-200"
                  }`}
                  onClick={() => handleTabChange("reviews")}
                  role="tab"
                  aria-selected={activeTab === "reviews"}
                  tabIndex={activeTab === "reviews" ? 0 : -1}
                >
                  {t("reviews")} ({sanatorium.reviews?.length || 0})
                </button>
              </div>
            </div>

            <div className="mt-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">{t("about")}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanatorium.description,
                    }}
                    className="custom-html-content text-gray-700 mb-6"
                  ></div>

                  <h3 className="text-lg font-semibold mb-3">
                    {t("services_facilities")}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 mb-6">
                    {sanatorium.facilities?.map((facility, index) => (
                      <div key={index} className="flex items-center">
                        <RiCheckLine className="text-green-500 mr-2" />
                        <span className="text-gray-600">
                          {facility.facility.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-3">
                    {t("location")}
                  </h3>
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <p className="text-gray-700 mb-2">
                      <strong>{t("address")}:</strong> {sanatorium.address}
                    </p>
                  </div>

                  <div className="h-[400px] rounded-xl overflow-hidden shadow-md mb-10">
                    <iframe
                      src={sanatorium.map_iframe}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>{" "}
                  </div>
                </div>
              )}

              {activeTab === "treatments" && (
                <div
                  dangerouslySetInnerHTML={{ __html: sanatorium.treatments }}
                  className="custom-html-content max-w-none text-gray-700"
                ></div>
              )}

              {activeTab === "rooms" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">{t("rooms")}</h2>
                  <div className="space-y-8">
                    {sanatorium.room_types &&
                    sanatorium.room_types.length > 0 ? (
                      sanatorium.room_types.map((roomType) => (
                        <div
                          key={roomType.id}
                          className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                          <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              {roomType.name}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                {roomType.min_capacity &&
                                  roomType.max_capacity && (
                                    <p className="text-gray-600">
                                      <strong>{t("capacity")}:</strong>{" "}
                                      {roomType.min_capacity}-
                                      {roomType.max_capacity} {t("person")}
                                    </p>
                                  )}
                                {roomType.max_extra_beds &&
                                roomType.max_extra_beds > 0 ? (
                                  <p className="text-gray-600">
                                    <strong>{t("extra_beds")}:</strong>{" "}
                                    {t("max")} {roomType.max_extra_beds}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {roomType.size && (
                                  <p className="text-gray-600">
                                    <strong>{t("area")}:</strong>{" "}
                                    {roomType.size} m²
                                  </p>
                                )}
                              </div>
                              {roomType.description && (
                                <div>
                                  <p className="text-gray-600">
                                    {roomType.description}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Room Images */}
                            {roomType.images && roomType.images.length > 0 && (
                              <div className="mb-6">
                                <div className="grid grid-cols-4 gap-2">
                                  {roomType.images.map((image, index) => (
                                    <div
                                      key={index}
                                      className="relative h-24 cursor-pointer rounded-md overflow-hidden"
                                      onClick={() =>
                                        openImageModal(
                                          roomType.images.map((img) => ({
                                            image: img.image,
                                            alt: roomType.name,
                                          })),
                                          index
                                        )
                                      }
                                    >
                                      <Image
                                        src={image.image}
                                        alt={`${roomType.name} - ${index + 1}`}
                                        fill
                                        className="object-cover hover:opacity-75 transition-opacity"
                                        onError={(e) => {
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.src = "/placeholder-image.jpg";
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Prices */}
                            {roomType.prices && roomType.prices.length > 0 && (
                              <div>
                                <h4 className="text-md font-semibold mb-3">
                                  {t("prices")}
                                </h4>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          {t("season")}
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          {t("occupancy")}
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          {t("treatment")}
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          {t("price")}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {roomType.prices.map((price, idx) => (
                                        <tr
                                          key={idx}
                                          className={
                                            idx % 2 === 0
                                              ? "bg-gray-50"
                                              : "bg-white"
                                          }
                                        >
                                          <td className="px-4 py-3 text-sm text-gray-900">
                                            {price.season ? (
                                              <>
                                                <div className="flex flex-col">
                                                  <span className="font-semibold">{price.season.name}</span>
                                                  {price.season.start_date && price.season.end_date && (
                                                    <span className="text-xs text-gray-500 mt-0.5">
                                                      {price.season.start_date} &ndash; {price.season.end_date}
                                                    </span>
                                                  )}
                                                </div>
                                                {price.season.is_current && (
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {t("current")}
                                                  </span>
                                                )}
                                              </>
                                            ) : (
                                              t("general")
                                            )}
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-900">
                                            {price.occupancy} {t("person")}
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-900">
                                            {price.with_treatment ? (
                                              <>
                                                <RiCheckLine className="inline text-green-500 mr-1" />
                                                {price.treatment_option?.name ||
                                                  t("with_treatment")}
                                              </>
                                            ) : (
                                              <>
                                                <RiCloseLine className="inline text-red-500 mr-1" />
                                                {t("without_treatment")}
                                              </>
                                            )}
                                          </td>
                                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                            {typeof price.discounted_price !==
                                              "undefined" &&
                                            price.discounted_price <
                                              price.price ? (
                                              <div className="flex flex-row items-center gap-2">
                                                <span className="text-gray-400 line-through text-xs">
                                                  {formatPrice(price.price)}
                                                </span>
                                                <span className="text-green-700 font-bold text-base">
                                                  {formatPrice(
                                                    price.discounted_price
                                                  )}
                                                </span>
                                                {price.discount_value && (
                                                  <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                                                    -
                                                    {price.discount_type ===
                                                    "percentage"
                                                      ? `${price.discount_value}%`
                                                      : formatPrice(
                                                          price.discount_value
                                                        )}
                                                  </span>
                                                )}
                                              </div>
                                            ) : (
                                              <span className="font-bold text-blue-800 text-base">
                                                {formatPrice(price.price)}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                {/* Extra Bed Prices */}
                                {roomType.extra_bed_prices.length > 0 && (
                                  <div className="mt-6">
                                    <h5 className="text-md font-semibold mb-3">
                                      {t("extra_bed_prices")}
                                    </h5>
                                    <div className="overflow-x-auto">
                                      <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              {t("season")}
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              {t("age_group")}
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              {t("treatment")}
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              {t("price")}
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                          {roomType.extra_bed_prices.map(
                                            (price, idx) => (
                                              <tr
                                                key={idx}
                                                className={
                                                  idx % 2 === 0
                                                    ? "bg-gray-50"
                                                    : "bg-white"
                                                }
                                              >
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                  {price.season ? (
                                                    <>
                                                      {price.season.name} {price.season.start_date} {price.season.end_date}
                                                      {price.season
                                                        .is_current && (
                                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                          {t("current")}
                                                        </span>
                                                      )}
                                                    </>
                                                  ) : (
                                                    t("general")
                                                  )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                  {price.age_group.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                  {price.with_treatment ? (
                                                    <>
                                                      <RiCheckLine className="inline text-green-500 mr-1" />
                                                      {price.treatment_option
                                                        ?.name ||
                                                        t("with_treatment")}
                                                    </>
                                                  ) : (
                                                    <>
                                                      <RiCloseLine className="inline text-red-500 mr-1" />
                                                      {t("without_treatment")}
                                                    </>
                                                  )}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                  {typeof price.discounted_price !==
                                                    "undefined" &&
                                                  price.discounted_price <
                                                    price.price ? (
                                                    <div className="flex flex-row items-center gap-2">
                                                      <span className="text-gray-400 line-through text-xs">
                                                        {formatPrice(
                                                          price.price
                                                        )}
                                                      </span>
                                                      <span className="text-green-700 font-bold text-base">
                                                        {formatPrice(
                                                          price.discounted_price
                                                        )}
                                                      </span>
                                                      {price.discount_value &&
                                                        price.discount_value >
                                                          0 && (
                                                          <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                                                            -
                                                            {price.discount_type ===
                                                            "percentage"
                                                              ? `${price.discount_value}%`
                                                              : formatPrice(
                                                                  price.discount_value
                                                                )}
                                                          </span>
                                                        )}
                                                    </div>
                                                  ) : (
                                                    <span className="font-bold text-blue-800 text-base">
                                                      {formatPrice(price.price)}
                                                    </span>
                                                  )}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">{t("no_rooms")}</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    {t("customer_reviews")}
                  </h2>

                  <div className="space-y-6">
                    {sanatorium.reviews && sanatorium.reviews.length > 0 ? (
                      sanatorium.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-start gap-4 mb-3">
                            <div>
                              <h4 className="font-medium">
                                {review.full_name}
                              </h4>
                              <div className="flex items-center">
                                <div className="flex mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <RiStarSFill
                                      key={i}
                                      className={
                                        i < review.rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {review.date
                                    ? new Date(review.date).toLocaleDateString(
                                        "az-AZ"
                                      )
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">{t("no_reviews")}</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "reservation" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    {t("make_reservation")}
                  </h2>
                  {/* Reservation Form with react-hook-form and zod */}
                  <form onSubmit={handleSubmit(onReservationSubmit)}>
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Controller
                        control={control}
                        name="checkIn"
                        render={({
                          field: {
                            value: checkInValue,
                            onChange: onCheckInChange,
                          },
                        }) => (
                          <Controller
                            control={control}
                            name="checkOut"
                            render={({
                              field: {
                                value: checkOutValue,
                                onChange: onCheckOutChange,
                              },
                            }) => (
                              <div className="flex flex-col">
                                <DateRangePicker
                                  startDate={checkInValue}
                                  endDate={checkOutValue}
                                  onChange={(start, end) => {
                                    onCheckInChange(start);
                                    onCheckOutChange(end);
                                    clearErrors(["checkIn", "checkOut"]);
                                  }}
                                  className="w-full min-h-[48px]"
                                  primaryColor="blue"
                                  secondaryColor="blue"
                                  placeholder={`Tarix seçin`}
                                  hasError={
                                    !!errors.checkIn || !!errors.checkOut
                                  }
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
                      <Controller
                        control={control}
                        name="adults"
                        render={({
                          field: {
                            value: adultsValue,
                            onChange: onAdultsChange,
                          },
                        }) => (
                          <Controller
                            control={control}
                            name="children"
                            render={({
                              field: {
                                value: childrenValue,
                                onChange: onChildrenChange,
                              },
                            }) => (
                              <Controller
                                control={control}
                                name="childrenAges"
                                render={({
                                  field: {
                                    value: childrenAgesValue = [],
                                    onChange: onChildrenAgesChange,
                                  },
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
                                      onAdultsChange(adults);
                                      onChildrenChange(children);
                                      onChildrenAgesChange(childrenAges);
                                      clearErrors([
                                        "adults",
                                        "children",
                                        "childrenAges",
                                      ]);
                                    }}
                                    errors={errors}
                                    className="w-full min-h-[48px]"
                                  />
                                )}
                              />
                            )}
                          />
                        )}
                      />
                      <div className="flex items-start">
                        <button
                          type="submit"
                          className="w-full py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium shadow hover:from-blue-700 hover:to-blue-900 transition-all text-sm min-h-[48px]"
                        >
                          {t("search_button")}
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* End Reservation Form */}
                  {sanatorium.matched_room_types &&
                  sanatorium.matched_room_types.length > 0 ? (
                    <div className="space-y-6">
                      {sanatorium.matched_room_types.map((matched, idx) => (
                        <div key={`matched-room-${idx}`}>
                          <div className="hidden md:block">
                            <MatchedRoomHorizontalCard
                              matched={matched}
                              sanatorium={sanatorium}
                              openRoomModal={openRoomModal}
                              t={t}
                              formatPrice={formatPrice}
                              checkIn={
                                searchParams.get("check_in") || undefined
                              }
                              checkOut={
                                searchParams.get("check_out") || undefined
                              }
                              occupancy={
                                searchParams.get("occupancy")
                                  ? Number(searchParams.get("occupancy"))
                                  : undefined
                              }
                              children={
                                searchParams.get("children")
                                  ? Number(searchParams.get("children"))
                                  : undefined
                              }
                              childrenAges={
                                searchParams.get("children_ages")
                                  ? searchParams
                                      .get("children_ages")!
                                      .split(",")
                                      .map(Number)
                                  : undefined
                              }
                            />
                          </div>
                          <div className="md:hidden">
                            {/* ...existing mobile card code here... */}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-center py-8">
                      {t("no_rooms")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div>
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24 max-w-md mx-auto lg:mx-0 transition-all">
              <div className="p-4 border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>{t("price_booking")}</span>
                </h2>
                <div className="flex items-end gap-2 mb-1 flex-wrap">
                  <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-bold rounded-lg px-3 py-1 shadow tracking-wide">
                    {t("starting_price")}
                  </span>
                  
                  {/* Price display logic */}
                  {(() => {
                    const pricing = sanatorium.min_price_details?.pricing;
                    const discount = pricing?.discount;
                    const hasDiscount = discount && (discount.amount || 0) > 0;
                    
                    if (hasDiscount) {
                      const originalPrice = pricing?.total_price || pricing?.final_price || 0;
                      const discountedPrice = pricing?.total_discount_price || discount?.discounted_price || 0;
                      const discountValue = discount?.value || 0;
                      const discountType = discount?.type || 'percentage';
                      
                      return (
                        <>
                          <span className="text-base font-semibold text-gray-400 line-through">
                            {formatPrice(originalPrice)}
                          </span>
                          <span className="text-2xl font-extrabold text-blue-700 tracking-tight">
                            {formatPrice(discountedPrice)}
                          </span>
                          <span className="ml-1 text-xs font-bold bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-0.5 rounded shadow flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 14l2 2 4-4"
                              />
                            </svg>
                            -{discountType === "percentage" 
                              ? `${discountValue}%` 
                              : formatPrice(discountValue)
                            } {t("discount")}
                          </span>
                        </>
                      );
                    } else {
                      const finalPrice = pricing?.total_price || pricing?.final_price || 0;
                      return (
                        <span className="text-2xl font-extrabold text-blue-700 tracking-tight">
                          {formatPrice(finalPrice)}
                        </span>
                      );
                    }
                  })()}
                </div>
               
                {/* Nights display */}
                {checkInDate && checkOutDate && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full">
                      <RiMoonClearLine className="text-indigo-500" />
                      {nights} {nights === 1 ? t("night") : t("nights")}
                    </span>
                  </div>
                )}

                {/* Detailed Price Info */}
                {sanatorium.min_price_details && (
                  <div className="mt-3 bg-gray-50/80 rounded-lg p-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          {t("room_type")}
                        </span>
                        <span className="font-bold text-gray-800">
                          {sanatorium.min_price_details.room.name}
                        </span>
                      </li>
                      {sanatorium.min_price_details.search_criteria.occupancy > 0 ? (
                      <li className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          {t("adults")}
                        </span>
                        <span className="font-bold text-gray-800">
                          {sanatorium.min_price_details.search_criteria.occupancy}{" "}
                          {t("person")}
                        </span>
                      </li>
                        ) : null}
                      {sanatorium.min_price_details.search_criteria.children_ages.length > 0 ? (
                        <li className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">
                            {t("children")}
                          </span>
                          <span className="font-bold text-gray-800">
                            {sanatorium.min_price_details.search_criteria.children_ages.length} {" "}
                            {t("person")}
                          </span>
                        </li>
                      ) : null}
                      <li className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          {t("with_treatment")}
                        </span>
                        <span className="font-bold text-gray-800">
                          {sanatorium.min_price_details.pricing
                            .with_treatment ? (
                            <RiCheckLine className="text-green-500 text-lg" />
                          ) : (
                            <RiCloseLine className="text-red-500 text-lg" />
                          )}
                        </span>
                      </li>

                     
                      
                      {/* Per night price display */}
                      {sanatorium.min_price_details.pricing.total_price > 0 && (
                        <li className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">
                            {t("per_night")}
                          </span>
                          <span className="font-bold text-gray-800">
                            {(() => {
                              const pricing = sanatorium.min_price_details.pricing;
                              const discount = pricing?.discount;
                              const hasDiscount = discount && (discount.amount || 0) > 0;
                              
                              // Calculate per night price
                              const basePrice =  pricing.final_price || 0;
                              const perNightPrice = basePrice;
                              
                              if (hasDiscount) {
                                const discountValue = discount?.value || 0;
                                const discountType = discount?.type || 'percentage';
                                
                                let discountedPerNightPrice = perNightPrice;
                                if (discountType === 'percentage') {
                                  discountedPerNightPrice = perNightPrice * (1 - discountValue / 100);
                                } else {
                                  discountedPerNightPrice = Math.max(0, perNightPrice - discountValue);
                                }
                                
                                return (
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 line-through text-sm">
                                      {formatPrice(perNightPrice)}
                                    </span>
                                    <span className="text-green-700">
                                      {formatPrice(discountedPerNightPrice)}
                                    </span>
                                  </div>
                                );
                              } else {
                                return formatPrice(perNightPrice);
                              }
                            })()}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <div className="p-3 flex flex-col gap-2">
                {/* Calculate booking URL with all parameters */}
                {(() => {
                  const params = new URLSearchParams();
                  if (sanatorium.min_price_details?.room?.id)
                    params.set('room_type', sanatorium.min_price_details.room.id.toString());
                  params.set('sanatoriumPk', sanatorium.id.toString());
                  if (sanatorium.min_price_details?.room?.id)
                    params.set('roomPk', sanatorium.min_price_details.room.id.toString());
                  if (typeof sanatorium.min_price_details?.pricing?.with_treatment !== 'undefined')
                    params.set('with_treatment', sanatorium.min_price_details.pricing.with_treatment.toString());
                  // Add search parameters if they exist
                  if (searchParams.get("check_in")) params.set('check_in', searchParams.get("check_in")!);
                  if (searchParams.get("check_out")) params.set('check_out', searchParams.get("check_out")!);
                  if (searchParams.get("occupancy")) params.set('occupancy', searchParams.get("occupancy")!);
                  if (searchParams.get("children")) params.set('children', searchParams.get("children")!);
                  if (searchParams.get("children_ages")) params.set('children_ages', searchParams.get("children_ages")!);
                  const bookingUrl = `/booking?${params.toString()}`;
                  return (
                    <Link
                      href={bookingUrl}
                      className="block w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all text-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {t("book_now")}
                    </Link>
                  );
                })()}
                <div className="mt-2 bg-gray-50/80 border border-gray-100 rounded p-2 flex items-start gap-2 text-gray-600 text-xs">
                  <svg
                    className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                  <div>
                    <p className="mb-0.5">{t("price_note_1")}</p>
                    <p>{t("price_note_2")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Sanatoriums */}
      {sanatorium.similar_sanatoriums.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
              {t("similar_sanatoriums")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sanatorium.similar_sanatoriums.map((sanatorium) => (
                <SanatoriumCard key={sanatorium.id} sanatorium={sanatorium} />
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Image Modal */}
      <ImageSliderModal
        images={modalImages}
        isOpen={isModalOpen}
        initialIndex={modalIndex}
        onClose={() => {
          setIsModalOpen(false);
          document.body.style.overflow = "auto";
        }}
      />
      {/* Room Image Modal */}
      <ImageSliderModal
        images={roomModalImages}
        isOpen={roomModalOpen}
        initialIndex={roomModalIndex}
        onClose={closeRoomModal}
      />
    </div>
  );
}
