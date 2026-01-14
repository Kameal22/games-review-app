import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strona nie znaleziona",
  description: "Strona, której szukasz, nie została znaleziona.",
};

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-darkBackground">
      <h1 className="text-2xl text-customWhite">
        Przepraszamy, strona nie została znaleziona
      </h1>
    </div>
  );
};

export default NotFound;
