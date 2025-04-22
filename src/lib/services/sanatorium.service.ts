import { PaginatedResponse } from "../types/response.type";
import { Sanatorium, SanatoriumDetail } from "../types/sanatorium.type";
import api, { SupportedLocale } from "../utils/apiClient";

export const getSanatoriums = async (
  locale: SupportedLocale,
  params?: {
    category?: string;
    page?: string;
    page_size?: string;
    is_popular?: string;
    is_featured?: string;
  }
) => {
  const response = await api.get<PaginatedResponse<Sanatorium>>(
    "/sanatoriums/",
    {
      locale: locale,
      params: {
        category: params?.category || "",
        page: params?.page || "1",
        page_size: params?.page_size || "10",
        is_popular: params?.is_popular || "false",
        is_featured: params?.is_featured || "false",
      },
    }
  );
  return response
};

export const getSanatorium = async (locale: SupportedLocale, slug: string) => {
  const response = await api.get<SanatoriumDetail>(`/sanatoriums/${slug}/`, { locale: locale });
  return response;
};

