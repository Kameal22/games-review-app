"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Game } from "@/app/types/game";
import Pagination from "./_components/pagination";
import SingleGame from "./_components/single-game";
import { fetchGames, fetchWatchlist } from "./utils";
import GamesSearch from "./_components/games-search";
import { Watchlist } from "@/app/types/watchlist";

const GamesList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const gamesPerPage = 6;

  const { data: watchlist } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
  });

  // Fetch reviews on component mount
  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  // Create a set of watchlisted game IDs for efficient lookup
  const watchlistedGameIds = new Set(
    watchlist?.map((item: Watchlist) => item.game._id)
  );

  // Filter and sort games: watchlisted games first, then others
  const filteredGames = (games || [])
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

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-customWhite text-xl lg:text-2xl font-semibold">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Browse Games"}
        </h2>
        <p className="text-greyText text-base lg:text-lg leading-relaxed">
          {searchTerm
            ? "Discover games matching your search criteria"
            : "Explore our extensive collection of games across all genres and platforms. Find your next favorite title and add games to your watchlist."}
        </p>
      </div>

      <GamesSearch
        searchTerm={searchTerm}
        onSearchChange={(term: string) => {
          setSearchTerm(term);
          setCurrentPage(1); // Reset to first page when searching
        }}
      />

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
              {error?.message || "Something went wrong"}
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
                watchlist={watchlist}
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

export default GamesList;
