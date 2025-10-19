export type Game = {
    _id: string;
    slug?: string;
    __v?: number;
    coverImageUrl: string;
    createdAt: string;
    genres: string[];
    platforms?: string[];
    rating: number;
    releaseDate?: string;
    title: string;
    updatedAt?: string;
  };