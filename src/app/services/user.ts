import { Injectable, signal } from '@angular/core';

export type UserRole = 'Admin' | 'Manager' | 'Analyst';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // One shared source of truth for user records
  readonly users = signal<User[]>([
    {
      id: 1,
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      role: 'Admin',
      status: 'Active',
      createdAt: '2026-01-12',
    },
    {
      id: 2,
      name: 'Priya Nair',
      email: 'priya@example.com',
      role: 'Manager',
      status: 'Active',
      createdAt: '2026-02-05',
    },
    {
      id: 3,
      name: 'Rahul Verma',
      email: 'rahul@example.com',
      role: 'Analyst',
      status: 'Inactive',
      createdAt: '2026-02-19',
    },
    {
      id: 4,
      name: 'Sneha Rao',
      email: 'sneha@example.com',
      role: 'Manager',
      status: 'Active',
      createdAt: '2026-03-03',
    },
    {
      id: 5,
      name: 'Arjun Patel',
      email: 'arjun@example.com',
      role: 'Analyst',
      status: 'Active',
      createdAt: '2026-03-11',
    },
    {
      id: 6,
      name: 'Meera Das',
      email: 'meera@example.com',
      role: 'Admin',
      status: 'Inactive',
      createdAt: '2026-04-02',
    },
    {
      id: 7,
      name: 'Kiran Shetty',
      email: 'kiran@example.com',
      role: 'Analyst',
      status: 'Active',
      createdAt: '2026-04-15',
    },
    {
      id: 8,
      name: 'Ananya Iyer',
      email: 'ananya@example.com',
      role: 'Manager',
      status: 'Active',
      createdAt: '2026-05-01',
    },
    {
      id: 9,
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      role: 'Analyst',
      status: 'Inactive',
      createdAt: '2026-05-14',
    },
    {
      id: 10,
      name: 'Diya Kumar',
      email: 'diya@example.com',
      role: 'Admin',
      status: 'Active',
      createdAt: '2026-06-08',
    },
    {
      id: 11,
      name: 'Rohan Joshi',
      email: 'rohan@example.com',
      role: 'Manager',
      status: 'Inactive',
      createdAt: '2026-06-21',
    },
    {
      id: 12,
      name: 'Ishita Menon',
      email: 'ishita@example.com',
      role: 'Analyst',
      status: 'Active',
      createdAt: '2026-07-10',
    },
  ]);

  addUser(details: Omit<User, 'id' | 'createdAt'>): void {
    const newUser: User = {
      ...details,
      id: Math.max(0, ...this.users().map((user) => user.id)) + 1,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    this.users.update((users) => [...users, newUser]);
  }

  updateUser(id: number, changes: Pick<User, 'name' | 'email' | 'role' | 'status'>): void {
    this.users.update((users) =>
      users.map((user) => (user.id === id ? { ...user, ...changes } : user)),
    );
  }

  getUserById(id: number): User | undefined {
    return this.users().find((user) => user.id === id);
  }
}
