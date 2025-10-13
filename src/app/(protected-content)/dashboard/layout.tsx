"use client";
import { Suspense, useState } from "react";

const DashboardLayout = ({
  games,
  user,
}: {
  children: React.ReactNode;
  games: React.ReactNode;
  user: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      style={{ minHeight: "calc(100vh - 7rem)" }}
      className="flex flex-col lg:flex-row bg-darkBackground gap-2 p-2"
    >
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-darkGreyBackground rounded-xl">
        <h1 className="text-customWhite text-xl font-semibold">Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-lightGray rounded-lg"
        >
          <svg
            className="w-6 h-6 fill-customWhite"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <Suspense fallback={<p className="text-customWhite">Loading User..</p>}>
        <div
          className={`
            ${isSidebarOpen ? "block" : "hidden"} 
            lg:block 
            lg:flex-none 
            h-auto lg:h-full 
            w-full lg:w-1/4 xl:w-1/5 
            p-4 
            bg-darkGreyBackground 
            rounded-xl 
            lg:min-w-80
          `}
        >
          {user}
        </div>
      </Suspense>

      {/* Main Content */}
      <Suspense fallback={<p className="text-customWhite">Loading Games..</p>}>
        <div className="flex-grow h-auto lg:h-full">{games}</div>
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
