"use client";
import { Game } from "@/app/types/game";
import Image from "next/image";
import { addToWatchlist, removeFromWatchlist } from "../utils";
import { useToastStore } from "@/stores/toast-store";
import { useReviewsStore } from "@/stores/reviews-store";
import { useRouter } from "next/navigation";
import { Watchlist } from "@/app/types/watchlist";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, memo } from "react";
import { useUserStore } from "@/stores/user-store";

interface Props {
  data: Game;
  watchlist: Watchlist[];
}

const SingleGame: React.FC<Props> = ({ data, watchlist }) => {
  const { addToast } = useToastStore();
  const { setSelectedGameFromDashboard } = useReviewsStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useUserStore();

  // Memoize the watchlist check to avoid recalculating on every render
  const isInWatchlist = useMemo(
    () => watchlist?.some((game) => game.game._id === data._id) ?? false,
    [watchlist, data._id]
  );

  const toggleWatchlist = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      addToast({
        type: "info",
        title: "Wymagane logowanie",
        message: "Zaloguj się, aby dodać gry do listy życzeń",
      });
      return;
    }

    try {
      if (isInWatchlist) {
        await removeFromWatchlist(data._id);
        addToast({
          type: "success",
          title: "Usunięto z listy życzeń",
          message: `${data.title} zostało usunięte z Twojej listy życzeń`,
        });
      } else {
        await addToWatchlist(data._id);
        addToast({
          type: "success",
          title: "Dodano do listy życzeń",
          message: `${data.title} zostało dodane do Twojej listy życzeń`,
        });
      }

      // Invalidate and refetch the watchlist query to update the UI
      await queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    } catch (error) {
      console.log(error);
      addToast({
        type: "error",
        title: "Błąd",
        message: isInWatchlist
          ? "Nie udało się usunąć z listy życzeń"
          : "Nie udało się dodać do listy życzeń",
      });
    }
  };

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      router.push("/login");
      addToast({
        type: "info",
        title: "Wymagane logowanie",
        message: "Zaloguj się, aby napisać recenzję",
      });
      return;
    }
    setSelectedGameFromDashboard(data);
    router.push("/write-review");
  };

  return (
    <div className="bg-lightGray rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center w-full min-w-0 hover:bg-lightGrayHover transition-colors duration-200 gap-3">
      <div className="flex-shrink-0 w-full sm:w-auto">
        <Image
          src={data.coverImageUrl}
          alt={data.title}
          width={128}
          height={128}
          className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg max-w-[8rem] sm:max-w-none"
        />
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-2 md:gap-4 min-w-0 w-full">
        <div className="flex-1 min-w-0">
          <p className="text-customWhite text-base lg:text-lg font-medium truncate">
            {data.title}
          </p>
          <p className="text-greyText text-sm hidden md:block truncate">
            {data.genres.join(", ")}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap min-w-0">
          <button
            onClick={handleWriteReview}
            className="flex-shrink-0 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            title="Napisz recenzję dla tej gry"
          >
            Napisz recenzję
          </button>

          {isAuthenticated && (
            <button
              onClick={toggleWatchlist}
              className={`flex-shrink-0 px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                isInWatchlist
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                  : "bg-lightGray hover:bg-lightGrayHover text-customWhite border border-gray-600"
              }`}
              title={
                isInWatchlist ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"
              }
            >
              {isInWatchlist ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SingleGame);
