import api from "../api/api";
import { Sponsor } from "../types/Sponsor";

const endpoint = "sponsors/";

export const fetchSponsors = async (): Promise<Sponsor[]> =>
  (await api.get(endpoint)).data;
export const fetchSponsorById = async (id: number): Promise<Sponsor> =>
  (await api.get(`${endpoint}${id}/`)).data;
export const createSponsor = async (data: Partial<Sponsor>): Promise<Sponsor> =>
  (await api.post(endpoint, data)).data;
export const updateSponsor = async (
  id: number,
  data: Partial<Sponsor>
): Promise<Sponsor> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deleteSponsor = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchSponsors,
  fetchSponsorById,
  createSponsor,
  updateSponsor,
  deleteSponsor,
};
