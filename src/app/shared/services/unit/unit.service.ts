import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  collectionData,
  collection,
  Firestore,
  updateDoc,
  docData,
  addDoc,
  doc,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UnitService {
  private firestore = inject(Firestore);

  getAllUnits(): Observable<any[]> {
    const ref = collection(this.firestore, 'units');
    return collectionData(ref, { idField: 'id' });
  }

  getUnitById(id: string): Observable<any> {
    const ref = doc(this.firestore, `units/${id}`);
    return docData(ref);
  }

  createUnit(data: { name: string; counselors: string[] }) {
    const ref = collection(this.firestore, 'units');
    return addDoc(ref, data);
  }

  updateUnit(
    id: string,
    data: Partial<{ name: string; counselors: string[] }>
  ) {
    const ref = doc(this.firestore, `units/${id}`);
    return updateDoc(ref, data);
  }
}
