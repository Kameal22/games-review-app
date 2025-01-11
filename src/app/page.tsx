import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex items-center justify-center bg-darkBackground"
    >
      <Link
        href="/register"
        className="text-3xl text-customWhite underline cursor-pointer"
      >
        New? Sign up here
      </Link>
    </div>
  );
}
