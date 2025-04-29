import { PackageType } from "../types/package.type";
import { PaginatedResponse } from "../types/response.type";
import api, { SupportedLocale } from "../utils/apiClient";

export const getPackages = async (
    locale: SupportedLocale,
    params?: {
      category?: string;
      tags?: string;
      page?: string;
      page_size?: string;
      search?: string;
    }
  ) => {
    const response = await api.get<PaginatedResponse<PackageType>>(
      "/packages/",
      {
        locale: locale,
        params: {
          page: params?.page || "1",
          page_size: params?.page_size || "10",
        },
      }
    );
    return response;
  };