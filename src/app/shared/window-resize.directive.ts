import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
import {ResizewindowService} from './resizewindow.service'

@Directive({
  selector: '[appWindowResize]'
})
export class WindowResizeDirective {

  constructor(
    private elRef:ElementRef,
    private render:Renderer2,
    private resWinService: ResizewindowService
    ) { }

  @HostListener('window:resize', ['$event'])
   onResize(event) {
    const size = event.target.innerWidth;

    this.detectScreenSize(size)

  }

  ngAfterViewInit() {
  }

  private detectScreenSize(size:number) {
    // we will write this logic later
    this.resWinService.resizeWindow.next(size)
  }
}
