"use client";

import Watchlist from "./watchlist/watchlist";

const UserUtils: React.FC = () => {
  return (
    <div className="flex-1 lg:basis-[30%] flex flex-col justify-between gap-6">
      <div>
        <p className="text-customWhite text-xl lg:text-2xl">Watchlist</p>
        <Watchlist />
      </div>
      <div>
        <p className="text-customWhite text-xl lg:text-2xl">Profile Insights</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-customWhite text-sm lg:text-base">-</p>
        </div>
        {/* 
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-customWhite text-sm lg:text-base">
            Reviews Written: 7
          </p>
          <p className="text-customWhite text-sm lg:text-base">
            Average Rating: 7.7
          </p>
          <p className="text-customWhite text-sm lg:text-base">
            Favorite Genre: RPG
          </p>
          <p className="text-customWhite text-sm lg:text-base">
            Top Rated Game: Disco Elysium
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default UserUtils;
