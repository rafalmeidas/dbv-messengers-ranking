import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  signInWithEmailAndPassword,
  signOut,
  Auth,
  User,
  user,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: Observable<User | null> = of(null);

  constructor(private auth: Auth, private router: Router) {
    this.currentUser = user(this.auth);
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigateByUrl('/home');
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async register(
    email: string,
    password: string
  ): Promise<UserCredential | null> {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
