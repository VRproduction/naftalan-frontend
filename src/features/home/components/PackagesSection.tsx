import { motion } from "framer-motion";
import Link from "next/link";
import { PackageSection as PackageSectionType } from "@/lib/types/home.type";
import { PackageCard } from "@/features/common/PackageCard";
import { PackageType } from "@/lib/types/package.type";

const PackagesSection = ({
  packagesSection,
  packages
}: {
  packagesSection: PackageSectionType;
  packages: PackageType []
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {packagesSection.title}
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-blue-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            {packagesSection.section_description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors inline-block"
          >
            Bütün paketlər
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
