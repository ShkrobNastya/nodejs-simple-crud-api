import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/UserModel';

export const users: User[] = [
  {
    id: 'cfdbcfb6-f25c-4eed-bb1b-14442fc3b8a5',
    username: 'Dary',
    age: 12,
    hobbies: ['hob1'],
  },
  {
    id: '2',
    username: 'Dary',
    age: 12,
    hobbies: ['hob1'],
  },
];

export const getAllUsers = (): User[] => users;

export const getUserById = (id: string): User | undefined =>
  users.find((u) => u.id === id);

export const createUser = (data: Omit<User, 'id'>): User => {
  const newUser: User = {
    id: uuidv4(),
    username: data.username,
    age: data.age,
    hobbies: data.hobbies,
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (
  id: string,
  data: Partial<Omit<User, 'id'>>,
): User | null => {
  const user = getUserById(id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
