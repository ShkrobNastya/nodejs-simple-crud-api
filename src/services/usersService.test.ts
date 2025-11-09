import { userService } from './usersService';
import { users } from '../db/users';

jest.mock('uuid', () => {
  let counter = 0;
  return {
    v4: jest.fn(() => {
      counter++;
      return `123e4567-e89b-12d3-a456-42661417400${counter.toString()}`;
    }),
  };
});

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

describe('Complete CRUD API Unit Test', () => {
  beforeEach(() => {
    users.length = 0;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should complete the full CRUD workflow: GET empty → CREATE → GET by ID → UPDATE → DELETE → GET not found', () => {
    const initialUsers = userService.getAllUsers();
    expect(initialUsers).toEqual([]);

    const newUserData = {
      username: 'testuser',
      age: 25,
      hobbies: ['reading', 'gaming'],
    };

    const createdUser = userService.createUser(newUserData);
    const userId = createdUser!.id;
    expect(createdUser).toEqual({ ...newUserData, id: userId });

    const retrievedUser = userService.getUserById(userId);
    expect(retrievedUser).toEqual({ ...newUserData, id: userId });

    const updatedUserData: User = {
      id: userId,
      username: 'updateduser',
      age: 30,
      hobbies: ['reading', 'gaming', 'cooking'],
    };

    const updatedUser = userService.updateUser(userId, updatedUserData);
    expect(updatedUser).toEqual(updatedUserData);

    const deleteResult = userService.deleteUser(userId);
    expect(deleteResult).toBe(true);

    const deletedUser = userService.getUserById(userId);
    expect(deletedUser).toBeNull();

    const finalUsers = userService.getAllUsers();
    expect(finalUsers).toEqual([]);
  });

  it('should get all empty -> create multiple users -> get all -> delete one -> get all', () => {
    const initialUsers = userService.getAllUsers();
    expect(initialUsers).toEqual([]);

    const user1Data = { username: 'user1', age: 20, hobbies: ['reading'] };
    const user2Data = { username: 'user2', age: 25, hobbies: ['gaming'] };
    const user3Data = { username: 'user3', age: 30, hobbies: ['cooking'] };

    const user1 = userService.createUser(user1Data);
    const user2 = userService.createUser(user2Data);
    const user3 = userService.createUser(user3Data);

    expect(user1).toEqual({ ...user1Data, id: user1!.id });
    expect(user2).toEqual({ ...user2Data, id: user2!.id });
    expect(user3).toEqual({ ...user3Data, id: user3!.id });

    const allUsers = userService.getAllUsers();
    expect(allUsers.length).toBe(3);

    const deleteResult = userService.deleteUser(user2!.id);
    expect(deleteResult).toBe(true);

    const remainingUsers = userService.getAllUsers();
    expect(remainingUsers.length).toBe(2);
    expect(remainingUsers).toEqual([user1, user3]);
    expect(userService.getUserById(user2!.id)).toBeNull();
  });

  it('should get all empty -> create 2 users -> update one -> get by id -> delete both -> try to get deleted', () => {
    const initialUsers = userService.getAllUsers();
    expect(initialUsers).toEqual([]);

    const user1Data = { username: 'user1', age: 22, hobbies: ['music'] };
    const user2Data = { username: 'user2', age: 28, hobbies: ['sports'] };

    const user1 = userService.createUser(user1Data);
    const user2 = userService.createUser(user2Data);

    expect(user1).toEqual({ ...user1Data, id: user1!.id });
    expect(user2).toEqual({ ...user2Data, id: user2!.id });

    const updatedUser1Data: User = {
      id: user1!.id,
      username: 'updatedUser1',
      age: 23,
      hobbies: ['music', 'traveling'],
    };

    const updatedUser1 = userService.updateUser(user1!.id, updatedUser1Data);
    expect(updatedUser1).toEqual(updatedUser1Data);

    const retrievedUpdatedUser1 = userService.getUserById(user1!.id);
    expect(retrievedUpdatedUser1).toEqual(updatedUser1Data);

    const deleteResult1 = userService.deleteUser(user1!.id);
    const deleteResult2 = userService.deleteUser(user2!.id);
    expect(deleteResult1).toBe(true);
    expect(deleteResult2).toBe(true);

    const deletedUser1 = userService.getUserById(user1!.id);
    const deletedUser2 = userService.getUserById(user2!.id);
    expect(deletedUser1).toBeNull();
    expect(deletedUser2).toBeNull();

    const finalUsers = userService.getAllUsers();
    expect(finalUsers).toEqual([]);
  });
});
