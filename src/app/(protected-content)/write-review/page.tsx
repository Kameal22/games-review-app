"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useGamesStore, Game } from "@/stores/games-store";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "./utils";

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
    .regex(/^\d{1,2}\/10$/, "Final score must be in X/10 format"),
});

const defaultCategories = ["Gameplay", "Soundtrack", "Graphics", "Story"].map(
  (name) => ({ name, score: "", description: "" })
);

const WriteReview: React.FC = () => {
  const [showGameSelector, setShowGameSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const gameSelectorRef = useRef<HTMLDivElement>(null);

  const { games, isLoading: gamesLoading, error: gamesError } = useGamesStore();

  useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
    enabled: games.length === 0, // Only fetch if we don't have games
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

  const filteredGames = games.filter(
    (game: Game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genres.some((genre) =>
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

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    // Create review object
    const review = {
      id: Date.now().toString(),
      game: {
        _id: data.selectedGame._id,
        title: data.selectedGame.title,
        coverImageUrl: data.selectedGame.coverImageUrl,
        genres: data.selectedGame.genres,
      },
      categories: data.categories,
      summary: data.summary,
      finalScore: data.finalScore,
      author: {
        id: currentUser.id || "1",
        name: currentUser.name || "Anonymous",
        email: currentUser.email || "anonymous@example.com",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    // Get existing reviews from localStorage
    const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    // Add new review
    existingReviews.push(review);

    // Save back to localStorage
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    console.log("Review Submitted:", review);

    // You can add navigation here if needed
    // router.push('/dashboard');

    // Show success message (you can implement a toast notification here)
    alert("Review submitted successfully!");
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
                        Error loading games: {gamesError}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultCategories.map((category, index) => (
                <div
                  key={category.name}
                  className={`flex flex-col gap-3 bg-lightGray p-4 rounded-lg ${
                    !isGameSelected ? "opacity-50" : ""
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
                    disabled={!isGameSelected}
                    {...register(`categories.${index}.score`)}
                    className={`p-3 rounded-lg bg-darkGreyBackground text-customWhite border border-transparent focus:border-customWhite outline-none ${
                      !isGameSelected ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  />
                  {errors.categories?.[index]?.score && (
                    <p className="text-red-500 text-sm">
                      {errors.categories[index].score.message}
                    </p>
                  )}
                  <textarea
                    placeholder={`Describe the ${category.name.toLowerCase()}...`}
                    disabled={!isGameSelected}
                    {...register(`categories.${index}.description`)}
                    rows={3}
                    className={`p-3 rounded-lg bg-darkGreyBackground text-customWhite border border-transparent focus:border-customWhite outline-none resize-none ${
                      !isGameSelected ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  />
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
              disabled={!isGameSelected}
              {...register("summary")}
              rows={6}
              className={`w-full p-3 rounded-lg bg-lightGray text-customWhite border border-transparent focus:border-customWhite outline-none resize-none ${
                !isGameSelected ? "cursor-not-allowed opacity-50" : ""
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
              type="text"
              placeholder="Final Score (e.g. 9/10)"
              disabled={!isGameSelected}
              {...register("finalScore")}
              className={`w-full p-3 rounded-lg bg-lightGray text-customWhite border border-transparent focus:border-customWhite outline-none ${
                !isGameSelected ? "cursor-not-allowed opacity-50" : ""
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
            disabled={!isGameSelected}
            className={`font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-auto ${
              isGameSelected
                ? "bg-customWhite text-darkBackground hover:bg-gray-200"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
