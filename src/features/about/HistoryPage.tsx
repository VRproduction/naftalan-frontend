"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { AboutHistory } from "@/lib/types/about.type";

interface Props {
  history: AboutHistory;
}

export default function HistoryPage({ history }: Props) {

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {history.hero_section_title}
              </h1>
              <div className="w-20 h-1 bg-yellow-400 mb-6"></div>
              <div
                className="text-lg md:text-xl mb-8 text-blue-100"
                dangerouslySetInnerHTML={{
                  __html: history.hero_section_content,
                }}
              ></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src={history.hero_section_image}
                alt={history.hero_section_title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                {history.introduction_title}
              </h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="custom-html-content prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: history.introduction_content }}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {history.timeline_section_title}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <div
              className=" prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: history.timeline_section_description,
              }}
            ></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline center line */}
              <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-blue-200"></div>

              {/* Timeline events */}
              {history.timeline_punkts.map((event, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeInUpVariant}
                  className={`relative mb-12 md:mb-16 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  <div
                    className={`flex items-start ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Year marker */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center mx-2 md:mx-0"></div>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-grow ${
                        index % 2 === 0 ? "md:mr-12" : "ml-6 md:ml-12"
                      }`}
                    >
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-3">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">
                          {event.title}
                        </h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Discoveries Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {history.scientific_section_title}
              </h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <div
                dangerouslySetInnerHTML={{
                  __html: history.scientific_section_content,
                }}
                className="custom-html-content prose prose-lg text-gray-700"
              ></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="order-1 md:order-2 relative h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src={history.scientific_section_image}
                alt="Naftalan laboratoriyası"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Soviet Period */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src={history.soviet_section_image}
                alt="Sovet dövründə Naftalan kurortu"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {history.soviet_section_title}
              </h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <div
                dangerouslySetInnerHTML={{
                  __html: history.soviet_section_content,
                }}
                className="custom-html-content prose prose-lg text-gray-700"
              ></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Era */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {history.modern_section_title}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <div
              dangerouslySetInnerHTML={{
                __html: history.modern_section_description,
              }}
              className="custom-html-content prose prose-lg text-gray-700"
            ></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {history.modern_punkts.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                variants={fadeInUpVariant}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={36}
                    height={36}
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Naftalan neftinin şəfa möcüzəsini kəşf edin
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Yüzillərin təcrübəsi və müasir tibb elminin birləşdiyi Naftalan
                müalicələri ilə sağlamlığınıza qovuşun
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/about/treatments"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center"
                >
                  Müalicə olunan xəstəliklər <FaArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/sanatoriums/naftalan"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Sanatoriumlar
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
