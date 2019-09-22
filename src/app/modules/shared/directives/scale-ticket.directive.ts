import {AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';
import {ResponsiveService} from '../../core/services';

@Directive({
  selector: '[betexScaleTicketDirective]'
})
export class ScaleTicketDirective implements OnInit, OnDestroy, AfterViewInit {
  initialTicketWidth: number;
  initialTicketHeight: number;
  sub: Subscription;

  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.responsiveService.resized.subscribe(() => this.onResize());
  }

  ngAfterViewInit() {
    this.initialTicketWidth = (this.elRef.nativeElement as HTMLElement).offsetWidth;
    this.initialTicketHeight = (this.elRef.nativeElement as HTMLElement).offsetHeight;
    this.onResize();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onResize() {
    let scale = Math.min(
      window.innerWidth / ((this.elRef.nativeElement as HTMLElement).offsetWidth + 70),
      window.innerHeight / ((this.elRef.nativeElement as HTMLElement).offsetHeight + 70)
    );
    scale = (scale < 0.7 ? scale : 0.7);
    const translation = scale < 0.7 ? ((1 - scale) * 100) / 2 : 15;
    const transform = 'translate(-' + translation + '%, -' + translation + '%) scale(' + scale + ')';

    this.renderer.setStyle(this.elRef.nativeElement, 'transform', transform);
    this.renderer.setStyle(
      (this.elRef.nativeElement as HTMLElement).parentElement,
      'width',
      this.initialTicketWidth * scale + 'px'
    );
    this.renderer.setStyle(
      (this.elRef.nativeElement as HTMLElement).parentElement,
      'height',
      this.initialTicketHeight * scale + 'px'
    );
  }

}
