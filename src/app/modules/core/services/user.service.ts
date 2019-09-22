import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {httpOptions, url} from '../properties/properties';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {User, Page, UserRole, UpdatePassword} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<User>(null);
  editUser = new BehaviorSubject<User>(null);
  usersPage = new BehaviorSubject<Page>(null);

  constructor(private http: HttpClient) {}

  // region CRUD operations ========================================================================
  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(url.getUser(id), httpOptions.json)
      .pipe(
        tap(user => this.editUser.next(user)),
        catchError(() => {
          this.editUser.next(null);
          return of(null);
        })
      );
  }

  addUser(user: User) {
    return this.http.post(url.userRest, user, httpOptions.json);
  }

  updateUser(user: User) {
    return this.http.put(url.userRest, user, httpOptions.json);
  }

  getUserRole() {
    return this.http.get(url.getUserRole, httpOptions.json);
  }

  getUserRoleAndUsername() {
    return this.http
      .get(url.getUserRoleAndUsername, httpOptions.json)
      .pipe(
        tap((_user: any) => {
          const user = new User();
          user.userRole = new UserRole(_user.role);
          user.username = _user.username;
          this.user.next(user);
        }),
        catchError(() => {
          const user = new User();
          this.user.next(user);
          return of(user);
        })
      );
  }

  getUsersWithUsername(page: number, username: string): Observable<Page> {
    return this.http
      .get<Page>(url.getUsersWithUsername(page, username), httpOptions.json)
      .pipe(
        tap((_page) => this.usersPage.next(_page)),
        catchError(() => {
          const _page = new Page();
          this.usersPage.next(_page);
          return of(_page);
        })
      );
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(url.deleteUser(user.id), httpOptions.json);
  }
  // endregion =====================================================================================

  // region Login, logout, authentication, authorization ===========================================
  register(user: User) {
    return this.http.post(url.register, user, httpOptions.json);
  }

  login(credentials) {
    const loginCredentials = `username=${credentials.username}&password=${credentials.password}`;
    return this.http
      .post(url.login, loginCredentials, httpOptions.xWwwFormUrlencoded)
      .pipe(
        switchMap(() => this.getUserRoleAndUsername())
      );
  }

  logout() {
    return this.http
      .get(url.logout, httpOptions.xWwwFormUrlencoded)
      .pipe(
        tap(() => this.user.next(new User()))
      );
  }

  activateUserAccount(token: string): Observable<User> {
    return this.http.get<User>(url.activateUserAccount(token), httpOptions.json);
  }

  // endregion =====================================================================================

  // region Password manipulation ==================================================================
  forgotPassword(email: string): Observable<any> {
    const userEmail = `email=${email}`;
    return this.http.post<any>(url.forgotPassword, userEmail, httpOptions.xWwwFormUrlencoded);
  }

  resetPassword(token: string, password: string, confirmPassword: string) {
    const data = {token: token, password: password, confirmPassword: confirmPassword};
    return this.http.post(url.resetPassword, data, httpOptions.json);
  }

  updatePassword(updatePassword: UpdatePassword) {
    return this.http.post(url.updatePassword, updatePassword, httpOptions.json);
  }
  // endregion =====================================================================================

}
