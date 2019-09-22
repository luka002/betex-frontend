import {Injectable} from '@angular/core';
import {NgProgress, NgProgressRef} from '@ngx-progressbar/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private progressRef: NgProgressRef;

  constructor(private ngProgress: NgProgress) {
    this.progressRef = ngProgress.ref();
  }

  requestStart() {
    this.progressRef.start();
    this.progressRef.set(30);
  }

  requestDone() {
    this.progressRef.complete();
  }

}
