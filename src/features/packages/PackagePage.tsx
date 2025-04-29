"use client";

import React from "react";
import { PackageType } from "@/lib/types/package.type";
import { PackageCard } from "../common/PackageCard";
import { useTranslations } from "next-intl";

interface Props {
  packages: PackageType[];
}

const PackagePage = ({ packages }: Props) => {
    const t = useTranslations('pages.packages')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{t("packages")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <PackageCard key={pkg.id} pkg={pkg} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PackagePage;
