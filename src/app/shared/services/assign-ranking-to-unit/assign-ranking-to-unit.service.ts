import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {
  collection,
  updateDoc,
  addDoc,
  query,
  where,
  doc,
} from 'firebase/firestore';

import { AssignRankingToUnit } from '../../models/assign-ranking-to-unit.model';

@Injectable({
  providedIn: 'root',
})
export class AssignRankingToUnitService {
  constructor() {}

  private readonly firestore = inject(Firestore);
  private readonly _auth = inject(Auth);

  getAllAssignRankingToUnit(): Observable<AssignRankingToUnit[]> {
    const ref = collection(this.firestore, 'assign-ranking-to-unit');
    return collectionData(ref, { idField: 'id' }) as Observable<
      AssignRankingToUnit[]
    >;
  }

  getAssignRankingToUnitByCurrentUserAndActive(
    active: boolean = true
  ): Observable<AssignRankingToUnit[]> {
    const ref = collection(this.firestore, 'assign-ranking-to-unit');
    const q = query(
      ref,
      where('uid', '==', this._auth.currentUser?.uid),
      where('active', '==', active)
    );

    return collectionData(q, { idField: 'id' }) as Observable<
      AssignRankingToUnit[]
    >;
  }

  getAssignRankingToUnitById(id: string): Observable<AssignRankingToUnit> {
    const ref = doc(this.firestore, `assign-ranking-to-unit/${id}`);
    return docData(ref) as Observable<AssignRankingToUnit>;
  }

  createAssignRankingToUnit(data: AssignRankingToUnit) {
    const ref = collection(this.firestore, 'assign-ranking-to-unit');
    return addDoc(ref, data);
  }

  updateAssignRankingToUnit(id: string, data: Partial<AssignRankingToUnit>) {
    const ref = doc(this.firestore, `assign-ranking-to-unit/${id}`);
    return updateDoc(ref, data);
  }
}
