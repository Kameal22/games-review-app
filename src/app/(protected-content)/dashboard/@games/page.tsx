"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "./utils";

const GamesList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  if (isLoading) {
    console.log(isLoading, "IS LOADING");
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <p className="text-m text-customWhite">Games List</p>
    </div>
  );
};

export default GamesList;
