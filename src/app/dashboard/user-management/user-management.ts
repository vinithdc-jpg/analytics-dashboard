import { Component, computed, signal } from '@angular/core';

type UserRole = 'Admin' | 'Manager' | 'Analyst';
type UserStatus = 'Active' | 'Inactive';
type SortField = 'name' | 'email' | 'createdAt';
type SortDirection = 'asc' | 'desc';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.html',
})
export class UserManagement {
  // Sample user records
  users = signal<User[]>([
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

  searchTerm = signal('');
  selectedRole = signal('All');
  selectedStatus = signal('All');

  sortField = signal<SortField>('name');
  sortDirection = signal<SortDirection>('asc');

  currentPage = signal(1);
  pageSize = 5;

  // 1. Search and filter the full user list
  filteredUsers = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const role = this.selectedRole();
    const status = this.selectedStatus();

    return this.users().filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);

      const matchesRole = role === 'All' || user.role === role;
      const matchesStatus = status === 'All' || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  });

  // 2. Sort the filtered users
  sortedUsers = computed(() => {
    const field = this.sortField();
    const direction = this.sortDirection();

    return [...this.filteredUsers()].sort((a, b) => {
      const comparison = a[field].localeCompare(b[field]);
      return direction === 'asc' ? comparison : -comparison;
    });
  });

  // 3. Calculate pagination
  totalPages = computed(() => Math.max(1, Math.ceil(this.sortedUsers().length / this.pageSize)));

  // 4. Return only the rows for the current page
  visibleUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.sortedUsers().slice(start, start + this.pageSize);
  });

  startItem = computed(() =>
    this.sortedUsers().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1,
  );

  endItem = computed(() => Math.min(this.currentPage() * this.pageSize, this.sortedUsers().length));

  // Reset pagination when search or filters change
  updateSearch(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  updateRole(value: string): void {
    this.selectedRole.set(value);
    this.currentPage.set(1);
  }

  updateStatus(value: string): void {
    this.selectedStatus.set(value);
    this.currentPage.set(1);
  }

  // Change sort direction when the same field is clicked
  sortBy(field: SortField): void {
    if (this.sortField() === field) {
      this.sortDirection.update((direction) => (direction === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }

    this.currentPage.set(1);
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
