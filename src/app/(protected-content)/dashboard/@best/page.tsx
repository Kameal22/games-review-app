"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchBestReviews } from "./utils";
import { BestReview } from "@/app/types/best-review";
import SingleBestReview from "./_components/single-best-review";
import { useState } from "react";

const categories = [
  {
    name: "Ocena końcowa",
    value: "finalScore",
    label: "Najwyższa ocena końcowa",
  },
  { name: "Rozgrywka", value: "gameplay", label: "Najlepsza rozgrywka" },
  { name: "Grafika", value: "graphics", label: "Najlepsza grafika" },
  { name: "Fabuła", value: "story", label: "Najlepsza fabuła" },
  {
    name: "Ścieżka dźwiękowa",
    value: "soundtrack",
    label: "Najlepsza ścieżka dźwiękowa",
  },
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
              ?.label || "Najlepsze recenzje"}
          </h2>

          <label
            htmlFor="category-select"
            className="text-greyText text-base ml-8"
          >
            Sortuj według:
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
          Odkryj najlepiej oceniane gry w różnych kategoriach. Przeglądaj tytuły
          na podstawie rozgrywki, grafiki, fabuły i innych aspektów z recenzji
          naszej społeczności.
        </p>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-customWhite text-lg text-center">
              Ładowanie najlepszych recenzji...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-red-500 text-lg text-center">
              Błąd ładowania najlepszych recenzji
            </p>
            <p className="text-greyText text-sm text-center">
              {error?.message || "Coś poszło nie tak"}
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
              Nie znaleziono recenzji
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestReviewsList;
