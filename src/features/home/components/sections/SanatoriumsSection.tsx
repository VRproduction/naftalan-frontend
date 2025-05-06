import Link from "next/link";
import { motion } from "framer-motion";
import { SanatoriumSection as SanatoriumSectionType } from "@/lib/types/home.type";
import SanatoriumCard from "@/features/common/SanatoriumCard";
import { Sanatorium } from "@/lib/types/sanatorium.type";
import { useTranslations } from "next-intl";

const SanatoriumsSection = ({
  sanatoriumsSection,
  sanatoriums,
}: {
  sanatoriumsSection: SanatoriumSectionType;
  sanatoriums: Sanatorium[];
}) => {
  const t = useTranslations("home.sanatoriums");
  
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            {sanatoriumsSection.sub_title}
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {sanatoriumsSection.title}
          </motion.h2>

          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {sanatoriumsSection.section_description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sanatoriums.map((sanatorium, index) => (
            <SanatoriumCard
              key={sanatorium.id}
              sanatorium={sanatorium}
              index={index}
              variant="compact"
              colorScheme="blue"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/reservation"
            className="py-3 px-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl font-medium transform hover:-translate-y-1"
          >
            <span>{t('view_all')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SanatoriumsSection;
