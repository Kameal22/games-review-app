export const getScoreColor = (score: number) => {
    if (score >= 7) return "text-green-400";
    if (score >= 4) return "text-yellow-400";
    if (score >= 2) return "text-orange-400";
    return "text-red-400";
  };