import {ElementRef, Injectable} from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class Html2ImageService {

  html2Image(ref: ElementRef, imageName: string) {
    const element = ref.nativeElement.cloneNode(true) as HTMLElement;
    element.style.zIndex = '-100';
    element.style.transform = 'scale(1)';
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.opacity = '1';
    document.body.appendChild(element);

    html2canvas(element).then(canvas => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/jpeg', 1.0);
      a.download = `${imageName}.jpg`;
      a.click();
      document.body.removeChild(element);
    }).catch(() => document.body.removeChild(element));
  }

}
