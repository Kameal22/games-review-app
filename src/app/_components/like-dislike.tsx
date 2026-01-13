"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  likeReview,
  dislikeReview,
  removeInteraction,
  checkInteractionStatus,
} from "@/app/(protected-content)/review/interaction-utils";
import { useUserStore } from "@/stores/user-store";
import { useToastStore } from "@/stores/toast-store";
import { useRouter } from "next/navigation";

interface LikeDislikeProps {
  reviewId: string;
  initialLikes?: number;
  initialDislikes?: number;
  compact?: boolean;
}

const LikeDislike: React.FC<LikeDislikeProps> = ({
  reviewId,
  initialLikes = 0,
  initialDislikes = 0,
  compact = false,
}) => {
  const { isAuthenticated } = useUserStore();
  const { addToast } = useToastStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  // Fetch interaction status if authenticated
  const { data: interactionStatus } = useQuery({
    queryKey: ["reviewInteraction", reviewId],
    queryFn: () => checkInteractionStatus(reviewId),
    enabled: isAuthenticated && !!reviewId,
  });

  const [userInteraction, setUserInteraction] = useState<
    "like" | "dislike" | null
  >(interactionStatus?.type || null);

  // Update user interaction when status changes
  useEffect(() => {
    if (interactionStatus) {
      setUserInteraction(interactionStatus.type);
    }
  }, [interactionStatus]);

  // Update counts when initial values change
  useEffect(() => {
    setLikes(initialLikes);
    setDislikes(initialDislikes);
  }, [initialLikes, initialDislikes]);

  const likeMutation = useMutation({
    mutationFn: () => likeReview(reviewId),
    onSuccess: () => {
      // Update local state optimistically
      if (userInteraction === "dislike") {
        // Switching from dislike to like
        setDislikes((prev) => Math.max(0, prev - 1));
        setLikes((prev) => prev + 1);
      } else if (userInteraction === null) {
        // Adding a new like
        setLikes((prev) => prev + 1);
      }
      // If already liked, this shouldn't happen (button should call remove instead)
      setUserInteraction("like");

      // Invalidate queries to refresh data from server
      queryClient.invalidateQueries({ queryKey: ["review", reviewId] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["reviewInteraction", reviewId],
      });
    },
    onError: (error: Error) => {
      // Revert optimistic update on error
      if (userInteraction === "dislike") {
        setDislikes((prev) => prev + 1);
        setLikes((prev) => Math.max(0, prev - 1));
      } else if (userInteraction === null) {
        setLikes((prev) => Math.max(0, prev - 1));
      }
      setUserInteraction(userInteraction);

      addToast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to like review",
      });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: () => dislikeReview(reviewId),
    onSuccess: () => {
      // Update local state optimistically
      if (userInteraction === "like") {
        // Switching from like to dislike
        setLikes((prev) => Math.max(0, prev - 1));
        setDislikes((prev) => prev + 1);
      } else if (userInteraction === null) {
        // Adding a new dislike
        setDislikes((prev) => prev + 1);
      }
      // If already disliked, this shouldn't happen (button should call remove instead)
      setUserInteraction("dislike");

      // Invalidate queries to refresh data from server
      queryClient.invalidateQueries({ queryKey: ["review", reviewId] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["reviewInteraction", reviewId],
      });
    },
    onError: (error: Error) => {
      // Revert optimistic update on error
      if (userInteraction === "like") {
        setLikes((prev) => prev + 1);
        setDislikes((prev) => Math.max(0, prev - 1));
      } else if (userInteraction === null) {
        setDislikes((prev) => Math.max(0, prev - 1));
      }
      setUserInteraction(userInteraction);

      addToast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to dislike review",
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeInteraction(reviewId),
    onSuccess: () => {
      // Update local state optimistically
      const previousInteraction = userInteraction;
      if (previousInteraction === "like") {
        setLikes((prev) => Math.max(0, prev - 1));
      } else if (previousInteraction === "dislike") {
        setDislikes((prev) => Math.max(0, prev - 1));
      }
      setUserInteraction(null);

      // Invalidate queries to refresh data from server
      queryClient.invalidateQueries({ queryKey: ["review", reviewId] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["reviewInteraction", reviewId],
      });
    },
    onError: (error: Error) => {
      // userInteraction still has the old value since onSuccess wasn't called
      addToast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to remove interaction",
      });
    },
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      addToast({
        type: "info",
        title: "Login Required",
        message: "Please log in to like reviews",
      });
      return;
    }

    if (userInteraction === "like") {
      removeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      addToast({
        type: "info",
        title: "Login Required",
        message: "Please log in to dislike reviews",
      });
      return;
    }

    if (userInteraction === "dislike") {
      removeMutation.mutate();
    } else {
      dislikeMutation.mutate();
    }
  };

  const isPending =
    likeMutation.isPending ||
    dislikeMutation.isPending ||
    removeMutation.isPending;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          disabled={isPending}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors duration-200 ${
            userInteraction === "like"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-lightGray hover:bg-lightGrayHover text-customWhite"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title="Like this review"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
          </svg>
          <span className="text-sm font-medium">{likes}</span>
        </button>
        <button
          onClick={handleDislike}
          disabled={isPending}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors duration-200 ${
            userInteraction === "dislike"
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-lightGray hover:bg-lightGrayHover text-customWhite"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title="Dislike this review"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
          </svg>
          <span className="text-sm font-medium">{dislikes}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
          userInteraction === "like"
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-lightGray hover:bg-lightGrayHover text-customWhite"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title="Like this review"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
        </svg>
        <span className="font-medium">{likes}</span>
      </button>
      <button
        onClick={handleDislike}
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
          userInteraction === "dislike"
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-lightGray hover:bg-lightGrayHover text-customWhite"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title="Dislike this review"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
        </svg>
        <span className="font-medium">{dislikes}</span>
      </button>
    </div>
  );
};

export default LikeDislike;
