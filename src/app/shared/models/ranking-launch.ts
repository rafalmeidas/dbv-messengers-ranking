export interface QuestionAnswer {
  text: string;
  points: number;
  active: boolean;
}

export interface RankingLaunch {
  rankingId: string;
  unitUid: string;
  trailblazerUid: string;
  date: string | Date;
  observations: string;
  answers: QuestionAnswer[];
}
