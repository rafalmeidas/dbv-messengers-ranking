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

import { Trailblazer } from '../../models/trailblazer';

@Injectable({
  providedIn: 'root',
})
export class TrailblazerService {
  private firestore = inject(Firestore);

  getAllTrailblazers(): Observable<Trailblazer[]> {
    const ref = collection(this.firestore, 'trailblazers');
    return collectionData(ref, { idField: 'id' }) as Observable<Trailblazer[]>;
  }

  getTrailblazerById(id: string): Observable<Trailblazer> {
    const ref = doc(this.firestore, `trailblazers/${id}`);
    return docData(ref) as Observable<Trailblazer>;
  }

  createTrailblazer(data: { name: string; unitUid: string }) {
    const ref = collection(this.firestore, 'trailblazers');
    return addDoc(ref, data);
  }

  updateTrailblazer(
    id: string,
    data: Partial<{ name: string; unitUid: string }>
  ) {
    const ref = doc(this.firestore, `trailblazers/${id}`);
    return updateDoc(ref, data);
  }
}
