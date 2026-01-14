"use client";

import { useState } from "react";
import Pagination from "@/app/_components/pagination";
import Image from "next/image";

interface WatchlistItem {
  _id: string;
  game: {
    _id: string;
    title: string;
    coverImageUrl: string;
    slug: string;
  };
}

interface WatchlistProps {
  watchlist: WatchlistItem[];
  onGameClick: (gameSlug: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, onGameClick }) => {
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

  return (
    <div>
      <div className="space-y-3">
        {watchlistGames.length > 0 ? (
          watchlistGames.map((item) => (
            <div
              key={item._id}
              onClick={() => onGameClick(item.game.slug)}
              className="bg-darkGreyBackground rounded-lg p-3 cursor-pointer hover:bg-darkGreyBackground/80 transition-colors duration-200"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item.game.coverImageUrl}
                    alt={item.game.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-customWhite text-base font-medium truncate">
                    {item.game.title}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-greyText text-sm">Brak gier na liście życzeń</p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Watchlist;
