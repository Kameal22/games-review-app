import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found Page",
  description: "The page you are looking for could not be found.",
};

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-notFoundBackground">
      <h1 className="text-2xl text-notFoundText">Sorry, Page Not Found</h1>
    </div>
  );
};

export default NotFound;
