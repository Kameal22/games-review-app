"use client";

import Link from "next/link";
import Watchlist from "./watchlist/watchlist";
import { usePathname } from "next/navigation";

const UserUtils: React.FC = () => {
  const pathname = usePathname();

  const userId = pathname?.split("/")[2];
  return (
    <div className="basis-[30%] flex flex-col justify-between">
      <div>
        <p className="text-customWhite text-2xl">Watchlist</p>
        <Watchlist />
      </div>
      <div>
        <p className="text-customWhite text-2xl">Profile Insights</p>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
          <p className="text-customWhite text-base">Reviews Written: 7</p>
          <p className="text-customWhite text-base">Average Rating: 7.7</p>
          <p className="text-customWhite text-base">Favorite Genre: RPG</p>
          <p className="text-customWhite text-base">
            Top Rated Game: Disco Elysium
          </p>
        </div>
      </div>
      <div>
        <p className="text-customWhite text-2xl">Settings</p>
        <div className="mt-4 flex gap-4">
          {/* <Link
            href={`/user/${userId}/edit-account`}
            className="text-customWhite text-l underline cursor-pointer"
          >
            Edit Profile
          </Link> */}
          <p className="text-greyText text-l cursor-not-allowed">
            Edit Profile
          </p>
          <p className=" text-l underline cursor-pointer text-red-500">
            Delete Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserUtils;
