"use client";

import { useState } from "react";
import Image from "next/image";
import Pagination from "@/app/_components/pagination";
import { Review } from "@/app/types/review";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import { useRouter } from "next/navigation";

const UserReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;

  const totalPages = Math.ceil(reviews.length / gamesPerPage);

  const currentReviews = reviews.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // If no reviews, show a message
  if (reviews.length === 0) {
    return (
      <div className="flex-1 lg:basis-[70%] flex flex-col justify-center items-center gap-4">
        <p className="text-customWhite text-xl lg:text-2xl">User Reviews</p>
        <div className="text-center">
          <p className="text-greyText text-lg mb-4">
            This user hasn&apos;t written any reviews yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 lg:basis-[70%] flex flex-col gap-4">
      <p className="text-customWhite text-xl lg:text-2xl">User Reviews</p>
      <div className="flex flex-col gap-3">
        {currentReviews.map((review: Review) => (
          <div
            onClick={() => router.push(`/review/${review._id}`)}
            key={review._id}
            className="bg-lightGray rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center w-full cursor-pointer hover:bg-lightGrayHover gap-3"
          >
            <div className="flex-shrink-0">
              <Image
                src={review.game.coverImageUrl}
                alt={review.game.title}
                width={128}
                height={128}
                className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-4 min-w-0">
              <div className="flex-1 min-w-0">
                <p className="text-customWhite text-lg lg:text-xl font-medium truncate">
                  {review.game.title}
                </p>
                <p className="text-greyText text-sm sm:text-base truncate">
                  {review.game.genres.join(", ")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-base">
                <p className="text-customWhite">
                  Rating:{" "}
                  <span
                    className={`font-bold text-lg ${getScoreColor(
                      review.finalScore
                    )}`}
                  >
                    {review.finalScore}/10
                  </span>
                </p>
                <p className="text-greyText text-sm sm:text-base">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserReviews;
