"use client";

import Watchlist from "./watchlist/watchlist";
import { Watchlist as WatchlistType } from "@/app/types/watchlist";
import { getScoreBackground } from "@/app/global-utils/get-score-background";

const UserUtils: React.FC<{
  watchlist: WatchlistType[];
  insights: { averageFinalScore: number; reviewCount: number };
}> = ({ watchlist, insights }) => {
  return (
    <div className="flex-1 lg:basis-[30%] flex flex-col justify-between gap-6">
      <div>
        <p className="text-customWhite text-xl lg:text-2xl">Watchlist</p>
        <Watchlist watchlist={watchlist} />
      </div>
      <div>
        <p className="text-customWhite text-xl lg:text-2xl font-semibold mb-6">
          Profile Insights
        </p>

        <div className="space-y-4">
          <div
            className={`${getScoreBackground(
              insights.averageFinalScore
            )} rounded-lg p-4 text-center`}
          >
            <div className="text-2xl font-bold text-customWhite mb-1">
              {insights.averageFinalScore.toFixed(1)}
            </div>
            <div className="text-sm text-greyText">Average Score</div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-customWhite mb-1">
              {insights.reviewCount}
            </div>
            <div className="text-sm text-greyText">Total Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUtils;
