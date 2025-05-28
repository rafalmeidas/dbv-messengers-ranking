export interface Question {
  text: string;
  points: number;
}

export interface Questionnaire {
  id?: string;
  name: string;
  questions: Question[];
}
