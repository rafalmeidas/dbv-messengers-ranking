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

  createQuestionnaire(data: { name: string; questions?: Question[] }) {
    const ref = collection(this.firestore, 'questionnaires');
    const payload = { ...data, questions: data.questions || [] };
    return addDoc(ref, payload);
  }

  updateQuestionnaire(
    id: string,
    data: Partial<{ name: string; questions: Question[] }>
  ) {
    const ref = doc(this.firestore, `questionnaires/${id}`);
    return updateDoc(ref, data);
  }

  async addQuestion(id: string, question: Question) {
    const ref = doc(this.firestore, `questionnaires/${id}`);
    const questionnaireSnap = await docData(ref).toPromise();
    const currentQuestions =
      (questionnaireSnap as Questionnaire).questions || [];
    const updatedQuestions = [...currentQuestions, question];
    return updateDoc(ref, { questions: updatedQuestions });
  }

  async removeQuestion(id: string, questionIndex: number) {
    const ref = doc(this.firestore, `questionnaires/${id}`);
    const questionnaireSnap = await docData(ref).toPromise();
    const currentQuestions =
      (questionnaireSnap as Questionnaire).questions || [];
    const updatedQuestions = currentQuestions.filter(
      (_, index) => index !== questionIndex
    );
    return updateDoc(ref, { questions: updatedQuestions });
  }
}
