import { addDoc, collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { RankingLaunch } from '../../models/ranking-launch';

@Injectable({
  providedIn: 'root',
})
export class RankingLaunchService {
  private firestore = inject(Firestore);

  createLaunch(data: RankingLaunch): Observable<any> {
    const ref = collection(this.firestore, 'ranking-launches');

    const payload = {
      ...data,
      date: data.date instanceof Date ? data.date : new Date(data.date),
    };
    return from(addDoc(ref, payload));
  }
}
