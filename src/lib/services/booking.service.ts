import { BookingRequestData } from "../types/booking.type";
import api from "../utils/apiClient";

export const createBooking = async (data: BookingRequestData) => {
  const response = await api.post<BookingRequestData, BookingRequestData>(
    `/booking/create/`,
    data
  );
  return response;
};
