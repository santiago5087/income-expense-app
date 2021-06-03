import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserTop } from '../../models/userTop.model';
import { UserService } from '../../services/userTop.service';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit, OnDestroy {

  users: UserTop[];
  subscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscription = this.userService.getTopUsers().subscribe(users => {
      console.log('USERS', users);
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
