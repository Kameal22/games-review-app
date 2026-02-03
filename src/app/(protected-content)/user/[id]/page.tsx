"use client";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkFollowStatus,
  fetchUserData,
  followUser,
  unfollowUser,
} from "../utils";
import Image from "next/image";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import { Review } from "@/app/types/review";
import Watchlist from "./_components/user-utils/watchlist/watchlist";
import Insights from "@/app/(protected-content)/my-account/_components/user-utils/insights";
import { useToastStore } from "@/stores/toast-store";
import { useUserStore } from "@/stores/user-store";

interface UserData {
  user: {
    _id: string;
    displayName: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    createdAt: string;
  };
  insights: {
    averageFinalScore: number;
    reviewCount: number;
  };
  reviews: Review[];
  watchlist: Array<{
    _id: string;
    game: {
      _id: string;
      title: string;
      coverImageUrl: string;
      slug: string;
    };
  }>;
}

const User: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const userName = params.id as string;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { isAuthenticated } = useUserStore();

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<UserData>({
    queryKey: ["userData", userName],
    queryFn: () => fetchUserData(userName),
    enabled: !!userName,
  });

  const { data: followStatus } = useQuery<{ isFollowing: boolean }>({
    queryKey: ["followStatus", userName],
    queryFn: () => checkFollowStatus(userName),
    enabled: !!userName && isAuthenticated, // Only check follow status if authenticated
  });

  const followMutation = useMutation({
    mutationFn: (userName: string) => followUser(userName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFollowing"] });
      queryClient.invalidateQueries({ queryKey: ["followStatus", userName] });
      addToast({
        type: "success",
        title: "Sukces",
        message: "Zacząłeś obserwować tego użytkownika",
      });
    },
    onError: (error: Error) => {
      addToast({
        type: "error",
        title: "Błąd",
        message: error.message || "Nie udało się obserwować użytkownika",
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: (userName: string) => unfollowUser(userName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFollowing"] });
      queryClient.invalidateQueries({ queryKey: ["followStatus", userName] });
      addToast({
        type: "success",
        title: "Sukces",
        message: "Przestałeś obserwować tego użytkownika",
      });
    },
    onError: (error: Error) => {
      addToast({
        type: "error",
        title: "Błąd",
        message:
          error.message || "Nie udało się przestać obserwować użytkownika",
      });
    },
  });

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const handleReviewClick = (reviewId: string) => {
    router.push(`/review/${reviewId}`);
  };

  const handleGameClick = (gameSlug: string) => {
    router.push(`/game/${gameSlug}`);
  };

  const handleFollow = () => {
    if (!isAuthenticated) {
      router.push("/login");
      addToast({
        type: "info",
        title: "Wymagane logowanie",
        message: "Zaloguj się, aby obserwować użytkowników",
      });
      return;
    }

    if (userName) {
      if (followStatus?.isFollowing) {
        unfollowMutation.mutate(userName);
      } else {
        followMutation.mutate(userName);
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-darkGreyBackground rounded-xl p-6 w-full h-full flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Powrót do panelu</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <div className="w-24 h-24 bg-lightGray rounded-full animate-pulse"></div>
          <div className="w-48 h-6 bg-lightGray rounded animate-pulse"></div>
          <div className="w-64 h-4 bg-lightGray rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-lightGray rounded-xl p-4 animate-pulse">
            <div className="w-32 h-6 bg-darkGreyBackground rounded mb-4"></div>
            <div className="w-24 h-4 bg-darkGreyBackground rounded"></div>
          </div>
          <div className="lg:col-span-2 bg-lightGray rounded-xl p-4 animate-pulse">
            <div className="w-40 h-6 bg-darkGreyBackground rounded mb-4"></div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-darkGreyBackground rounded"></div>
              <div className="w-full h-20 bg-darkGreyBackground rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-darkGreyBackground rounded-xl p-6 w-full h-full flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Powrót do panelu</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <div className="text-red-500 text-xl mb-2">
            Błąd ładowania danych użytkownika
          </div>
          <div className="text-greyText text-center">
            {error.message ||
              "Wystąpił błąd podczas ładowania profilu użytkownika"}
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-darkGreyBackground rounded-xl p-6 w-full h-full flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Powrót do panelu</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <div className="text-greyText text-xl">Brak danych użytkownika</div>
        </div>
      </div>
    );
  }

  const { user, insights, reviews, watchlist } = userData;

  // Compute full insights from reviews (same shape as my-account)
  const fullInsights = (() => {
    const count = reviews.length;
    if (count === 0) {
      return {
        averageFinalScore: insights.averageFinalScore ?? 0,
        reviewCount: 0,
        highestScore: 0,
        lowestScore: 0,
        mostReviewedGenre: "—",
      };
    }
    const scores = reviews.map((r) => r.finalScore);
    const genreCounts: Record<string, number> = {};
    reviews.forEach((r) => {
      (r.game.genres || []).forEach((g: string) => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    });
    const mostReviewedGenre =
      Object.keys(genreCounts).length === 0
        ? "—"
        : Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0];
    return {
      averageFinalScore:
        insights.averageFinalScore ?? scores.reduce((a, b) => a + b, 0) / count,
      reviewCount: count,
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      mostReviewedGenre,
    };
  })();

  return (
    <div className="bg-darkGreyBackground rounded-xl p-6 w-full h-full flex flex-col gap-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBackToDashboard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* User Profile Header */}
      <div className="bg-lightGray rounded-xl p-6 flex flex-col lg:flex-row items-center lg:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 lg:w-32 lg:h-32 relative">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt={`Avatar użytkownika ${user.displayName}`}
              className="w-full h-full rounded-full object-cover border-2 border-blue-400/30"
              width={128}
              height={128}
            />
          </div>
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl lg:text-3xl font-bold text-customWhite mb-2">
            {user.displayName}
          </h1>
          <p className="text-greyText text-sm lg:text-base mb-2">
            {user.email}
          </p>
          <p className="text-greyText text-xs lg:text-sm mb-4">
            Członek od{" "}
            {new Date(user.createdAt).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="bg-darkGreyBackground rounded-lg p-4 mb-4">
            <p className="text-customWhite text-sm lg:text-base">
              {user.bio || "Ten użytkownik nie dodał jeszcze biografii."}
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleFollow}
              disabled={followMutation.isPending || unfollowMutation.isPending}
              className={`${
                followStatus?.isFollowing
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 self-start`}
            >
              {unfollowMutation.isPending
                ? "Przestawanie obserwowania..."
                : followMutation.isPending
                ? "Obserwowanie..."
                : followStatus?.isFollowing
                ? "Przestań obserwować"
                : "Obserwuj"}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Reviews Section */}
        <div className="lg:col-span-2">
          <div className="bg-lightGray rounded-xl p-6">
            <h2 className="text-xl lg:text-2xl font-bold text-customWhite mb-4">
              Ostatnie recenzje
            </h2>

            {reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-greyText text-lg">
                  Ten użytkownik nie napisał jeszcze żadnych recenzji.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.slice(0, 4).map((review) => (
                  <div
                    key={review._id}
                    onClick={() => handleReviewClick(review._id)}
                    className="bg-darkGreyBackground rounded-lg p-4 cursor-pointer hover:bg-darkGreyBackground/80 transition-colors duration-200"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={review.game.coverImageUrl}
                          alt={review.game.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-customWhite truncate mb-1">
                          {review.game.title}
                        </h3>
                        <p className="text-sm text-greyText mb-2">
                          {review.game.genres.join(", ")}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-customWhite text-sm">
                            Ocena:{" "}
                            <span
                              className={`font-bold ${getScoreColor(
                                review.finalScore
                              )}`}
                            >
                              {review.finalScore}/10
                            </span>
                          </span>
                          <span className="text-greyText text-sm">
                            {new Date(review.createdAt).toLocaleDateString(
                              "pl-PL"
                            )}
                          </span>
                        </div>
                        {review.text && (
                          <p className="text-greyText text-sm mt-2 line-clamp-2">
                            {review.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Watchlist Section */}
          <div className="bg-lightGray rounded-xl p-6">
            <h2 className="text-xl font-bold text-customWhite mb-4">
              Lista życzeń
            </h2>
            <Watchlist watchlist={watchlist} onGameClick={handleGameClick} />
          </div>

          {/* Insights Section */}
          <div className="bg-lightGray rounded-xl p-6">
            <Insights insights={fullInsights} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
