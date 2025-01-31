"use client";
import { useState } from "react";

import GamesSearch from "./games-search";
import Pagination from "./pagination";
import SingleGame from "./single-game";

const dummyGameData = [
  {
    name: "The Last of Us Part II",
    genre: "Action-Adventure",
    rating: 9.5,
    user: "John Doe",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/da083fa5e19458dd750aa8a6ea30ba10bac6f87074693df5.jpg",
  },
  {
    name: "Ghost of Tsushima",
    genre: "Action-Adventure",
    rating: 9.3,
    user: "Jane Smith",
    image: "https://www.gamereactor.pl/media/94/ghosttsushima_3209423b.jpg",
  },
  {
    name: "Cyberpunk 2077",
    genre: "RPG",
    rating: 7.8,
    user: "Alice Johnson",
    image:
      "https://www.cyberpunk.net/build/images/pre-order/buy-b/keyart-standard-pl-0b37d851.jpg",
  },
  {
    name: "Spider-Man: Miles Morales",
    genre: "Action",
    rating: 8.7,
    user: "Bob Brown",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4eVmo3veu3wF83wgmusm1OLHobV5zMk24g&s",
  },
  {
    name: "Hades",
    genre: "Rogue-like",
    rating: 9.0,
    user: "Sarah Lee",
    image:
      "https://cdn1.epicgames.com/min/offer/2560x1440-2560x1440-5e710b93049cbd2125cf0261dcfbf943.jpg",
  },
  {
    name: "Dead Cells",
    genre: "Rogue-like",
    rating: 9.5,
    user: "Bruce Lee",
    image:
      "https://cdn2.unrealengine.com/egs-deadcells-motiontwin-s1-2560x1440-312502186.jpg",
  },
  {
    name: "Elden Ring",
    genre: "Action RPG",
    rating: 9.8,
    user: "Michael Clark",
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg?t=1650626414",
  },
  {
    name: "Red Dead Redemption 2",
    genre: "Action-Adventure",
    rating: 9.7,
    user: "Emily Davis",
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg?t=1671485008",
  },
  {
    name: "Hollow Knight",
    genre: "Metroidvania",
    rating: 9.6,
    user: "Kevin White",
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg?t=1580308838",
  },
  {
    name: "Sekiro: Shadows Die Twice",
    genre: "Action-Adventure",
    rating: 9.4,
    user: "Laura Green",
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/814380/capsule_616x353.jpg?t=1670519968",
  },
  {
    name: "Stardew Valley",
    genre: "Simulation",
    rating: 9.5,
    user: "Sophia Brown",
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg?t=1672891656",
  },
  {
    name: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    rating: 9.9,
    user: "William Wilson",
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/292030/capsule_616x353.jpg?t=1688035050",
  },
];

const GamesListDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  const totalPages = Math.ceil(dummyGameData.length / gamesPerPage);

  const currentGames = dummyGameData.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <GamesSearch />
      <p  className="text-customWhite text-xl mt-16">Latest Game Reviews</p>

      <div className="flex flex-col gap-4">
        {currentGames.map((data, index) => (
          <SingleGame key={index} data={data} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GamesListDashboard;
