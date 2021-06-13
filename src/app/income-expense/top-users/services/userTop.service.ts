import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserTop } from '../../../models/userTop.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://reqres.in/api';
  
  getTopUsers(): Observable<UserTop[]> {
    return this.http.get(`${ this.baseURL }/users?per_page=6`)
    .pipe(
      map(res => {
        return res['data'].map(user => {
          let fullName = user['first_name'] + ' ' + user['last_name'];
          return new UserTop(fullName, user['email'], user['avatar']);
        })
      })
    );
  }
  
}
