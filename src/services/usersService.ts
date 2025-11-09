import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../db/users';
import { User } from '../models/UserModel';

export const userService = {
  getAllUsers: (): User[] => getAllUsers(),

  getUserById: (id: string): User | null => {
    if (!id) return null;
    return getUserById(id) || null;
  },

  createUser: (data: {
    username: string;
    age: number;
    hobbies: string[];
  }): User | null => {
    const { username, age, hobbies } = data;
    if (!username || !age || !hobbies.length) return null;
    return createUser({ username, age, hobbies });
  },

  updateUser: (id: string, data: User): User | null => {
    if (!id) return null;
    return updateUser(id, data);
  },

  deleteUser: (id: string): boolean | null => {
    if (!id) return null;
    return deleteUser(id);
  },
};
