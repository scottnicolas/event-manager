import axios from "axios";
import { Sponsor } from "../types/Sponsor";
const SPONSOR_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/sponsors/";
export const fetchSponsors = async (): Promise<Sponsor[]> =>
  (await axios.get(`${SPONSOR_URL}?format=json`)).data;
export const getSponsorById = async (id: number): Promise<Sponsor> =>
  (await axios.get(`${SPONSOR_URL}${id}/?format=json`)).data;
export const createSponsor = async (
  data: Omit<Sponsor, "sponsor_id">
): Promise<Sponsor> => (await axios.post(SPONSOR_URL, data)).data;
export const updateSponsor = async (
  id: number,
  data: Partial<Sponsor>
): Promise<Sponsor> => (await axios.put(`${SPONSOR_URL}${id}/`, data)).data;
export const deleteSponsor = async (id: number): Promise<void> => {
  await axios.delete(`${SPONSOR_URL}${id}/`);
};
