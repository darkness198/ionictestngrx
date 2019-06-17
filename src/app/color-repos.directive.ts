import { Directive, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';

@Directive({
  selector: '[appColorRepos]'
})
export class ColorReposDirective {

  constructor(el: ElementRef, private _store: Store<AppState>) {
  

    this._store.subscribe(state => {
      if(el.nativeElement.id && state.users.data[el.nativeElement.id] &&state.users.data[el.nativeElement.id].public_repos && parseInt(state.users.data[el.nativeElement.id].public_repos) > 2) {
        el.nativeElement.style.color = 'red'
      }
    })
  }


}
