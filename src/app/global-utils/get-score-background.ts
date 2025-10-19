export const getScoreBackground = (score: number) => {
    if (score >= 7) return "bg-green-500/20 border-green-500/30";
    if (score >= 4) return "bg-yellow-500/20 border-yellow-500/30";
    if (score >= 2) return "bg-orange-500/20 border-orange-500/30";
    return "bg-red-500/20 border-red-500/30";
  };