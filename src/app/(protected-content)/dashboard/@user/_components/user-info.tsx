"use client";

import { useUserStore } from "@/stores/user-store";
import Image from "next/image";

const UserInfo: React.FC = () => {
  const { user, isAuthenticated } = useUserStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center w-full gap-4 p-3">
        <div className="w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            alt="Guest User"
            className="w-full h-full rounded-full object-cover opacity-50"
            width={56}
            height={56}
          />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-base lg:text-lg font-semibold text-customWhite truncate">
            Guest
          </span>
          <span className="text-xs lg:text-sm text-greyText truncate">
            Not logged in
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full gap-4 p-3">
      <div className="w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="User Avatar"
          className="w-full h-full rounded-full object-cover"
          width={56}
          height={56}
        />
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-base lg:text-lg font-semibold text-customWhite truncate">
          {user.displayName}
        </span>
        <span className="text-xs lg:text-sm text-greyText truncate">
          @{user.displayName}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
