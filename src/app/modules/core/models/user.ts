import {UserRole} from './user-role';

export class User {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  doValidatePassword: boolean;
  email: string;
  userRole: UserRole;
  enabled: boolean;
  lastPaymentTime: Date;
  premiumExpiryTime: Date;
  socialName: string;

  get isRegular() {
    return this.userRole && this.userRole.role === 'REGULAR';
  }

  get isAdmin() {
    return this.userRole && this.userRole.role === 'ADMIN';
  }

  get isPremiumOrAdmin() {
    return this.userRole && (this.userRole.role === 'PREMIUM' || this.userRole.role === 'ADMIN');
  }

  get isLoggedIn() {
    return this.userRole && this.userRole.role;
  }
}
