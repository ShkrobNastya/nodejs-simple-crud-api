import { User } from '../models/UserModel';

export const users: User[] = [
  {
    id: '1',
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

export const createUser = (data: User): User => {
  const newUser: User = data;
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, data: User): User | null => {
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
