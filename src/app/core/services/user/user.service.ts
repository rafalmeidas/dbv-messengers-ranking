import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, firstValueFrom, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private role$ = new BehaviorSubject<'admin' | 'user' | null>(null);

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async setUserRole(role: 'admin' | 'user', uid: string): Promise<void> {
    const ref = doc(this.firestore, `users/${uid}`);
    await setDoc(ref, { role }, { merge: true });
    this.role$.next(role);
  }

  getUserRole$() {
    return this.role$.pipe(
      switchMap((role) => {
        if (role) return of(role);
        return from(this.loadUserRole());
      })
    );
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

  resetRole() {
    this.role$.next(null);
  }
}
