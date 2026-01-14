"use client";

import { useState } from "react";
import Pagination from "@/app/_components/pagination";
import { Watchlist as WatchlistType } from "@/app/types/watchlist";
import Image from "next/image";

const Watchlist: React.FC<{ watchlist: WatchlistType[] }> = ({ watchlist }) => {
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
    <div className="mt-4 flex-1 lg:basis-[40%]">
      <p className="text-customWhite text-xl lg:text-2xl font-semibold mb-2">
        Lista życzeń
      </p>
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
              Brak gier na liście życzeń
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
