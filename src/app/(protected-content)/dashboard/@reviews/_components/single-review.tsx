"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import LikeDislike from "@/app/_components/like-dislike";

type review = {
  name: string;
  genre: string;
  rating: number;
  user: string;
  userName: string;
  image: string;
  reviewId?: string;
  createdAt?: string;
  likes?: number;
  dislikes?: number;
};

interface Props {
  data: review;
}

const SingleReview: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  const handleReadReview = () => {
    if (data.reviewId) {
      router.push(`/review/${data.reviewId}`);
    }
  };

  return (
    <div className="bg-lightGray rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center w-full min-w-0 hover:bg-lightGrayHover gap-3">
      <div className="flex-shrink-0 w-full sm:w-auto">
        <Image
          src={data.image}
          alt={data.name}
          className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg max-w-[8rem] sm:max-w-none"
          width={128}
          height={128}
        />
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-2 md:gap-4 min-w-0 w-full">
        <div className="flex-1 min-w-0">
          <p className="text-customWhite text-lg lg:text-xl font-medium truncate">
            {data.name}
          </p>
          <p className="text-greyText text-base hidden md:block truncate">
            {data.genre}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-base items-start md:items-center flex-wrap min-w-0">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 min-w-0">
            <p className="text-customWhite min-w-0 truncate max-w-full">
              <span className="md:hidden">Gatunek: </span>
              {data.genre}
            </p>
            <p className="text-customWhite flex-shrink-0">
              Ocena:{" "}
              <span
                className={`font-bold text-lg ${getScoreColor(data.rating)}`}
              >
                {data.rating}/10
              </span>
            </p>
            <p
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/user/${data.userName}`);
              }}
              className="text-blue-400 truncate max-w-full hover:text-blue-300 transition-colors duration-200 cursor-pointer underline decoration-blue-400 hover:decoration-blue-300"
            >
              <span className="md:hidden">Przez: </span>
              <span className="hidden md:inline">Zrecenzowane przez: </span>
              <span className="font-medium">{data.user}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            {data.reviewId && (
              <LikeDislike
                reviewId={data.reviewId}
                initialLikes={data.likes}
                initialDislikes={data.dislikes}
                compact={true}
              />
            )}
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

export default SingleReview;
