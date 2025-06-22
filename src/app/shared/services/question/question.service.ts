import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  collectionData,
  collection,
  Firestore,
  updateDoc,
  docData,
  addDoc,
  doc,
} from '@angular/fire/firestore';

import { Question, Questionnaire } from '../../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private firestore = inject(Firestore);

  getAllQuestionnaires(): Observable<Questionnaire[]> {
    const ref = collection(this.firestore, 'questionnaires');
    return collectionData(ref, { idField: 'id' }) as Observable<
      Questionnaire[]
    >;
  }

  getQuestionnaireById(id: string): Observable<Questionnaire> {
    const ref = doc(this.firestore, `questionnaires/${id}`);
    return docData(ref) as Observable<Questionnaire>;
  }

  createQuestionnaire(data: {
    name: string;
    questions?: Question[];
  }): Observable<any> {
    const ref = collection(this.firestore, 'questionnaires');
    const payload = { ...data, questions: data.questions || [] };
    return from(addDoc(ref, payload));
  }

  updateQuestionnaire(
    id: string,
    data: Partial<{ name: string; questions: Question[] }>
  ): Observable<any> {
    const ref = doc(this.firestore, `questionnaires/${id}`);
    return from(updateDoc(ref, data));
  }
}
