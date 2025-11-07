import { getScoreBackground } from "@/app/global-utils/get-score-background";

const Insights: React.FC<{
  insights: { averageFinalScore: number; reviewCount: number };
}> = ({ insights }) => {
  return (
    <div className="flex-1 lg:basis-[60%]">
      <p className="text-customWhite text-xl lg:text-2xl font-semibold mb-6">
        Profile Insights
      </p>

      <div className="space-y-4">
        <div
          className={`${getScoreBackground(
            insights.averageFinalScore || 0
          )} rounded-lg p-4 text-center`}
        >
          <div className="text-2xl font-bold text-customWhite mb-1">
            {insights.averageFinalScore
              ? insights.averageFinalScore.toFixed(1)
              : "N/A"}
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
  );
};

export default Insights;
