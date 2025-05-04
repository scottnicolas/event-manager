import api from "../api/api";
import { Host } from "../types/Host";

const endpoint = "hosts/";

export const fetchHosts = async (): Promise<Host[]> =>
  (await api.get(endpoint)).data;
export const fetchHostById = async (id: number): Promise<Host> =>
  (await api.get(`${endpoint}${id}/`)).data;
export const createHost = async (data: Partial<Host>): Promise<Host> =>
  (await api.post(endpoint, data)).data;
export const updateHost = async (
  id: number,
  data: Partial<Host>
): Promise<Host> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deleteHost = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchHosts,
  fetchHostById,
  createHost,
  updateHost,
  deleteHost,
};
