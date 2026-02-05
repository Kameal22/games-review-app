"use client";
import Image from "next/image";
import { BestReview } from "@/app/types/best-review";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import { useRouter } from "next/navigation";
import LikeDislike from "@/app/_components/like-dislike";

interface Props {
  data: BestReview;
}

const SingleBestReview: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  const handleReadReview = () => {
    router.push(`/review/${data._id}`);
  };

  return (
    <div className="bg-lightGray rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center w-full min-w-0 hover:bg-lightGrayHover gap-3">
      <div
        className="flex-shrink-0 w-full sm:w-auto cursor-pointer"
        onClick={() => router.push(`/review/${data._id}`)}
      >
        <Image
          src={data.game.coverImageUrl}
          alt={data.game.title}
          width={128}
          height={128}
          className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg max-w-[8rem] sm:max-w-none"
        />
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-2 md:gap-4 min-w-0 w-full">
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => router.push(`/review/${data._id}`)}
        >
          <p className="text-customWhite text-base lg:text-lg font-medium truncate">
            {data.game.title}
          </p>
          <p className="text-greyText text-sm hidden md:block truncate">
            {data.game.genres.join(", ")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-base items-start md:items-center flex-wrap min-w-0">
          <div
            className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 min-w-0 cursor-pointer"
            onClick={() => router.push(`/review/${data._id}`)}
          >
            <p className="text-customWhite flex-shrink-0">
              Ocena:{" "}
              <span
                className={`font-bold text-lg ${getScoreColor(
                  data.finalScore
                )}`}
              >
                {data.finalScore}/10
              </span>
            </p>

            <p
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/user/${data.user.displayName}`);
              }}
              className="text-blue-400 truncate max-w-full hover:text-blue-300 transition-colors duration-200 cursor-pointer underline decoration-blue-400 hover:decoration-blue-300"
            >
              <span className="md:hidden">Przez: </span>
              <span className="hidden md:inline">Zrecenzowane przez: </span>
              <span className="font-medium">{data.user.displayName}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <LikeDislike
              reviewId={data._id}
              initialLikes={data.likes}
              initialDislikes={data.dislikes}
              compact={true}
            />
            <button
              onClick={handleReadReview}
              className="flex-shrink-0 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              title="Przeczytaj pełną recenzję"
            >
              Przeczytaj recenzję
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBestReview;
