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
    <div className="flex flex-col items-center justify-center gap-4 h-screen bg-notFoundBackground">
      <div>{children}</div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Suspense
          fallback={<p className="text-notFoundText">Loading Games..</p>}
        >
          <div>{games}</div>
        </Suspense>
        <div>{user}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
