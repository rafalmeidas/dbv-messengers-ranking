import { Routes } from '@angular/router';

import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';

export const ROUTES: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'create', component: QuestionFormComponent },
  { path: 'edit/:id', component: QuestionFormComponent },
];
