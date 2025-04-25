"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { SanatoriumDetail } from "@/lib/types/sanatorium.type";
import SanatoriumCard from "../common/SanatoriumCard";

interface PageProps {
  sanatorium: SanatoriumDetail;
}

export default function SanatoriumDetailPage({ sanatorium }: PageProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "treatments" | "rooms" | "reviews"
  >("overview");
  //   const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    sanatorium.images[0]?.image || null
  );
  const [selectedRoomType, setSelectedRoomType] = useState<number | null>(null);
  const [selectedRoomImage, setSelectedRoomImage] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoomType, setModalRoomType] = useState<number | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Handle keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, modalRoomType, modalImageIndex]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const openImageModal = (roomId: number, imageIndex: number) => {
    setModalRoomType(roomId);
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!modalRoomType || !sanatorium) return;

    const roomType = sanatorium.room_types?.find(
      (room) => room.id === modalRoomType
    );
    if (!roomType) return;

    const imageCount = roomType.images.length;

    if (isZoomed) {
      setIsZoomed(false);
    }

    setIsImageLoading(true);

    if (direction === "prev") {
      setModalImageIndex((modalImageIndex - 1 + imageCount) % imageCount);
    } else {
      setModalImageIndex((modalImageIndex + 1) % imageCount);
    }
  };

  const handleRoomImageClick = (
    roomId: number,
    image: string,
    index: number
  ) => {
    setSelectedRoomType(roomId);
    setSelectedRoomImage(image);
    openImageModal(roomId, index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  //   if (isLoading) {
  //     return (
  //       <div className="pt-[72px] md:pt-[80px] flex justify-center items-center h-screen">
  //         <div className="text-center">
  //           <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
  //           <p className="mt-4 text-gray-600">Məlumatlar yüklənir...</p>
  //         </div>
  //       </div>
  //     );
  //   }

  if (!sanatorium) {
    return (
      <div className="pt-[72px] md:pt-[80px] container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sanatoriya tapılmadı
          </h2>
          <p className="text-gray-600 mb-8">
            Axtardığınız sanatoriya məlumatları tapılmadı.
          </p>
          <Link
            href="/sanatoriums"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Bütün sanatoriyalar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px] md:pt-[80px]">
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {sanatorium.name}
            </h1>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-6"></div>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>
                  {sanatorium.location.region}, {sanatorium.location.country}
                </span>
              </div>
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-2" />
                <span>
                  {sanatorium.rating} ({sanatorium.reviews?.length || 0} rəy)
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className={`lg:col-span-2`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="relative h-80 w-full">
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt={sanatorium.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.jpg";
                    }}
                  />
                )}
              </div>
              {sanatorium.images && sanatorium.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 p-2">
                  {sanatorium.images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative h-20 cursor-pointer rounded-md overflow-hidden ${
                        selectedImage === image.image
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => handleImageClick(image.image)}
                    >
                      <Image
                        src={image.image}
                        alt={`${sanatorium.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${
                      activeTab === "overview"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Ümumi məlumat
                  </button>
                  <button
                    className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${
                      activeTab === "treatments"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("treatments")}
                  >
                    Müalicələr
                  </button>
                  <button
                    className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${
                      activeTab === "rooms"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("rooms")}
                  >
                    Otaqlar
                  </button>
                  <button
                    className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${
                      activeTab === "reviews"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Rəylər ({sanatorium.reviews?.length || 0})
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Haqqında</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanatorium.description,
                      }}
                      className="custom-html-content text-gray-700 mb-6"
                    ></div>

                    <h3 className="text-lg font-semibold mb-3">
                      Xidmətlər və imkanlar
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 mb-6">
                      {sanatorium.facilities?.map((facility, index) => (
                        <div key={index} className="flex items-center">
                          <FaCheck className="text-green-500 mr-2" />
                          <span className="text-gray-600">
                            {facility.facility.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold mb-3">Mövqe</h3>
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                      <p className="text-gray-700 mb-2">
                        <strong>Ünvan:</strong> {sanatorium.address}
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
                    <h2 className="text-xl font-bold mb-6">Otaqlar</h2>
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
                                        <strong>Tutum:</strong>{" "}
                                        {roomType.min_capacity}-
                                        {roomType.max_capacity} nəfər
                                      </p>
                                    )}
                                  {roomType.max_extra_beds &&
                                    roomType.max_extra_beds > 0 && (
                                      <p className="text-gray-600">
                                        <strong>Əlavə çarpayı:</strong> maksimum{" "}
                                        {roomType.max_extra_beds}
                                      </p>
                                    )}
                                  {roomType.size && (
                                    <p className="text-gray-600">
                                      <strong>Sahə:</strong> {roomType.size} m²
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
                              {roomType.images &&
                                roomType.images.length > 0 && (
                                  <div className="mb-6">
                                    <div className="grid grid-cols-4 gap-2">
                                      {roomType.images.map((image, index) => (
                                        <div
                                          key={index}
                                          className="relative h-24 cursor-pointer rounded-md overflow-hidden"
                                          onClick={() =>
                                            openImageModal(roomType.id, index)
                                          }
                                        >
                                          <Image
                                            src={image.image}
                                            alt={`${roomType.name} - ${
                                              index + 1
                                            }`}
                                            fill
                                            className="object-cover hover:opacity-75 transition-opacity"
                                            onError={(e) => {
                                              const target =
                                                e.target as HTMLImageElement;
                                              target.src =
                                                "/placeholder-image.jpg";
                                            }}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              {/* Prices */}
                              {roomType.prices &&
                                roomType.prices.length > 0 && (
                                  <div>
                                    <h4 className="text-md font-semibold mb-3">
                                      Qiymətlər
                                    </h4>
                                    <div className="overflow-x-auto">
                                      <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Mövsüm
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Tutum
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Müalicə
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Qiymət
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
                                                    {price.season.name}
                                                    {price.season
                                                      .is_current && (
                                                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Cari
                                                      </span>
                                                    )}
                                                  </>
                                                ): 'Ümumi'}
                                              </td>
                                              <td className="px-4 py-3 text-sm text-gray-900">
                                                {price.occupancy} nəfər
                                              </td>
                                              <td className="px-4 py-3 text-sm text-gray-900">
                                                {price.with_treatment ? (
                                                  <>
                                                    <FaCheck className="inline text-green-500 mr-1" />
                                                    {price.treatment_option
                                                      ?.name || "Müalicə ilə"}
                                                  </>
                                                ) : (
                                                  <>
                                                    <FaTimes className="inline text-red-500 mr-1" />
                                                    Müalicəsiz
                                                  </>
                                                )}
                                              </td>
                                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                {price.price}{" "}
                                                {price.currency.symbol}
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
                                          Əlavə çarpayı qiymətləri
                                        </h5>
                                        <div className="overflow-x-auto">
                                          <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                              <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Mövsüm
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Yaş qrupu
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Müalicə
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Qiymət
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
                                                          {price.season.name}
                                                          {price.season
                                                            .is_current && (
                                                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                              Cari
                                                            </span>
                                                          )}
                                                        </>
                                                      ): 'Ümumi'}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                      {price.age_group.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                      {price.with_treatment ? (
                                                        <>
                                                          <FaCheck className="inline text-green-500 mr-1" />
                                                          {price
                                                            .treatment_option
                                                            ?.name ||
                                                            "Müalicə ilə"}
                                                        </>
                                                      ) : (
                                                        <>
                                                          <FaTimes className="inline text-red-500 mr-1" />
                                                          Müalicəsiz
                                                        </>
                                                      )}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                      {price.price}{" "}
                                                      {price.currency.symbol}
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
                        <p className="text-gray-600">
                          Hal-hazırda otaq məlumatları mövcud deyil.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Müştəri rəyləri</h2>

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
                                      <FaStar
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
                                      ? new Date(
                                          review.date
                                        ).toLocaleDateString("az-AZ")
                                      : ""}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">
                          Hələ heç bir müştəri rəyi yoxdur.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          {sanatorium.min_price && (
            <div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold">Qiymət və rezervasiya</h2>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Başlayan qiymət:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {sanatorium.min_price} AZN
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      adam başına / gecə
                    </div>
                  </div>

                  <Link
                    href={`/booking?sanatorium_id=${
                      sanatorium.id
                    }&sanatorium_name=${encodeURIComponent(sanatorium.name)}`}
                    className="block w-full py-3 px-4 bg-blue-500 text-white text-center font-medium rounded-lg hover:bg-blue-600 transition-colors mb-4"
                  >
                    İndi rezervasiya et
                  </Link>

                  <Link
                    href="/contact"
                    className="block w-full py-3 px-4 border border-blue-500 text-blue-500 text-center font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Sual vermək
                  </Link>

                  <div className="mt-6 text-sm text-gray-500">
                    <p className="mb-2">
                      * Qiymətlər otaq tipinə və mövsümə görə dəyişə bilər
                    </p>
                    <p>
                      * Müalicə paketlərinin qiyməti əlavə olaraq hesablanır
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Sanatoriums */}
      {sanatorium.similar_sanatoriums.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
              Oxşar Sanatoriyalar
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
      <AnimatePresence>
        {isModalOpen && modalRoomType && sanatorium && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-5xl p-2 md:p-4 rounded-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-20 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all duration-200"
                onClick={closeModal}
              >
                <FaTimes size={20} />
              </button>

              <div className="absolute top-4 left-4 z-20 bg-black/40 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                {modalImageIndex + 1}/
                {sanatorium.room_types?.find(
                  (room) => room.id === modalRoomType
                )?.images.length || 0}
              </div>

              <div className="relative h-[75vh] overflow-hidden rounded-lg">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                  </div>
                )}

                {sanatorium.room_types?.find(
                  (room) => room.id === modalRoomType
                )?.images?.[modalImageIndex] && (
                  <motion.div
                    key={modalImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full w-full"
                    drag={isZoomed ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (isZoomed) return;
                      const swipe = offset.x;
                      if (swipe < -70) {
                        navigateImage("next");
                      } else if (swipe > 70) {
                        navigateImage("prev");
                      }
                    }}
                    onClick={toggleZoom}
                    style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
                  >
                    <Image
                      src={
                        sanatorium.room_types.find(
                          (room) => room.id === modalRoomType
                        )!.images[modalImageIndex].image
                      }
                      alt={
                        sanatorium.room_types.find(
                          (room) => room.id === modalRoomType
                        )!.name || "Room image"
                      }
                      fill
                      className={`transition-transform duration-300 ${
                        isZoomed ? "object-cover scale-150" : "object-contain"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                      priority
                      quality={90}
                      onLoadingComplete={() => setIsImageLoading(false)}
                      onLoad={() => setIsImageLoading(false)}
                    />
                  </motion.div>
                )}

                {/* Navigation buttons */}
                {!isZoomed && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage("prev");
                      }}
                    >
                      <FaChevronLeft size={20} />
                    </button>

                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage("next");
                      }}
                    >
                      <FaChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {!isZoomed && (
                <motion.div
                  className="mt-4 flex justify-center gap-2 px-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex overflow-x-auto space-x-2 py-2 px-4 bg-black/30 rounded-xl max-w-full no-scrollbar">
                    {sanatorium.room_types
                      ?.find((room) => room.id === modalRoomType)
                      ?.images.map((image, index) => (
                        <motion.div
                          key={index}
                          className={`relative h-16 md:h-20 w-24 md:w-32 flex-shrink-0 cursor-pointer rounded-md overflow-hidden transition-all duration-200 ${
                            index === modalImageIndex
                              ? "ring-2 ring-blue-500 scale-105"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          onClick={() => setModalImageIndex(index)}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={image.image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 96px, 128px"
                          />
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
