import LatestReview from "./latest-review";

const GameInfo: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <p className="text-customWhite text-3xl">Game Info</p>

        <div className="flex flex-col gap-4 mt-6">
          <p className="text-customWhite text-base">Genre: Action RPG</p>
          <p className="text-customWhite text-base">Developer: FromSoftware</p>
          <p className="text-customWhite text-base">Average Score: 9.5</p>
          <p className="text-customWhite text-base">Number Of Reviews: 83</p>
        </div>

        <div className="mt-6">
          <p className="text-customWhite text-3xl">Latest Reviews</p>

          <LatestReview />
          <LatestReview />
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
