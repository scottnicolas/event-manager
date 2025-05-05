import axios from "axios";
import { Host } from "../types/Host";
const HOST_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/hosts/";
export const fetchHosts = async (): Promise<Host[]> =>
  (await axios.get(`${HOST_URL}?format=json`)).data;
export const getHostById = async (event: number): Promise<Host> =>
  (await axios.get(`${HOST_URL}${event}/?format=json`)).data;
export const createHost = async (data: Host): Promise<Host> =>
  (await axios.post(HOST_URL, data)).data;
export const updateHost = async (
  event: number,
  data: Partial<Host>
): Promise<Host> => (await axios.put(`${HOST_URL}${event}/`, data)).data;
export const deleteHost = async (event: number): Promise<void> => {
  await axios.delete(`${HOST_URL}${event}/`);
};
