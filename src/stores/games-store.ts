import { create } from 'zustand';

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

export type GamesState = {
  games: Game[];
  isLoading: boolean;
  error: string | null;
};

export type GamesActions = {
  setGames: (games: Game[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

export type GamesStore = GamesState & GamesActions;

export const useGamesStore = create<GamesStore>((set) => ({
  // Initial state
  games: [],
  isLoading: false,
  error: null,

  // Actions
  setGames: (games: Game[]) => {
    set({ games, error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
