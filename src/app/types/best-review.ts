import { Game } from "./game";

export type BestReview = {
    _id: string;
    finalScore: number;
    user: {
      _id: string;
      displayName: string;
    };
    game: Game;
  };