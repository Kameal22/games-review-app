import { Suspense } from "react";

const CreateReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex bg-darkBackground gap-2"
    >
      <Suspense fallback={<p className="text-customWhite">Loading Data..</p>}>
        <div className="flex-grow h-full mt-2">{children}</div>
      </Suspense>
    </div>
  );
};

export default CreateReviewLayout;
