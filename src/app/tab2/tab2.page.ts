import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromUserActions from '../actions/user.actions';
import { UserApiService } from '../user-api.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  currentLastId: number
  constructor(private _store: Store<AppState>, private userApiService: UserApiService) {}


  ngOnInit() {
    this.loadData();
    this._store.subscribe(state => {
      if(!state.users.isLoading) {
        this.infiniteScroll.complete();
      }
    })
  }

  loadData() {
    this._store.subscribe(state => {
      this.currentLastId = state.users.lastUserSeen
    })
    
    this._store.dispatch(fromUserActions.getUsers({sinceId: this.currentLastId}))
  }
}
