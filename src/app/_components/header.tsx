"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the auth_token exists
    const token = Cookies.get("auth_token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    router.push("/");
  };

  return (
    <div className="flex justify-between bg-darkGreyBackground pl-6 pr-6 py-2 w-full relative h-28">
      <div className="flex items-center">
        <Link href={isLoggedIn ? "/dashboard" : "/"}>
          <Image
            src="/logo_white.png"
            alt="Logo"
            width={94}
            height={94}
            priority
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <p
            onClick={handleLogout}
            className="text-customWhite underline cursor-pointer"
          >
            Logout
          </p>
        )}
        <p className="text-customWhite text-sm">
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
