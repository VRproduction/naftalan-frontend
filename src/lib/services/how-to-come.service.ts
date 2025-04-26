
import api, { SupportedLocale } from "../utils/apiClient";

import { HeroSection, LocationSection, TransportSection, VisaSection } from "../types/how-to-come.type";

const DEFAULT_OPTIONS = { revalidate: 1000 };

export const getHeroSection = (locale: SupportedLocale) =>
  api.get<HeroSection>("/how-to-come/hero/", { ...DEFAULT_OPTIONS, locale: locale });

export const getLocationSection = (locale: SupportedLocale) =>
  api.get<LocationSection>("/how-to-come/location/", { ...DEFAULT_OPTIONS, locale: locale });

export const getTransportSection = (locale: SupportedLocale) =>
  api.get<TransportSection>("/how-to-come/transport-option-section/", { ...DEFAULT_OPTIONS, locale: locale });

export const getVisaSection = (locale: SupportedLocale) =>
  api.get<VisaSection>("/how-to-come/visa-section/", { ...DEFAULT_OPTIONS, locale: locale });
