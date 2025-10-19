"use client";
import { Game } from "@/app/types/game";
import Image from "next/image";
import { addToWatchlist, removeFromWatchlist } from "../utils";
import { useWatchlistStore } from "@/stores/watchlist.store";
import { useToastStore } from "@/stores/toast-store";
import { useReviewsStore } from "@/stores/reviews-store";
import { useRouter } from "next/navigation";

interface Props {
  data: Game;
}

const SingleGame: React.FC<Props> = ({ data }) => {
  const { watchlist } = useWatchlistStore();
  const { addToast } = useToastStore();
  const { setSelectedGameFromDashboard } = useReviewsStore();
  const router = useRouter();
  const toggleWatchlist = async () => {
    const isInWatchlist = watchlist.some((game) => game.game._id === data._id);

    try {
      if (isInWatchlist) {
        await removeFromWatchlist(data._id);
        addToast({
          type: "success",
          title: "Removed from watchlist",
          message: `${data.title} has been removed from your watchlist`,
        });
      } else {
        await addToWatchlist(data._id);
        addToast({
          type: "success",
          title: "Added to watchlist",
          message: `${data.title} has been added to your watchlist`,
        });
      }
    } catch (error) {
      console.log(error);
      addToast({
        type: "error",
        title: "Error",
        message: isInWatchlist
          ? "Failed to remove from watchlist"
          : "Failed to add to watchlist",
      });
    }
  };

  return (
    <div className="bg-lightGray rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center w-full hover:bg-lightGrayHover gap-3">
      <div className="flex-shrink-0">
        <Image
          src={data.coverImageUrl}
          alt={data.title}
          width={128}
          height={128}
          className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <p className="text-customWhite text-base lg:text-lg font-medium truncate">
            {data.title}
          </p>
          <p className="text-greyText text-sm hidden sm:block">
            {data.genres.join(", ")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedGameFromDashboard(data);
              router.push("/write-review");
            }}
            className="flex-shrink-0 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            title="Write a review for this game"
          >
            Write a review
          </button>

          <button
            onClick={toggleWatchlist}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            title={
              watchlist.some((game) => game.game._id === data._id)
                ? "Remove from watchlist"
                : "Add to watchlist"
            }
          >
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                watchlist.some((game) => game.game._id === data._id)
                  ? "fill-red-500 text-red-500"
                  : "fill-gray-400 text-gray-400 hover:fill-red-400 hover:text-red-400"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleGame;
