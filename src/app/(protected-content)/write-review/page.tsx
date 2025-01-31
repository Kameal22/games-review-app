"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const reviewSchema = z.object({
  categories: z.array(
    z.object({
      name: z.string(),
      score: z.string().regex(/^\d+$/, "Score must be a number").max(10),
      description: z.string().optional(),
    })
  ),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  finalScore: z
    .string()
    .regex(/^\d{1,2}\/10$/, "Final score must be in X/10 format"),
});

const defaultCategories = [
  "Gameplay",
  "Story",
  "Audio",
  "Graphics",
  "World Design",
  "Optimization",
].map((name) => ({ name, score: "", description: "" }));

const WriteReview: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      author: "",
      game: { name: "", imageUrl: "" },
      categories: defaultCategories,
      summary: "",
      finalScore: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Review Submitted:", data);
  };

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="bg-lightGray rounded-xl pt-4 pr-8 pl-8 pb-4 w-[90%] h-[90%] flex flex-col justify-between gap-4 m-auto">
        <p className="text-3xl font-semibold text-customWhite text-center">
          Elden Ring Review
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {defaultCategories.map((category, index) => (
              <div
                key={category.name}
                className="flex flex-col gap-2 bg-lightGrayHover p-4 rounded-lg"
              >
                <p className="text-xl font-semibold text-customWhite">
                  {category.name}
                </p>
                <input
                  type="number"
                  placeholder="Score (1-10)"
                  {...register(`categories.${index}.score`)}
                  className="p-2 rounded-lg bg-lightGray text-customWhite"
                />
                {errors.categories?.[index]?.score && (
                  <p className="text-red-500">
                    {errors.categories[index].score.message}
                  </p>
                )}
                <textarea
                  placeholder="Description"
                  {...register(`categories.${index}.description`)}
                  className="p-2 rounded-lg bg-lightGray text-customWhite"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 bg-lightGrayHover p-4 rounded-lg">
            <p className="text-xl font-semibold text-customWhite">Summary</p>
            <textarea
              placeholder="Write a summary..."
              {...register("summary")}
              className="p-2 rounded-lg bg-lightGray text-customWhite"
            />
            {errors.summary && (
              <p className="text-red-500">{errors.summary.message}</p>
            )}
          </div>

          <input
            type="text"
            placeholder="Final Score (e.g. 9/10)"
            {...register("finalScore")}
            className="p-2 rounded-lg bg-lightGrayHover text-customWhite"
          />
          {errors.finalScore && (
            <p className="text-red-500">{errors.finalScore.message}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
