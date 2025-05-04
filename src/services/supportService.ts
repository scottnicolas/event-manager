import api from "../api/api";
import { Support } from "../types/Support";

const endpoint = "supports/";

export const fetchSupports = async (): Promise<Support[]> =>
  (await api.get(endpoint)).data;
export const fetchSupportById = async (id: number): Promise<Support> =>
  (await api.get(`${endpoint}${id}/`)).data;
export const createSupport = async (data: Partial<Support>): Promise<Support> =>
  (await api.post(endpoint, data)).data;
export const updateSupport = async (
  id: number,
  data: Partial<Support>
): Promise<Support> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deleteSupport = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchSupports,
  fetchSupportById,
  createSupport,
  updateSupport,
  deleteSupport,
};
