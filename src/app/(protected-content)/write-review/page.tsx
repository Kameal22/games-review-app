"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import { useReviewsStore } from "@/stores/reviews-store";
import { useToastStore } from "@/stores/toast-store";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/app/(protected-content)/dashboard/@games/utils";
import { saveReview, checkIfGameIsReviewed } from "./utils";
import { Game } from "@/app/types/game";

const reviewSchema = z.object({
  selectedGame: z.object({
    _id: z.string().min(1, "Please select a game"),
    title: z.string().min(1, "Please select a game"),
    coverImageUrl: z.string(),
    genres: z.array(z.string()).default([]),
  }),
  categories: z.array(
    z.object({
      name: z.string(),
      score: z.string().regex(/^\d+$/, "Score must be a number").max(10),
      description: z.string().optional(),
    })
  ),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  finalScore: z
    .string()
    .regex(/^\d+$/, "Final score must be a number")
    .refine((val) => {
      const num = parseInt(val);
      return num >= 1 && num <= 10;
    }, "Final score must be between 1 and 10"),
});

const defaultCategories = ["Gameplay", "Soundtrack", "Graphics", "Story"].map(
  (name) => ({ name, score: "", description: "" })
);

const WriteReview: React.FC = () => {
  const [showGameSelector, setShowGameSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const gameSelectorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { user } = useUserStore();
  const {
    addReview,
    selectedGameFromDashboard,
    clearSelectedGameFromDashboard,
  } = useReviewsStore();
  const { addToast } = useToastStore();

  const {
    data: games,
    isLoading: gamesLoading,
    error: gamesError,
  } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      selectedGame: {
        _id: "",
        title: "",
        coverImageUrl: "",
        genres: [] as string[],
      },
      categories: defaultCategories,
      summary: "",
      finalScore: "",
    },
  });

  const selectedGame = watch("selectedGame");
  const isGameSelected = selectedGame.title !== "";

  // Auto-populate game selection if coming from dashboard
  useEffect(() => {
    if (selectedGameFromDashboard && !isGameSelected) {
      setValue("selectedGame", {
        _id: selectedGameFromDashboard._id,
        title: selectedGameFromDashboard.title,
        coverImageUrl: selectedGameFromDashboard.coverImageUrl,
        genres: selectedGameFromDashboard.genres,
      });
    }

    return () => {
      clearSelectedGameFromDashboard();
    };
  }, [
    selectedGameFromDashboard,
    isGameSelected,
    setValue,
    clearSelectedGameFromDashboard,
  ]);

  useEffect(() => {
    return () => {
      clearSelectedGameFromDashboard();
    };
  }, [clearSelectedGameFromDashboard]);

  const filteredGames = (games || []).filter(
    (game: Game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genres.some((genre: string) =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleGameSelect = (game: Game) => {
    setValue("selectedGame", {
      _id: game._id,
      title: game.title,
      coverImageUrl: game.coverImageUrl,
      genres: game.genres,
    });
    setShowGameSelector(false);
    setSearchTerm("");
  };

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    if (!user) {
      addToast({
        type: "error",
        title: "Authentication Error",
        message: "You must be logged in to submit a review",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform form data to match API expected structure
      const reviewData = {
        gameId: data.selectedGame._id,
        gameplay: parseInt(
          data.categories.find((c) => c.name === "Gameplay")?.score || "0"
        ),
        story: parseInt(
          data.categories.find((c) => c.name === "Story")?.score || "0"
        ),
        soundtrack: parseInt(
          data.categories.find((c) => c.name === "Soundtrack")?.score || "0"
        ),
        graphics: parseInt(
          data.categories.find((c) => c.name === "Graphics")?.score || "0"
        ),
        optimization: 0, // Not in form, set to 0
        worldDesign: 0, // Not in form, set to 0
        finalScore: parseInt(data.finalScore),
        text: data.summary,
      };

      // Save review via API
      const savedReview = await saveReview(reviewData);

      // Add to local store (with safety check in the store)
      addReview(savedReview);

      // Show success message
      addToast({
        type: "success",
        title: "Review Submitted!",
        message: "Your review has been successfully submitted and is now live.",
      });

      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting review:", error);

      addToast({
        type: "error",
        title: "Submission Failed",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit review. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle click outside to close game selector
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        gameSelectorRef.current &&
        !gameSelectorRef.current.contains(event.target as Node)
      ) {
        setShowGameSelector(false);
        setSearchTerm("");
      }
    };

    if (showGameSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGameSelector]);

  const { data: reviewCheckData, isLoading: isCheckingReview } = useQuery({
    queryKey: ["checkIfGameIsReviewed", selectedGame._id],
    queryFn: () => checkIfGameIsReviewed(selectedGame._id),
    enabled: !!selectedGame._id,
  });

  // Check if the user has already reviewed this game
  const hasAlreadyReviewed =
    reviewCheckData?.message === "You already reviewed this game";

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="bg-lightGray rounded-xl p-4 w-full h-full flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-semibold text-customWhite mb-2">
            Write a Review
          </h1>
          <p className="text-greyText text-sm lg:text-base">
            Share your thoughts about a game with the community
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 flex-1"
        >
          {/* Game Selection */}
          <div className="bg-lightGrayHover p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-customWhite mb-4">
              Select a Game
            </h2>

            {selectedGame.title ? (
              <div className="flex items-center gap-4 p-3 bg-lightGray rounded-lg">
                <Image
                  src={selectedGame.coverImageUrl}
                  alt={selectedGame.title}
                  width={80}
                  height={80}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-customWhite font-medium text-lg">
                    {selectedGame.title}
                  </h3>
                  <p className="text-greyText text-sm">
                    {selectedGame.genres.join(", ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setValue("selectedGame", {
                      _id: "",
                      title: "",
                      coverImageUrl: "",
                      genres: [],
                    })
                  }
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="relative" ref={gameSelectorRef}>
                <input
                  type="text"
                  placeholder="Search for a game..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowGameSelector(true)}
                  className="w-full p-3 rounded-lg bg-lightGray text-customWhite placeholder-greyText cursor-pointer  "
                />

                {showGameSelector && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-lightGray rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
                    {gamesLoading ? (
                      <div className="p-3 text-greyText text-center">
                        Loading games...
                      </div>
                    ) : gamesError ? (
                      <div className="p-3 text-red-500 text-center">
                        Error loading games: {gamesError?.message}
                      </div>
                    ) : filteredGames.length > 0 ? (
                      filteredGames.map((game: Game) => (
                        <div
                          key={game._id}
                          onClick={() => handleGameSelect(game)}
                          className="flex items-center gap-3 p-3 hover:bg-lightGrayHover cursor-pointer border-b border-darkGreyBackground last:border-b-0"
                        >
                          <Image
                            src={game.coverImageUrl}
                            alt={game.title}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-customWhite font-medium">
                              {game.title}
                            </p>
                            <p className="text-greyText text-sm">
                              {game.genres.join(", ")}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-greyText text-center">
                        No games found
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {errors.selectedGame && (
              <p className="text-red-500 text-sm mt-2">
                {errors.selectedGame.message}
              </p>
            )}

            {/* Already Reviewed Warning */}
            {isGameSelected && !isCheckingReview && hasAlreadyReviewed && (
              <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-yellow-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-yellow-500 font-medium">
                      You&apos;ve already reviewed this game
                    </p>
                    <p className="text-yellow-400/80 text-sm mt-1">
                      You can only write one review per game. Please select a
                      different game or edit your existing review.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Review Categories */}
          <div className="bg-lightGrayHover p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-customWhite mb-4">
              Rate Categories
            </h2>
            {!isGameSelected && (
              <p className="text-greyText text-sm mb-4">
                Please select a game first to enable review inputs
              </p>
            )}
            {isGameSelected && hasAlreadyReviewed && (
              <p className="text-yellow-500 text-sm mb-4">
                You cannot review this game as you have already submitted a
                review for it
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultCategories.map((category, index) => (
                <div
                  key={category.name}
                  className={`flex flex-col gap-3 bg-lightGray p-4 rounded-lg ${
                    !isGameSelected || hasAlreadyReviewed ? "opacity-50" : ""
                  }`}
                >
                  <p className="text-lg font-medium text-customWhite">
                    {category.name}
                  </p>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Score (1-10)"
                    disabled={!isGameSelected || hasAlreadyReviewed}
                    {...register(`categories.${index}.score`)}
                    className={`p-3 rounded-lg bg-darkGreyBackground text-customWhite border border-transparent focus:border-customWhite outline-none ${
                      !isGameSelected || hasAlreadyReviewed
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  />
                  {errors.categories?.[index]?.score && (
                    <p className="text-red-500 text-sm">
                      {errors.categories[index].score.message}
                    </p>
                  )}
                  {/* <textarea
                    placeholder={`Describe the ${category.name.toLowerCase()}...`}
                    disabled={!isGameSelected}
                    {...register(`categories.${index}.description`)}
                    rows={3}
                    className={`p-3 rounded-lg bg-darkGreyBackground text-customWhite border border-transparent focus:border-customWhite outline-none resize-none ${
                      !isGameSelected ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  /> */}
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-lightGrayHover p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-customWhite mb-4">
              Review Summary
            </h2>
            <textarea
              placeholder="Write a comprehensive summary of your review..."
              disabled={!isGameSelected || hasAlreadyReviewed}
              {...register("summary")}
              rows={6}
              className={`w-full p-3 rounded-lg bg-lightGray text-customWhite border border-transparent focus:border-customWhite outline-none resize-none ${
                !isGameSelected || hasAlreadyReviewed
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            />
            {errors.summary && (
              <p className="text-red-500 text-sm mt-2">
                {errors.summary.message}
              </p>
            )}
          </div>

          {/* Final Score */}
          <div className="bg-lightGrayHover p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-customWhite mb-4">
              Final Score
            </h2>
            <input
              type="number"
              min="1"
              max="10"
              placeholder="Score (1-10)"
              disabled={!isGameSelected || hasAlreadyReviewed}
              {...register("finalScore")}
              className={`w-full p-3 rounded-lg bg-lightGray text-customWhite border border-transparent focus:border-customWhite outline-none ${
                !isGameSelected || hasAlreadyReviewed
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            />
            {errors.finalScore && (
              <p className="text-red-500 text-sm mt-2">
                {errors.finalScore.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isGameSelected || isSubmitting || hasAlreadyReviewed}
            className={`font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-auto flex items-center justify-center gap-2 ${
              isGameSelected && !isSubmitting && !hasAlreadyReviewed
                ? "bg-customWhite text-darkBackground hover:bg-gray-200"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
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
                Submitting...
              </>
            ) : hasAlreadyReviewed ? (
              "Already Reviewed"
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
