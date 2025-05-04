import api from "../api/api";
import { Payment } from "../types/Payment";

const endpoint = "payments/";

export const fetchPayments = async (): Promise<Payment[]> =>
  (await api.get(endpoint)).data;
export const fetchPaymentById = async (id: number): Promise<Payment> =>
  (await api.get(`${endpoint}${id}/`)).data;
export const createPayment = async (data: Partial<Payment>): Promise<Payment> =>
  (await api.post(endpoint, data)).data;
export const updatePayment = async (
  id: number,
  data: Partial<Payment>
): Promise<Payment> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deletePayment = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchPayments,
  fetchPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
