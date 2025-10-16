"use client";

import UserInfo from "./_components/user-info";
import UserMenu from "./_components/user-menu";
import { useQuery } from "@tanstack/react-query";
import { fetchUserReviews } from "@/app/(protected-content)/user/utils";

const UserData: React.FC = () => {
  useQuery({
    queryKey: ["reviewedGames"],
    queryFn: fetchUserReviews,
  });
  return (
    <div className="flex flex-col justify-center items-center w-full h-full pb-12">
      <UserInfo />
      <UserMenu />
    </div>
  );
};

export default UserData;
