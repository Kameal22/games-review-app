"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { fetchReview } from "../utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import { getScoreBackground } from "@/app/global-utils/get-score-background";
import { useUserStore } from "@/stores/user-store";
import {
  deleteReview,
  updateReviewText,
} from "@/app/(protected-content)/my-account/utils";
import { useToastStore } from "@/stores/toast-store";
import ConfirmModal from "@/app/_components/confirm-modal";
import LikeDislike from "@/app/_components/like-dislike";
import { useState, useRef, useEffect } from "react";

const ReviewPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated } = useUserStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: review,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review", params.id],
    queryFn: () => fetchReview(params.id as string),
    enabled: !!params.id, // Only run query if we have an ID
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["review", params.id] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      addToast({
        type: "success",
        title: "Sukces",
        message: "Recenzja została pomyślnie usunięta",
      });
      setShowDeleteModal(false);
      // Redirect to dashboard after deletion
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      addToast({
        type: "error",
        title: "Błąd",
        message: error.message || "Nie udało się usunąć recenzji",
      });
      setShowDeleteModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ reviewId, text }: { reviewId: string; text: string }) =>
      updateReviewText(reviewId, text),
    onSuccess: () => {
      // Invalidate queries to refresh the review
      queryClient.invalidateQueries({ queryKey: ["review", params.id] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      addToast({
        type: "success",
        title: "Sukces",
        message: "Recenzja została pomyślnie zaktualizowana",
      });
      setIsEditing(false);
    },
    onError: (error: Error) => {
      addToast({
        type: "error",
        title: "Błąd",
        message: error.message || "Nie udało się zaktualizować recenzji",
      });
    },
  });

  // Initialize edited text when review loads or edit mode is enabled
  useEffect(() => {
    if (review && isEditing) {
      setEditedText(review.text);
      // Focus textarea after a short delay to ensure it's rendered
      setTimeout(() => {
        textareaRef.current?.focus();
        // Move cursor to end
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(
            textareaRef.current.value.length,
            textareaRef.current.value.length
          );
        }
      }, 0);
    }
  }, [review, isEditing]);

  const handleEditClick = () => {
    if (review) {
      setIsEditing(true);
      setEditedText(review.text);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText("");
  };

  const handleSaveEdit = () => {
    if (review && editedText.trim() !== review.text.trim()) {
      updateMutation.mutate({ reviewId: review._id, text: editedText.trim() });
    } else {
      setIsEditing(false);
    }
  };

  // Check if current user owns this review
  const isOwner =
    isAuthenticated && user && review && review.user._id === user._id;

  // Show loading state
  if (isLoading) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className="bg-darkBackground p-2"
      >
        <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
          <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-customWhite text-lg">Ładowanie recenzji...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className="bg-darkBackground p-2"
      >
        <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
          <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-500 text-lg">Błąd ładowania recenzji</p>
                <p className="text-greyText text-sm mt-2">
                  {error instanceof Error
                    ? error.message
                    : "Coś poszło nie tak"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!review) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className="bg-darkBackground p-2"
      >
        <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
          <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-customWhite text-lg">
                Recenzja nie znaleziona
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 7rem)" }}
      className="bg-darkBackground p-2"
    >
      <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
        <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 min-w-0">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-shrink">
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 flex-shrink-0 text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="hidden sm:inline">Powrót</span>
              </button>
              <h1 className="text-customWhite text-base sm:text-lg lg:text-xl truncate min-w-0">
                Szczegóły recenzji
              </h1>
            </div>
            {isOwner && !isEditing && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleEditClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                  title="Edytuj recenzję"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Edytuj</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={deleteMutation.isPending}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                  title="Usuń recenzję"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span className="hidden sm:inline">Usuń</span>
                </button>
              </div>
            )}
          </div>

          {/* Game Information */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={review.game.coverImageUrl}
                  alt={review.game.title}
                  width={200}
                  height={280}
                  className="w-32 h-40 lg:w-48 lg:h-64 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-customWhite text-xl lg:text-2xl font-bold mb-2">
                  {review.game.title}
                </h2>

                {/* <div className="flex flex-wrap gap-2 mb-3">
                  {review.game.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-lightGray text-customWhite px-2 py-1 rounded text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div> */}

                <p className="text-greyText mb-3">
                  Wydano: {formatDate(review.game.releaseDate)}
                </p>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-greyText text-sm">Ocena końcowa</p>
                    <div
                      className={`text-3xl lg:text-4xl font-bold ${getScoreColor(
                        review.finalScore
                      )}`}
                    >
                      {review.finalScore}/10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Scores */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <h3 className="text-customWhite text-lg font-bold mb-3">
              Szczegółowa ocena
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: "Rozgrywka", score: review.gameplay },
                { label: "Fabuła", score: review.story },
                { label: "Ścieżka dźwiękowa", score: review.soundtrack },
                { label: "Grafika", score: review.graphics },
              ].map(({ label, score }) => (
                <div
                  key={label}
                  className={`p-3 rounded-lg border ${getScoreBackground(
                    score
                  )}`}
                >
                  <p className="text-greyText text-sm mb-1">{label}</p>
                  <p className={`text-xl font-bold ${getScoreColor(score)}`}>
                    {score}/10
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-customWhite text-lg font-bold">Recenzja</h3>
              {isOwner && isEditing && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancelEdit}
                    disabled={updateMutation.isPending}
                    className="px-3 py-1.5 bg-lightGray hover:bg-lightGrayHover disabled:bg-gray-600 disabled:cursor-not-allowed text-customWhite rounded-lg transition-colors duration-200 text-sm"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={
                      updateMutation.isPending ||
                      editedText.trim() === review.text.trim()
                    }
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm flex items-center gap-2"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Zapisywanie...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Zapisz
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            {isEditing && isOwner ? (
              <textarea
                ref={textareaRef}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full bg-darkGreyBackground border border-lightGray rounded-lg p-4 text-customWhite placeholder-greyText focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[200px] leading-relaxed"
                placeholder="Napisz swoją recenzję tutaj..."
                disabled={updateMutation.isPending}
              />
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="text-customWhite whitespace-pre-line leading-relaxed">
                  {review.text}
                </p>
              </div>
            )}
          </div>

          {/* Like/Dislike Section */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <h3 className="text-customWhite text-lg font-bold mb-3">
              Opinie społeczności
            </h3>
            <LikeDislike
              reviewId={review._id}
              initialLikes={review.likes || 0}
              initialDislikes={review.dislikes || 0}
              compact={false}
            />
          </div>

          {/* Author Information */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <h3 className="text-customWhite text-lg font-bold mb-3">
              Recenzent
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-lightGray rounded-full flex items-center justify-center">
                <span className="text-customWhite font-bold">
                  {review.user.displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-customWhite font-medium">
                  {review.user.displayName}
                </p>
                <p className="text-greyText text-sm">
                  Zrecenzowano {formatDate(review.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push(`/user/${review.user.displayName}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              View Reviewer&apos;s Profile
            </button>
            <button
              onClick={() => router.push(`/game/${review.game.slug}`)}
              className="bg-lightGray hover:bg-lightGrayHover text-customWhite px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              View Game Details
            </button>
          </div> */}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (review?._id) {
            deleteMutation.mutate(review._id);
          }
        }}
        title="Usuń recenzję"
        message={
          review
            ? `Czy na pewno chcesz usunąć swoją recenzję dla "${review.game.title}"? Tej akcji nie można cofnąć.`
            : "Czy na pewno chcesz usunąć tę recenzję?"
        }
        confirmText="Usuń"
        cancelText="Anuluj"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};

export default ReviewPage;
