"use client";
import React, { useState } from "react";

const UserMenu: React.FC = () => {
  const [showReviewedGames, setShowReviewedGames] = useState(false);
  const [showViewedGames, setShowViewedGames] = useState(false);

  const reviewedGames = [
    {
      name: "The Legend of Zelda",
      image:
        "https://gamemusic.pl/wp-content/uploads/2019/06/The-Legend-of-Zelda-Breath-of-the-Wild1.jpg",
    },
    {
      name: "God of War",
      image:
        "https://static.posters.cz/image/1300/plakaty/god-of-war-ragnarok-key-art-i218003.jpg",
    },
    {
      name: "Red Dead Redemption 2",
      image:
        "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg",
    },
  ];

  const viewedGames = [
    {
      name: "Elden Ring",
      image:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg?t=1687999451",
    },
    {
      name: "Cyberpunk 2077",
      image:
        "https://www.cyberpunk.net/build/images/pre-order/buy-b/keyart-standard-pl-0b37d851.jpg",
    },
    {
      name: "Horizon Zero Dawn",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVTBJ3mmMR_vBw8zCwWouT-AZKX9xyT0VI8Q&s",
    },
  ];

  const toggleReviewedGames = () => {
    setShowReviewedGames((prev) => !prev);
  };

  const toggleViewedGames = () => {
    setShowViewedGames((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="w-full">
        <div className="w-full mt-12 bg-lightGray hover:bg-lightGrayHover p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-4">
          <svg
            className="w-4 fill-customWhite"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
          </svg>
          <p className="text-customWhite">My Profile</p>
        </div>
        <div className="w-full mt-2 bg-lightGray hover:bg-lightGrayHover p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-4">
          <svg
            className="w-4 fill-customWhite"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 160 0 0-256L64 160zm384 0l-160 0 0 256 160 0 0-256z" />
          </svg>
          <p className="text-customWhite">Dashboard</p>
        </div>

        <div
          className="w-full mt-12 p-3 cursor-pointer flex justify-between items-center"
          onClick={toggleReviewedGames}
        >
          <p className="text-customWhite">Recently Reviewed:</p>
          <svg
            className={`w-3 fill-customWhite transition-transform ${
              showReviewedGames ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </svg>
        </div>

        {showReviewedGames && (
          <div className="mt-2 w-full">
            {reviewedGames.map((game, index) => (
              <div
                key={index}
                className="flex items-center p-2 w-full bg-lightGray rounded-lg mb-2 cursor-pointer hover:bg-lightGrayHover transition-colors duration-200"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-12 h-12 rounded-lg mr-3"
                />
                <p className="text-customWhite text-sm">{game.name}</p>
              </div>
            ))}
          </div>
        )}

        <div
          className="w-full mt-6 p-3 cursor-pointer flex justify-between items-center"
          onClick={toggleViewedGames}
        >
          <p className="text-customWhite">Recently Viewed:</p>
          <svg
            className={`w-3 fill-customWhite transition-transform ${
              showViewedGames ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </svg>
        </div>

        {showViewedGames && (
          <div className="mt-2 w-full">
            {viewedGames.map((game, index) => (
              <div
                key={index}
                className="flex items-center p-2 w-full bg-lightGray rounded-lg mb-2 cursor-pointer hover:bg-lightGrayHover transition-colors duration-200"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-12 h-12 rounded-lg mr-3"
                />
                <p className="text-customWhite text-sm">{game.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="w-full mt-12 bg-lightGray hover:bg-lightGrayHover p-3 rounded-lg cursor-pointer transition-colors duration-200 flex gap-4 items-center">
          <svg
            className="w-3 fill-customWhite"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
          </svg>
          <p className="text-customWhite">Get Help</p>
        </div>
        <div className="w-full mt-2 bg-lightGray hover:bg-lightGrayHover p-3 rounded-lg cursor-pointer transition-colors duration-200 flex gap-4 items-center">
          <svg
            className="w-4 fill-customWhite"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
          </svg>
          <p className="text-customWhite">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
