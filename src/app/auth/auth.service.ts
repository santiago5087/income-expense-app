import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      console.log("fbUser", fbUser);
    });
  }

  createUser(email: string, name: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        console.log("Registered successfully", newUser);

        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Register failed', err.message, 'error');
      });
  }

  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log("Login successfully", user);

      this.router.navigate(['/']);
    })
    .catch(err => {
      console.log(err);
      Swal.fire('Login failed', err.message, 'error');
    });
  }

  logout(): void {
    this.router.navigate(['/']);
    this.afAuth.signOut();
  }

  isLoggedIn() {
    return this.afAuth.authState
              .pipe(map(fbUser => {
                if(fbUser == null) this.router.navigate(['/login']);
                return fbUser != null;
              }));
  }

}
