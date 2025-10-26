"use client";
import Image from "next/image";
import { BestReview } from "@/app/types/best-review";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import { useRouter } from "next/navigation";

interface Props {
  data: BestReview;
}

const SingleBestReview: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      className="bg-lightGray rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center w-full hover:bg-lightGrayHover gap-3 cursor-pointer"
      onClick={() => router.push(`/review/${data._id}`)}
    >
      <div className="flex-shrink-0">
        <Image
          src={data.game.coverImageUrl}
          alt={data.game.title}
          width={128}
          height={128}
          className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <p className="text-customWhite text-base lg:text-lg font-medium truncate">
            {data.game.title}
          </p>
          <p className="text-greyText text-sm hidden sm:block">
            {data.game.genres.join(", ")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-base">
          <p className="text-customWhite">
            Rating:{" "}
            <span
              className={`font-bold text-lg ${getScoreColor(data.finalScore)}`}
            >
              {data.finalScore}/10
            </span>
          </p>

          <p
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/user/${data.user._id}`);
            }}
            className="text-blue-400 truncate hover:text-blue-300 transition-colors duration-200 cursor-pointer underline decoration-blue-400 hover:decoration-blue-300"
          >
            <span className="sm:hidden">By: </span>
            <span className="hidden sm:inline">Reviewed by: </span>
            <span className="font-medium">{data.user.displayName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleBestReview;
