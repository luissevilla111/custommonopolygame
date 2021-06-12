import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  beenScrolled = false;
  isindex = false;
  scrollOffset = 0;
  constructor(
    private elRef:ElementRef,
    private render:Renderer2,
    private router:Router
    ) {

      this.router.events.pipe(
        filter(event =>event instanceof NavigationEnd)
      ).subscribe(
        res =>{
          if(this.router.url !== '/'){
            this.isindex = false;

          }else{
            this.isindex = true;
          }

        }
      )
     }

  @HostListener("window:scroll", ['$event']) scrollWindow($event:Event){

    //console.log($event);
     this.scrollOffset = window.scrollY;

    if(this.scrollOffset > 500){



     this.render.addClass(this.elRef.nativeElement,'nav-scrolled')
     this.render.removeClass(this.elRef.nativeElement,'nav-nonescrolled');
     this.beenScrolled =true;
    }else{
      if(this.beenScrolled && this.isindex){
        //this.render.setStyle(this.elRef.nativeElement,'background-color','transparent');s
      this.render.removeClass(this.elRef.nativeElement,'nav-scrolled')
      this.render.addClass(this.elRef.nativeElement,'nav-nonescrolled')

      }

    }
  }

}
