const Review: React.FC = () => {
  // Sample review data
  const review = {
    author: "John Doe",
    game: {
      name: "Elden Ring",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg", // Replace with actual image URL
    },
    categories: [
      {
        name: "Gameplay",
        score: 9,
        description: "Smooth mechanics and engaging combat.",
      },
      {
        name: "Story",
        score: 8,
        description: "Well-written with a few predictable moments.",
      },
      {
        name: "Audio",
        score: 10,
        description: "Outstanding soundtrack and voice acting.",
      },
      {
        name: "Graphics",
        score: 9,
        description: "Stunning visuals and detailed environments.",
      },
      {
        name: "World Design",
        score: 9,
        description: "Immersive open world with lots to explore.",
      },
      {
        name: "Optimization",
        score: 7,
        description: "Some frame drops on lower-end hardware.",
      },
    ],
    summary:
      "Overall, a fantastic experience with minor performance issues. Highly recommended!",
    finalScore: "9/10",
  };

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="bg-lightGray rounded-xl pt-4 pr-8 pl-8 pb-4 w-[90%] h-[90%] flex flex-col gap-4 m-auto">
        <p className="text-3xl font-semibold text-customWhite text-center">
          Review by: {review.author}
        </p>

        <div className="flex flex-col items-center gap-2">
          <img
            src={review.game.imageUrl}
            alt={review.game.name}
            className="w-22 h-36 object-cover rounded-lg shadow-md"
          />
          <p className="text-2xl font-semibold text-customWhite">
            {review.game.name}
          </p>

          <p className="text-xl font-semibold text-customWhite underline">
            Overall Score: {review.finalScore}
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {review.categories.map((category) => (
                <div
                  key={category.name}
                  className="flex flex-col gap-2 bg-lightGrayHover p-4 rounded-lg"
                >
                  <p className="text-xl font-semibold text-customWhite">
                    {category.name}
                  </p>
                  <p className="text-lg text-gray-300">
                    Score: {category.score}/10
                  </p>
                  {category.description && (
                    <p className="text-customWhite italic">
                      {category.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 bg-lightGrayHover p-4 rounded-lg">
              <p className="text-xl font-semibold text-customWhite">Summary</p>
              <p className="text-gray-300">{review.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
