"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/stores/user-store";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useUserStore();

  const handleLogout = () => {
    // Use the logout function from the user store
    logout();
    // Redirect to home page
    router.push("/");
  };

  return (
    <div className="flex justify-between bg-darkGreyBackground px-4 lg:px-6 py-2 w-full relative h-20 lg:h-28">
      <div className="flex items-center">
        <Link href={isAuthenticated ? "/dashboard" : "/"}>
          <Image
            src="/logo_white.png"
            alt="Logo"
            width={94}
            height={94}
            className="w-12 h-12 lg:w-[94px] lg:h-[84px]"
            priority
          />
        </Link>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        {isAuthenticated && (
          <>
            {user && (
              <p className="text-customWhite text-sm lg:text-base">
                Welcome, {user.displayName}!
              </p>
            )}
            <p
              onClick={handleLogout}
              className="text-customWhite underline cursor-pointer text-sm lg:text-base whitespace-nowrap"
            >
              Logout
            </p>
          </>
        )}
        <p className="text-customWhite text-xs lg:text-sm text-right">
          Reviewslike - All rights reserved.
        </p>
      </div>
      {/* <Link href="/" className="text-4xl font-semibold text-customWhite">
        Reviewslike
      </Link> */}
    </div>
  );
};

export default Header;
