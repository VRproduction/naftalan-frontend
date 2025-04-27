import { SupportedLocale } from "../utils/apiClient";
import api from "../utils/apiClient";
import {
  About,
  AboutHistory,
  TreatmentsPage,
  Treatment,
  TreatmentCategory,
  TreantmentProcess,
} from "../types/about.type";

const DEFAULT_OPTIONS = { revalidate: 1000};

export const getAbout = (locale: SupportedLocale) =>
  api.get<About>("/about/", { ...DEFAULT_OPTIONS, locale: locale });

export const getHistory = (locale: SupportedLocale) =>
  api.get<AboutHistory>("/about/history/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getTreatmentsPage = (locale: SupportedLocale) =>
  api.get<TreatmentsPage>("/about/treatment-page/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getTreatments = (locale: SupportedLocale) =>
  api.get<Treatment[]>("/about/treatment-list/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getTreatmentCategories = (locale: SupportedLocale) =>
  api.get<TreatmentCategory[]>("/about/treatment-category-list/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getTreantmentProcesses = (locale: SupportedLocale) =>
  api.get<TreantmentProcess[]>("/about/treatment-process-list/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });
