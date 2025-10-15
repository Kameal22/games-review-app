import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export type ReviewsState = {
  // Recent reviews (for dashboard)
  reviews: Review[];
  // User-specific reviews (for user profile pages)
  userReviews: Review[];
  // Loading states
  isLoading: boolean;
  isLoadingUserReviews: boolean;
  // Error states
  error: string | null;
  userReviewsError: string | null;
  // Filters
  filters: {
    gameId?: string;
    userId?: string;
    minScore?: number;
    maxScore?: number;
    sortBy?: 'newest' | 'oldest' | 'highestScore' | 'lowestScore';
  };
  // Pagination
  pagination: {
    currentPage: number;
    totalPages: number;
    totalReviews: number;
    reviewsPerPage: number;
  };
};

export type ReviewsActions = {
  // Basic CRUD operations
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  
  // User-specific reviews
  setUserReviews: (reviews: Review[]) => void;
  
  // Loading and error states
  setLoading: (loading: boolean) => void;
  setUserReviewsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUserReviewsError: (error: string | null) => void;
  clearError: () => void;
  clearUserReviewsError: () => void;
  
  // Utility functions
  getReviewsByGame: (gameId: string) => Review[];
  getReviewsByUser: (userId: string) => Review[];
  
  // Clear all data
  clearAll: () => void;
};

export type ReviewsStore = ReviewsState & ReviewsActions;

export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      reviews: [],
      userReviews: [],
      isLoading: false,
      isLoadingUserReviews: false,
      error: null,
      userReviewsError: null,
      filters: {
        sortBy: 'newest',
      },
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalReviews: 0,
        reviewsPerPage: 10,
      },

      // Basic CRUD operations
      setReviews: (reviews: Review[]) => {
        set({ reviews, error: null });
      },

      addReview: (review: Review) => {
        // Only add review if it has the complete structure
        if (review.game && review.game.genres && Array.isArray(review.game.genres)) {
          set((state) => ({
            reviews: [review, ...state.reviews],
          }));
        } else {
          console.warn('Skipping review addition - incomplete data structure:', review);
        }
      },

      // User-specific reviews
      setUserReviews: (reviews: Review[]) => {
        set({ userReviews: reviews, userReviewsError: null });
      },

      // Loading and error states
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setUserReviewsLoading: (loading: boolean) => {
        set({ isLoadingUserReviews: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      setUserReviewsError: (error: string | null) => {
        set({ userReviewsError: error });
      },

      clearError: () => {
        set({ error: null });
      },

      clearUserReviewsError: () => {
        set({ userReviewsError: null });
      },

      // Utility functions
      getReviewsByGame: (gameId: string) => {
        const { reviews } = get();
        return reviews.filter((review) => review.game._id === gameId);
      },

      getReviewsByUser: (userId: string) => {
        const { reviews } = get();
        return reviews.filter((review) => review.user._id === userId);
      },

      // Clear all data
      clearAll: () => {
        set({
          reviews: [],
          userReviews: [],
          isLoading: false,
          isLoadingUserReviews: false,
          error: null,
          userReviewsError: null,
          filters: {
            sortBy: 'newest',
          },
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalReviews: 0,
            reviewsPerPage: 10,
          },
        });
      },
    }),
    {
      name: 'reviews-storage',
      partialize: (state) => ({ 
        reviews: state.reviews,
        userReviews: state.userReviews,
        filters: state.filters,
        pagination: state.pagination,
      }),
    }
  )
);
