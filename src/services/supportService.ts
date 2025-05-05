import axios from "axios";
import { Support } from "../types/Support";
const SUPPORT_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/supports/";
export const fetchSupports = async (): Promise<Support[]> =>
  (await axios.get(`${SUPPORT_URL}?format=json`)).data;
export const getSupportById = async (event: number): Promise<Support> =>
  (await axios.get(`${SUPPORT_URL}${event}/?format=json`)).data;
export const createSupport = async (data: Support): Promise<Support> =>
  (await axios.post(SUPPORT_URL, data)).data;
export const updateSupport = async (
  event: number,
  data: Partial<Support>
): Promise<Support> => (await axios.put(`${SUPPORT_URL}${event}/`, data)).data;
export const deleteSupport = async (event: number): Promise<void> => {
  await axios.delete(`${SUPPORT_URL}${event}/`);
};
