import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagement } from './user-management';

describe('UserManagement', () => {
  let component: UserManagement;
  let fixture: ComponentFixture<UserManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the selected user in edit mode without retaining that state for Add User', () => {
    const user = component.users()[0];

    component.editUser(user);

    expect(component.isUserModalOpen).toBe(true);
    expect(component.editingUserId()).toBe(user.id);

    component.startAddUser();

    expect(component.isUserModalOpen).toBe(true);
    expect(component.editingUserId()).toBeNull();
    expect(component.userForm.name).toBe('');
    expect(component.userForm.email).toBe('');
  });
});
