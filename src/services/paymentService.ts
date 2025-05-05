import axios from "axios";
import { Payment } from "../types/Payment";
const PAYMENT_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/payments/";
export const fetchPayments = async (): Promise<Payment[]> =>
  (await axios.get(`${PAYMENT_URL}?format=json`)).data;
export const getPaymentById = async (id: number): Promise<Payment> =>
  (await axios.get(`${PAYMENT_URL}${id}/?format=json`)).data;
export const createPayment = async (
  data: Omit<Payment, "payment_id">
): Promise<Payment> => (await axios.post(PAYMENT_URL, data)).data;
export const updatePayment = async (
  id: number,
  data: Partial<Payment>
): Promise<Payment> => (await axios.put(`${PAYMENT_URL}${id}/`, data)).data;
export const deletePayment = async (id: number): Promise<void> => {
  await axios.delete(`${PAYMENT_URL}${id}/`);
};
