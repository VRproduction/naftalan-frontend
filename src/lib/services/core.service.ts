import { SiteSettings } from "../types/core.type";
import { SupportedLocale } from "../utils/apiClient";
import api from "../utils/apiClient";


const DEFAULT_OPTIONS = { revalidate: 1};

export const getSiteSettings = (locale: SupportedLocale) =>
  api.get<SiteSettings>("/core/settings/", { ...DEFAULT_OPTIONS, locale: locale });

