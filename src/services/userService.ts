import api from "../api/api";
import { User } from "../types/User";

const endpoint = "users/";

export const fetchUsers = async (): Promise<User[]> =>
  (await api.get(endpoint)).data;
export const fetchUserById = async (id: number): Promise<User> =>
  (await api.get(`${endpoint}${id}/`)).data;
export const createUser = async (data: Partial<User>): Promise<User> =>
  (await api.post(endpoint, data)).data;
export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
};
