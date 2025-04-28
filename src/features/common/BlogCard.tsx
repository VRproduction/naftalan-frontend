import React from "react";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCalendarAlt, FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from '@/i18n/navigation';
import { formatDate } from '@/lib/utils/timeUtils';
import { BlogPost } from "@/lib/types/blog.type";
import { useTranslations } from "next-intl";

interface Props {
    blog: BlogPost
}

const BlogCard = ({blog}: Props) => {
  const t = useTranslations('blog');

  return (
    <motion.article
      key={blog.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative h-56">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            {formatDate(blog.date)}
          </span>
        </div>

        <Link href={`/blog/${blog.slug}`} className="block">
          <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.short_description}
        </p>

        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium"
          >
            {t('read_more')}
            <FaLongArrowAltRight className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
