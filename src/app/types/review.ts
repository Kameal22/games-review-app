export type ReviewUser = {
    _id: string;
    displayName: string;
  };
  
  export type ReviewGame = {
    _id: string;
    slug: string;
    coverImageUrl: string;
    genres: string[];
    releaseDate: string;
    title: string;
  };

export type Review = {
    _id: string;
    user: ReviewUser;
    game: ReviewGame;
    gameplay: number;
    story: number;
    soundtrack: number;
    graphics: number;
    optimization: number;
    worldDesign: number;
    finalScore: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };