import axios from "axios";
import { Registration } from "../types/Registration";
const REGISTRATION_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/registrations/";
export const fetchRegistrations = async (): Promise<Registration[]> =>
  (await axios.get(`${REGISTRATION_URL}?format=json`)).data;
export const getRegistrationById = async (
  user: number
): Promise<Registration> =>
  (await axios.get(`${REGISTRATION_URL}${user}/?format=json`)).data;
export const createRegistration = async (
  data: Registration
): Promise<Registration> => (await axios.post(REGISTRATION_URL, data)).data;
export const updateRegistration = async (
  user: number,
  data: Partial<Registration>
): Promise<Registration> =>
  (await axios.put(`${REGISTRATION_URL}${user}/`, data)).data;
export const deleteRegistration = async (user: number): Promise<void> => {
  await axios.delete(`${REGISTRATION_URL}${user}/`);
};
