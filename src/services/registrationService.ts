import api from "../api/api";
import { Registration } from "../types/Registration";

const endpoint = "registrations/";

export const fetchRegistrations = async (): Promise<Registration[]> =>
  (await api.get(endpoint)).data;
export const fetchRegistrationById = async (
  id: number
): Promise<Registration> => (await api.get(`${endpoint}${id}/`)).data;
export const createRegistration = async (
  data: Partial<Registration>
): Promise<Registration> => (await api.post(endpoint, data)).data;
export const updateRegistration = async (
  id: number,
  data: Partial<Registration>
): Promise<Registration> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deleteRegistration = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchRegistrations,
  fetchRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};
