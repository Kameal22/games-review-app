import { Suspense } from "react";

const MyProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 7rem)" }}
      className="flex bg-darkBackground gap-2 p-2 overflow-x-hidden max-w-full"
    >
      <Suspense
        fallback={<p className="text-customWhite">Ładowanie danych...</p>}
      >
        <div className="flex-grow h-auto lg:h-full min-w-0 max-w-full">
          {children}
        </div>
      </Suspense>
    </div>
  );
};

export default MyProfileLayout;
