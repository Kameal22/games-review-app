"use client";

import { useState } from "react";
import Pagination from "@/app/_components/pagination";

const dummyGameData = [
  {
    name: "The Last of Us Part II",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/da083fa5e19458dd750aa8a6ea30ba10bac6f87074693df5.jpg",
  },
  {
    name: "Ghost of Tsushima",
    image: "https://www.gamereactor.pl/media/94/ghosttsushima_3209423b.jpg",
  },
  {
    name: "Cyberpunk 2077",
    image:
      "https://www.cyberpunk.net/build/images/pre-order/buy-b/keyart-standard-pl-0b37d851.jpg",
  },
  {
    name: "Spider-Man: Miles Morales",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4eVmo3veu3wF83wgmusm1OLHobV5zMk24g&s",
  },
  {
    name: "Hades",
    image:
      "https://cdn1.epicgames.com/min/offer/2560x1440-2560x1440-5e710b93049cbd2125cf0261dcfbf943.jpg",
  },
  {
    name: "Dead Cells",
    image:
      "https://cdn2.unrealengine.com/egs-deadcells-motiontwin-s1-2560x1440-312502186.jpg",
  },
];

const Watchlist: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;

  const totalPages = Math.ceil(dummyGameData.length / gamesPerPage);

  const currentGames = dummyGameData.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="mt-4">
      <div>
        {currentGames.map((data, index) => (
          <div
            key={index}
            className="bg-lightGray rounded-xl p-2 flex items-center w-full cursor-pointer hover:bg-lightGrayHover"
          >
            <div className="flex-grow">
              <img
                src={data.image}
                alt={data.name}
                className="w-32 h-20 object-cover rounded-lg"
              />
            </div>

            <p className="text-customWhite text-l flex-grow w-40">
              {data.name}
            </p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Watchlist;
