"use client";

import { useUserStore } from "@/stores/user-store";
import Image from "next/image";

const UserInfo: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-2">
      <div className="w-20 h-20 lg:w-24 lg:h-24">
        <Image
          src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          alt="User Avatar"
          className="w-full h-full rounded-full object-cover"
          width={96}
          height={96}
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xl lg:text-2xl font-semibold text-customWhite">
          {user?.displayName}
        </p>

        <p className="text-sm lg:text-base text-customWhite px-4">
          *STATIC* Your description here *STATIC*
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
