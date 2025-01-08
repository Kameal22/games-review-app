import axios from "axios";

export const fetchGames = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};

export const createGame = async (newGame: { title: string; body: string }) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newGame);
    return response.data;
  };