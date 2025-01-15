import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-darkBackground pl-6 pr-6 w-full relative h-28 ">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo_white.png"
            alt="Logo"
            width={112}
            height={112}
            priority
          />
        </Link>
      </div>
      {/* <Link href="/" className="text-4xl font-semibold text-customWhite">
        Reviewslike
      </Link> */}
    </div>
  );
};

export default Header;
