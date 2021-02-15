import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private userSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private afDB: AngularFirestore,
              private router: Router,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      console.log("fbUser", fbUser);

      if(fbUser) {
        this.userSubscription =  this.afDB.doc(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((userObj: User) => {
            const newUser = new User(userObj);
            this.store.dispatch(new SetUserAction(newUser));
            this.user = newUser;
            console.log(newUser);
          });
      } else {
        this.user = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  createUser(email: string, name: string, password: string): void {
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        console.log("Registered successfully", newUser);
        
        const user: User = {
          uid: newUser.user.uid,
          name: name,
          email: newUser.user.email
        } 

        this.afDB.doc(`${ user.uid }/user`).set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DeactivateLoadingAction());

          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Register failed', err.message, 'error');
      });
  }

  login(email: string, password: string): void {
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log("Login successfully", user);
      this.router.navigate(['/']);
      this.store.dispatch(new DeactivateLoadingAction());
    })
    .catch(err => {
      console.log(err);
      this.store.dispatch(new DeactivateLoadingAction());
      Swal.fire('Login failed', err.message, 'error');
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.afAuth.signOut();
  }

  isLoggedIn() {
    return this.afAuth.authState
              .pipe(map(fbUser => {
                if(fbUser == null) this.router.navigate(['/login']);
                return fbUser != null;
              }));
  }

  // Rompre la relación (objetos pasados por referencia de memoria)
  getUser(): User {
    return { ...this.user };
  }

}
