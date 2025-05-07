import { PaginatedResponse } from "../types/response.type";
import { City, NaftalanSanatoriumsPage, OtherCitiesSanatoriumsPage, Sanatorium, SanatoriumDetail, SanatoriumListType } from "../types/sanatorium.type";
import api, { SupportedLocale } from "../utils/apiClient";



export const getSanatoriumsSearch = async (
  locale: SupportedLocale,
  params?: {
    category?: string;
    page?: string;
    page_size?: string;
    is_popular?: string;
    is_featured?: string;
    location?: string;
    check_in?: string;
    check_out?: string;
    occupancy?: string;
    children_ages?: string;
    min_price?: string;
    max_price?: string;
    min_total_price?: string;
    max_total_price?: string;
    ratings?: string;
    id?: string;
  }
) => {
  const response = await api.get<PaginatedResponse<Sanatorium>>(
    "/sanatoriums/search/",
    {
      locale: locale,
      params: {
        category: params?.category || "",
        page: params?.page || "1",
        page_size: params?.page_size || "100",
        is_popular: params?.is_popular || "false",
        is_featured: params?.is_featured || "false",
        location: params?.location || "",
        check_in: params?.check_in || "",
        check_out: params?.check_out || "",
        occupancy: params?.occupancy || "",
        children_ages: params?.children_ages || "",
        min_price: params?.min_price || "",
        max_price: params?.max_price || "",
        min_total_price: params?.min_total_price || "",
        max_total_price: params?.max_total_price || "",
        ratings: params?.ratings || "",
        id: params?.id || "",
      },
    }
  );
  return response
};

export const getLocations = async (locale: SupportedLocale) => {
  const response = await api.get<City []>(`/sanatoriums/locations/`, { locale: locale });
  return response;
};

export const getSanatorium = async (locale: SupportedLocale, slug: string) => {
  const response = await api.get<SanatoriumDetail>(`/sanatoriums/${slug}/`, { locale: locale });
  return response;
};


export const getNaftalanSanatoriumsPage = async (locale: SupportedLocale) => {
  const response = await api.get<NaftalanSanatoriumsPage>("/sanatoriums/naftalan-page/", { locale: locale });
  return response;
};

export const getNaftalanSanatoriums = async (locale: SupportedLocale) => {
  const response = await api.get<Sanatorium []>("/sanatoriums/naftalan-sanatoriums/", { locale: locale });
  return response;
};

export const getOtherCitiesSanatoriumsPage = async (locale: SupportedLocale) => {
  const response = await api.get<OtherCitiesSanatoriumsPage>("/sanatoriums/other-cities-page/", { locale: locale });
  return response;
};

export const getOtherCitiesSanatoriums = async (locale: SupportedLocale) => {
  const response = await api.get<Sanatorium[]>("/sanatoriums/other-cities-sanatoriums/", { locale: locale });
  return response;
};


export const getSanatoriumList = async (
  locale: SupportedLocale,
  params?: {
    location?: string;
  }
) => {
  const response = await api.get<SanatoriumListType[]>(`/sanatoriums/`, { locale: locale, params: params });
  return response;
};
