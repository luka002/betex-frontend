import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {httpOptions, url} from '../properties/properties';
import {Observable} from 'rxjs';
import {debounceTime, map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidator {

  constructor(private readonly http: HttpClient) {}

  uniqueUsername(control: AbstractControl): Observable<{[key: string]: boolean} | null> {
    const username = control.value;
    if (!username || username.length < 2 || username.length > 30) {
      return null;
    }

    return control.valueChanges.pipe(
      debounceTime(500),
      take(1),
      switchMap(() => this.http.get<boolean>(url.isUsernameUnique(username), httpOptions.json)),
      map(isUsernameUnique => {
        if (!isUsernameUnique) {
          return {'usernameTaken': true};
        } else {
          return null;
        }
      })
    );
  }

}
