"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGamesStore, Game } from "@/stores/games-store";
import { useWatchlistStore } from "@/stores/watchlist.store";
import Pagination from "./pagination";
import SingleGame from "./single-game";
import { fetchGames } from "../utils";
import GamesSearch from "./games-search";

const GamesListDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const gamesPerPage = 6;

  // Get games and watchlist from Zustand stores
  const { games, isLoading, error } = useGamesStore();
  const { watchlist } = useWatchlistStore();

  // Fetch reviews on component mount
  useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  // Create a set of watchlisted game IDs for efficient lookup
  const watchlistedGameIds = new Set(watchlist.map((item) => item.game._id));

  // Filter and sort games: watchlisted games first, then others
  const filteredGames = games
    .filter(
      (game: Game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genres.some((genre) =>
          genre.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        game?.platforms?.some((platform) =>
          platform.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a: Game, b: Game) => {
      const aIsWatchlisted = watchlistedGameIds.has(a._id);
      const bIsWatchlisted = watchlistedGameIds.has(b._id);

      // If one is watchlisted and the other isn't, prioritize the watchlisted one
      if (aIsWatchlisted && !bIsWatchlisted) return -1;
      if (!aIsWatchlisted && bIsWatchlisted) return 1;

      // If both are watchlisted or both are not, maintain original order
      return 0;
    });

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const currentGames = filteredGames.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleSearchChange = (term: string) => {
  //   setSearchTerm(term);
  //   setCurrentPage(1); // Reset to first page when searching
  // };

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <GamesSearch
        searchTerm={searchTerm}
        onSearchChange={(term: string) => {
          setSearchTerm(term);
          setCurrentPage(1); // Reset to first page when searching
        }}
      />
      <p className="text-customWhite text-lg lg:text-xl">
        {searchTerm ? `Search Results for "${searchTerm}"` : "Games List"}
      </p>

      <div className="flex flex-col gap-4 flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-customWhite text-lg text-center">
              Loading games...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-red-500 text-lg text-center">
              Error loading games
            </p>
            <p className="text-greyText text-sm text-center">
              {error || "Something went wrong"}
            </p>
          </div>
        ) : currentGames.length > 0 ? (
          <>
            {currentGames.map((game: Game) => (
              <SingleGame
                key={game._id}
                data={{
                  title: game.title,
                  genres: game.genres,
                  rating: game.rating,
                  coverImageUrl: game.coverImageUrl,
                  _id: game._id,
                  createdAt: game.createdAt,
                }}
              />
            ))}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-greyText text-lg text-center">No games found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesListDashboard;
