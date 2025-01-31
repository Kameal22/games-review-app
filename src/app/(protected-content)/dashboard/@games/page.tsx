"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "./utils";
import GamesListDashboard from "./_components/games-list";

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

  return <GamesListDashboard />;
};

export default GamesList;
