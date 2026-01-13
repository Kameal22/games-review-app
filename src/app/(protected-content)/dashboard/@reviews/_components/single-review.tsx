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

  return (
    <div className="bg-lightGray rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center w-full hover:bg-lightGrayHover gap-3">
      <div
        className="flex-shrink-0 cursor-pointer"
        onClick={() => router.push(`/review/${data.reviewId}`)}
      >
        <Image
          src={data.image}
          alt={data.name}
          className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg"
          width={128}
          height={128}
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-4 min-w-0 w-full">
        <div
          className="flex-1 min-w-0 max-w-full cursor-pointer"
          onClick={() => router.push(`/review/${data.reviewId}`)}
        >
          <p className="text-customWhite text-lg lg:text-xl font-medium truncate max-w-full">
            {data.name}
          </p>
          <p className="text-greyText text-base hidden sm:block truncate">
            {data.genre}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-base items-start sm:items-center">
          <div
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 cursor-pointer"
            onClick={() => router.push(`/review/${data.reviewId}`)}
          >
            <p className="text-customWhite">
              <span className="sm:hidden">Genre: </span>
              {data.genre}
            </p>
            <p className="text-customWhite">
              Rating:{" "}
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
              className="text-blue-400 truncate hover:text-blue-300 transition-colors duration-200 cursor-pointer underline decoration-blue-400 hover:decoration-blue-300"
            >
              <span className="sm:hidden">By: </span>
              <span className="hidden sm:inline">Reviewed by: </span>
              <span className="font-medium">{data.user}</span>
            </p>
          </div>
          {data.reviewId && (
            <LikeDislike
              reviewId={data.reviewId}
              initialLikes={data.likes}
              initialDislikes={data.dislikes}
              compact={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
