const Insights: React.FC<{
  insights: {
    averageFinalScore: number;
    reviewCount: number;
    highestScore: number;
    lowestScore: number;
    mostReviewedGenre: string;
  };
}> = ({ insights }) => {
  console.log(insights, "insights");
  return (
    <div className="flex-1 lg:basis-[60%]">
      <p className="text-customWhite text-xl lg:text-2xl font-semibold mb-6">
        Statystyki profilu
      </p>

      <div className="space-y-4">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-customWhite mb-1">
            {insights.reviewCount}
          </div>
          <div className="text-sm text-blue-400">Łącznie recenzji</div>
        </div>
        <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-customWhite mb-1">
            {insights.averageFinalScore
              ? insights.averageFinalScore.toFixed(1)
              : "N/A"}
          </div>
          <div className="text-sm text-amber-400">Średnia ocena</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-customWhite mb-1">
            {insights.highestScore}
          </div>
          <div className="text-sm text-green-400">Najwyższa ocena</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-customWhite mb-1">
            {insights.lowestScore}
          </div>
          <div className="text-sm text-red-400">Najniższa ocena</div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-customWhite mb-1">
            {insights.mostReviewedGenre}
          </div>
          <div className="text-sm text-blue-400">
            Najczęściej recenzowany gatunek
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
