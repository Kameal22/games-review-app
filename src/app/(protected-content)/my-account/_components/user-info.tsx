"use client";

import Image from "next/image";
import { User } from "@/app/types/user";

const UserInfo: React.FC<{ data: User }> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-2">
      <div className="w-20 h-20 lg:w-24 lg:h-24">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="User Avatar"
          className="w-full h-full rounded-full object-cover"
          width={96}
          height={96}
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xl lg:text-2xl font-semibold text-customWhite">
          {data?.displayName}
        </p>

        <p className="text-sm lg:text-base text-customWhite px-4">
          *STATIC* Your description here *STATIC*
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
