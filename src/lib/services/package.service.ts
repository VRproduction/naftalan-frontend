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

interface CreatePackageOrderRequest {
  package: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  notes: string;
}

export const createPackageOrder = async (data: CreatePackageOrderRequest) => {
    const response = await api.post<CreatePackageOrderRequest, CreatePackageOrderRequest>(
        '/packages/orders/',
        data
    );
    return response;
};