import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Game } from '@/app/types/game';


export type ReviewsState = {
  selectedGameFromDashboard: Game | null;
};

export type ReviewsActions = {
  setSelectedGameFromDashboard: (game: Game) => void;
  clearSelectedGameFromDashboard: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export type ReviewsStore = ReviewsState & ReviewsActions;

export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set) => ({
      // Initial state
      selectedGameFromDashboard: null,
      
      // Actions
      setSelectedGameFromDashboard: (game: Game) => {
        set({ selectedGameFromDashboard: game });
      },

      clearSelectedGameFromDashboard: () => {
        set({ selectedGameFromDashboard: null });
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setLoading: (_loading: boolean) => {
        // This method is kept for compatibility with write-review/utils.ts
        // but the loading state is not stored in the store anymore
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setError: (_error: string | null) => {
        // This method is kept for compatibility with write-review/utils.ts
        // but the error state is not stored in the store anymore
      },
    }),
    {
      name: 'reviews-storage',
      partialize: (state) => ({ 
        selectedGameFromDashboard: state.selectedGameFromDashboard,
      }),
    }
  )
);
