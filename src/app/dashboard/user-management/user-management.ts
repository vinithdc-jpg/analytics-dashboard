import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService, User, UserRole, UserStatus } from '../../services/user';

type SortField = 'name' | 'email' | 'createdAt';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-management.html',
})
export class UserManagement {
  // Sample user records
  private userService = inject(UserService);

  readonly users = this.userService.users;

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

  // Form state
  editingUserId = signal<number | null>(null);
  isRoleOpen = false;
  isStatusOpen = false;

  readonly roleOptions: UserRole[] = ['Admin', 'Manager', 'Analyst'];
  readonly statusOptions: UserStatus[] = ['Active', 'Inactive'];

  userForm = {
    name: '',
    email: '',
    role: 'Analyst' as UserRole,
    status: 'Active' as UserStatus,
  };

  selectRole(role: UserRole): void {
    this.userForm.role = role;
    this.isRoleOpen = false;
  }

  selectStatus(status: UserStatus): void {
    this.userForm.status = status;
    this.isStatusOpen = false;
  }

  // Open a blank form for a new user
  startAddUser(): void {
    this.editingUserId.set(null);
    this.isRoleOpen = false;
    this.isStatusOpen = false;
    this.userForm = {
      name: '',
      email: '',
      role: 'Analyst',
      status: 'Active',
    };
  }

  // Fill the form with an existing user's details
  editUser(user: User): void {
    this.editingUserId.set(user.id);
    this.userForm = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };
  }

  // Add a new user or update the selected user
  saveUser(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const editingId = this.editingUserId();

    if (editingId !== null) {
      this.userService.updateUser(editingId, {
        ...this.userForm,
      });
    } else {
      this.userService.addUser({
        ...this.userForm,
      });
    }

    // Reset table filters after saving
    this.searchTerm.set('');
    this.selectedRole.set('All');
    this.selectedStatus.set('All');
    this.sortField.set('name');
    this.sortDirection.set('asc');
    this.currentPage.set(1);

    this.cancelForm(form);
  }

  // Reset the form and leave edit mode
  cancelForm(form: NgForm): void {
    this.editingUserId.set(null);
    this.isRoleOpen = false;
    this.isStatusOpen = false;
    this.userForm = {
      name: '',
      email: '',
      role: 'Analyst',
      status: 'Active',
    };
    form.resetForm(this.userForm);
  }

  isRoleFilterOpen = false;
  isStatusFilterOpen = false;
  isUserModalOpen = false;

  closeUserModal(): void {
    this.isUserModalOpen = false;
  }
}
