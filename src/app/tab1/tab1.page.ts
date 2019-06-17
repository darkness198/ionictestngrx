// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tab1',
  // templateUrl: 'tab1.page.html',
  // styleUrls: ['tab1.page.scss']
// })
// export class Tab1Page {

//   constructor() {}

// }

import { switchMap, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserApiService } from '../user-api.service';
import * as fromUserActions from '../actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

// import { HeroService }  from '../hero.service';
// import { Hero } from '../hero';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  currentUser$: User
  currentName$: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService,
    private _store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(map((params: ParamMap) => params.get('username'))).subscribe(username => this.currentName$ = username)
    this.searchForUser()
  }

  searchForUser(){
    this._store.dispatch(fromUserActions.getUserByName({username: this.currentName$}))
  }
}
