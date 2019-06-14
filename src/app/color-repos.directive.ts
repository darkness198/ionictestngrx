import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorRepos]'
})
export class ColorReposDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.color = 'red';
  }


}
