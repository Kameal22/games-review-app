import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WatchlistUser = {
  _id: string;
  displayName: string;
};

export type WatchlistGame = {
  _id: string;
  game: {
    _id: string;
    title: string;
    coverImageUrl: string;
    genres: string[];
    releaseDate: string;
  };
  slug: string;
  coverImageUrl: string;
  genres: string[];
  releaseDate: string;
  title: string;
};

export type WatchlistState = {
  watchlist: WatchlistGame[];
  // Loading states
  isLoading: boolean;
  // Error states
  error: string | null;
};

export type WatchlistActions = {
  // Basic CRUD operations
  setWatchlist: (watchlist: WatchlistGame[]) => void;
  addToWatchlist: (game: WatchlistGame) => void;
  removeFromWatchlist: (gameId: string) => void;
  // Loading and error states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  // Clear all data
  clearAll: () => void;
};

export type WatchlistStore = WatchlistState & WatchlistActions;

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      // Initial state
      watchlist: [],
      isLoading: false,
      error: null,
      // Basic CRUD operations
      setWatchlist: (watchlist: WatchlistGame[]) => {
        set({ watchlist, error: null });
      },

      addToWatchlist: (game: WatchlistGame) => {
        set((state) => ({
          watchlist: [game, ...state.watchlist],
        }));
      },

      removeFromWatchlist: (gameId: string) => {
        set((state) => ({
          watchlist: state.watchlist.filter((game) => game.game._id !== gameId),
        }));
      },

      // Loading and error states
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Clear all data
      clearAll: () => {
        set({
          watchlist: [],
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'watchlist-storage',
      partialize: (state) => ({ 
        watchlist: state.watchlist,
      }),
    }
  )
);
