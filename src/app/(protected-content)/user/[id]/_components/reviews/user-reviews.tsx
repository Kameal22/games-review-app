"use client";

import { useState } from "react";
import Pagination from "@/app/_components/pagination";

const dummyGameData = [
  {
    name: "The Last of Us Part II",
    rating: 9.5,
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/da083fa5e19458dd750aa8a6ea30ba10bac6f87074693df5.jpg",
  },
  {
    name: "Ghost of Tsushima",
    rating: 9.3,
    image: "https://www.gamereactor.pl/media/94/ghosttsushima_3209423b.jpg",
  },
  {
    name: "Cyberpunk 2077",
    rating: 7.8,
    image:
      "https://www.cyberpunk.net/build/images/pre-order/buy-b/keyart-standard-pl-0b37d851.jpg",
  },
  {
    name: "Spider-Man: Miles Morales",
    rating: 8.7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4eVmo3veu3wF83wgmusm1OLHobV5zMk24g&s",
  },
  {
    name: "Hades",
    rating: 9.0,
    image:
      "https://cdn1.epicgames.com/min/offer/2560x1440-2560x1440-5e710b93049cbd2125cf0261dcfbf943.jpg",
  },
  {
    name: "Dead Cells",
    rating: 9.5,
    image:
      "https://cdn2.unrealengine.com/egs-deadcells-motiontwin-s1-2560x1440-312502186.jpg",
  },
  {
    name: "Elden Ring",
    rating: 9.8,
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg?t=1650626414",
  },
  {
    name: "Red Dead Redemption 2",
    rating: 9.7,
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg?t=1671485008",
  },
  {
    name: "Hollow Knight",
    rating: 9.6,
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg?t=1580308838",
  },
  {
    name: "Sekiro: Shadows Die Twice",
    rating: 9.4,
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/814380/capsule_616x353.jpg?t=1670519968",
  },
  {
    name: "Stardew Valley",
    rating: 9.5,
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg?t=1672891656",
  },
  {
    name: "The Witcher 3: Wild Hunt",
    rating: 9.9,
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/292030/capsule_616x353.jpg?t=1688035050",
  },
];

const UserReviews: React.FC = () => {
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
    <div className="basis-[70%] flex flex-col justify-between">
      <p className="text-customWhite text-2xl">My Reviews</p>
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
            <p className="text-customWhite text-sm flex-grow w-40">
              Rating: {data.rating}/10
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

export default UserReviews;
