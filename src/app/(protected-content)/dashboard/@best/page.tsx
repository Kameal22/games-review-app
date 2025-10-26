"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchBestReviews } from "./utils";
import { BestReview } from "@/app/types/best-review";
import SingleBestReview from "./_components/single-best-review";
import { useState } from "react";

const categories = [
  { name: "Final Score", value: "finalScore", label: "Highest Final Score" },
  { name: "Gameplay", value: "gameplay", label: "Best Gameplay" },
  { name: "Graphics", value: "graphics", label: "Best Graphics" },
  { name: "Story", value: "story", label: "Best Story" },
  { name: "Soundtrack", value: "soundtrack", label: "Best Soundtrack" },
];

const BestReviewsList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("finalScore");

  const {
    data: bestReviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bestReviews", selectedCategory],
    queryFn: () => fetchBestReviews(selectedCategory),
  });

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="text-customWhite text-xl lg:text-2xl font-semibold">
            {categories.find((category) => category.value === selectedCategory)
              ?.label || "Best Reviews"}
          </h2>

          <label
            htmlFor="category-select"
            className="text-greyText text-base ml-8"
          >
            Sort by:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-lightGray border border-gray-600 rounded-lg px-3 py-2 text-customWhite text-sm focus:outline-none focus:border-blue-500 hover:border-gray-500 transition-colors duration-200"
          >
            {categories.map((category) => (
              <option
                key={category.value}
                value={category.value}
                className="bg-lightGray text-customWhite"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <p className="text-greyText text-base lg:text-lg leading-relaxed">
          Discover the highest-rated games across different categories. Explore
          top-rated titles based on gameplay, graphics, story, and more from our
          community&apos;s reviews.
        </p>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-customWhite text-lg text-center">
              Loading best reviews...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-red-500 text-lg text-center">
              Error loading best reviews
            </p>
            <p className="text-greyText text-sm text-center">
              {error?.message || "Something went wrong"}
            </p>
          </div>
        ) : bestReviews.length > 0 ? (
          <>
            {bestReviews.slice(0, 7).map((review: BestReview) => (
              <SingleBestReview key={review._id} data={review} />
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-greyText text-lg text-center">
              No reviews found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestReviewsList;
