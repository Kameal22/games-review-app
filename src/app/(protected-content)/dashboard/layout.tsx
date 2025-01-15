import { Suspense } from "react";

const DashboardLayout = ({
  children,
  games,
  user,
}: {
  children: React.ReactNode;
  games: React.ReactNode;
  user: React.ReactNode;
}) => {
  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex bg-darkBackground"
    >
      <Suspense fallback={<p className="text-customWhite">Loading User..</p>}>
        <div className="flex-none h-full w-1/6 p-4 bg-darkGreyBackground rounded-xl">
          {user}
        </div>
      </Suspense>

      <Suspense fallback={<p className="text-customWhite">Loading Games..</p>}>
        <div className="flex-grow h-full p-4">{games}</div>
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
