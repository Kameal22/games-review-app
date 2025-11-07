"use client";
import { useState, useEffect } from "react";
import { Following } from "@/app/types/following";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowUser } from "../utils";
import { useToastStore } from "@/stores/toast-store";
import Pagination from "@/app/(protected-content)/dashboard/@games/_components/pagination";

const UserFollowers: React.FC<{ following?: Following }> = ({ following }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const unfollowMutation = useMutation({
    mutationFn: (userId: string) => unfollowUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFollowing"] });
      addToast({
        type: "success",
        title: "Success",
        message: "You have unfollowed this user",
      });
    },
    onError: (error: Error) => {
      addToast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to unfollow user",
      });
    },
  });

  const handleUserClick = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  const handleUnfollow = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    unfollowMutation.mutate(userId);
  };

  const hasFollowing =
    following && following.following && following.following.length > 0;

  const totalItems = following?.following?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = following?.following?.slice(startIndex, endIndex) || [];

  // Reset to page 1 if current page is beyond total pages (e.g., after unfollowing)
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 lg:basis-[40%]">
      <p className="text-customWhite text-xl lg:text-2xl font-semibold mb-4">
        Following
      </p>
      {hasFollowing ? (
        <>
          <div className="flex flex-col gap-3">
            {currentPageItems.map((user) => (
              <div
                key={user?.following?._id}
                onClick={() => handleUserClick(user?.following?._id)}
                className="bg-lightGray rounded-xl p-3 flex items-center gap-3 w-full cursor-pointer hover:bg-lightGrayHover transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 lg:w-14 lg:h-14">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                      alt={`${user?.following?.displayName}'s avatar`}
                      className="w-full h-full rounded-full object-cover"
                      width={56}
                      height={56}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-customWhite text-base lg:text-lg font-medium truncate">
                    {user?.following?.displayName}
                  </p>
                </div>
                <button
                  onClick={(e) => handleUnfollow(e, user?.following?._id)}
                  disabled={unfollowMutation.isPending}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 flex-shrink-0"
                >
                  Unfollow
                </button>
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
        </>
      ) : (
        <div className="bg-lightGray rounded-xl p-6 flex flex-col items-center justify-center gap-3 min-h-[200px]">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-customWhite text-lg font-medium">
            No users followed yet
          </p>
          <p className="text-gray-400 text-sm text-center">
            Start following users to see them here
          </p>
        </div>
      )}
    </div>
  );
};

export default UserFollowers;
