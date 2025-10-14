"use client";

import { useState } from "react";
import Pagination from "@/app/_components/pagination";
import { useWatchlistStore } from "@/stores/watchlist.store";
import Image from "next/image";

const Watchlist: React.FC = () => {
  const { watchlist, isLoading, error } = useWatchlistStore();
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;

  const totalPages = Math.ceil(watchlist.length / gamesPerPage);

  const watchlistGames = watchlist.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="flex flex-col gap-4 flex-1 justify-center items-center">
          <p className="text-greyText text-lg text-center">
            Loading watchlist...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-4">
        <div className="flex flex-col gap-4 flex-1 justify-center items-center">
          <p className="text-red-500 text-lg text-center">
            Error loading watchlist
          </p>
          <p className="text-greyText text-sm text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-3">
        {watchlistGames.length > 0 ? (
          watchlistGames.map((data, index) => (
            <div
              key={index}
              className="bg-lightGray rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center w-full cursor-pointer hover:bg-lightGrayHover gap-3"
            >
              <div className="flex-shrink-0">
                <Image
                  width={128}
                  height={128}
                  src={data.game.coverImageUrl}
                  alt={data.game.title}
                  className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-customWhite text-base lg:text-lg font-medium truncate">
                  {data.game.title}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-greyText text-lg text-center">
              No games in watchlist
            </p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Watchlist;
