import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  resized = new Subject<void>();
  mobile: boolean;

  constructor() {
    this.mobile = window.innerWidth <= 768;
  }

  onResize() {
    this.mobile = window.innerWidth <= 768;
    this.resized.next();
  }

  isMobile() {
    return this.mobile;
  }

}
