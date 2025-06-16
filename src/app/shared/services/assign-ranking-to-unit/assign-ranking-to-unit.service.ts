import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AssignRankingToUnit } from '../../models/assign-ranking-to-unit.model';

@Injectable({
  providedIn: 'root',
})
export class AssignRankingToUnitService {
  constructor() {}

  private firestore = inject(Firestore);

  getAllAssignRankingToUnit(): Observable<AssignRankingToUnit[]> {
    const ref = collection(this.firestore, 'assign-ranking-to-unit');
    return collectionData(ref, { idField: 'id' }) as Observable<
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
