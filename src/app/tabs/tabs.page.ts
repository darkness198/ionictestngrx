import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromUserActions from '../actions/user.actions';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private _store: Store<AppState>) {}

  onClickUserTab() {
    this._store.dispatch(fromUserActions.resetLoginSearch())
  }
}
