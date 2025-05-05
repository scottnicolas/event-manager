import axios from "axios";
import { User } from "../types/User";
const USER_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/users/";
export const fetchUsers = async (): Promise<User[]> =>
  (await axios.get(`${USER_URL}?format=json`)).data;
export const getUserById = async (id: number): Promise<User> =>
  (await axios.get(`${USER_URL}${id}/?format=json`)).data;
export const createUser = async (data: Omit<User, "user_id">): Promise<User> =>
  (await axios.post(USER_URL, data)).data;
export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => (await axios.put(`${USER_URL}${id}/`, data)).data;
export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${USER_URL}${id}/`);
};
