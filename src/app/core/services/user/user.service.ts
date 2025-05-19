import { BehaviorSubject, firstValueFrom, from, Observable, of } from 'rxjs';
import { collection, query, where } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import {
  collectionData,
  Firestore,
  docData,
  getDoc,
  setDoc,
  doc,
} from '@angular/fire/firestore';

import { AuthService } from '../auth/auth.service';

export interface IUser {
  uid: string;
  name: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private role$ = new BehaviorSubject<'admin' | 'user' | null>(null);

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async setUserRole(
    role: 'admin' | 'user',
    uid: string,
    name: string
  ): Promise<void> {
    const ref = doc(this.firestore, `users/${uid}`);
    await setDoc(ref, { role, uid, name }, { merge: true });
    this.role$.next(role);
  }

  getUserRole$(): Observable<'admin' | 'user'> {
    return this.role$.pipe(
      switchMap((role) => {
        if (role) return of(role);
        return from(this.loadUserRole());
      })
    );
  }

  getAllUsersWithRole(role: 'admin' | 'user'): Observable<any[]> {
    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('role', '==', role));
    return collectionData(q, { idField: 'uid' });
  }

  getAllUsers(role?: 'admin' | 'user'): Observable<any[]> {
    const ref = collection(this.firestore, 'users');
    const q = role ? query(ref, where('role', '==', role)) : ref;
    return collectionData(q, { idField: 'uid' });
  }

  getLoggedUserData(): Observable<any | null> {
    return this.authService.currentUser.pipe(
      switchMap((user) => {
        if (!user) return of(null);

        const ref = doc(this.firestore, `users/${user.uid}`);
        return docData(ref, { idField: 'uid' });
      })
    );
  }

  resetRole() {
    this.role$.next(null);
  }

  private async loadUserRole(): Promise<'admin' | 'user'> {
    const user = await firstValueFrom(this.authService.currentUser);
    if (!user) return 'user';

    const ref = doc(this.firestore, `users/${user.uid}`);
    const snapshot = await getDoc(ref);
    const role = (snapshot.data() as any)?.role ?? 'user';
    this.role$.next(role);
    return role;
  }
}
