import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {httpOptions, url} from '../properties/properties';
import {debounceTime, map, switchMap, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidator {

  constructor(private readonly http: HttpClient) {}

  uniqueEmail(control: AbstractControl): Observable<{[key: string]: boolean} | null> {
    const email = control.value;
    if (!email) return null;

    return control.valueChanges.pipe(
      debounceTime(500),
      take(1),
      switchMap(() => this.http.get<boolean>(url.isEmailUnique(email), httpOptions.json)),
      map(isEmailUnique => {
        if (!isEmailUnique) {
          return {'emailTaken': true};
        } else {
          return null;
        }
      }),
    );
  }

}
