import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Game } from '@/app/types/game';


export type ReviewsState = {
  selectedGameFromDashboard: Game | null;
};

export type ReviewsActions = {
  setSelectedGameFromDashboard: (game: Game) => void;
  clearSelectedGameFromDashboard: () => void;
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
    }),
    {
      name: 'reviews-storage',
      partialize: (state) => ({ 
        selectedGameFromDashboard: state.selectedGameFromDashboard,
      }),
    }
  )
);
