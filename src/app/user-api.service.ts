import { Injectable } from '@angular/core';
import { Store, Action } from "@ngrx/store";
import { Storage } from "@ionic/storage";


import { User } from "./interfaces/user";
import * as UserActions from "./actions/user.actions";
import { AppState, getUsers, getLastId} from "./reducers";

import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';


const API_URL = "https://api.github.com"


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  public users: Observable<User[]>;

  constructor(private storage: Storage, private store: Store<AppState>, private _http: Http) {
    this.users = this.store.select(getUsers);
  }

  getLastId(id: string): Observable<number> {
    return this.store.select(getLastId);
  }

  getUsers(sinceId){
    return this._http.get(`${API_URL}/users?since=${sinceId}`)
              .pipe(map(res => res.json()))        
  }
}
