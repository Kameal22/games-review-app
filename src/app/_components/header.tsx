"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/stores/user-store";
import { useToastStore } from "@/stores/toast-store";
import Notifications from "./notifications";
import { getTokenFromCookie } from "../global-utils/get-token-from-cookies";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useUserStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();

  const fetchNotifications = async () => {
    try {
      // Get token from cookies
      const token = getTokenFromCookie();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `https://games-review-api.onrender.com/api/notifications/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user data";
      throw new Error(errorMessage);
    }
  };

  const fetchUnreadNotificationsCount = async () => {
    try {
      // Get token from cookies
      const token = getTokenFromCookie();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `https://games-review-api.onrender.com/api/notifications/unread-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user data";
      throw new Error(errorMessage);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = getTokenFromCookie();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.patch(
        `https://games-review-api.onrender.com/api/notifications/read-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to mark all as read";
        throw new Error(errorMessage);
      }
      const errorMessage =
        error instanceof Error ? error.message : "Failed to mark all as read";
      throw new Error(errorMessage);
    }
  };

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: async () => {
      // Invalidate and refetch notifications and unread count
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
      await queryClient.invalidateQueries({
        queryKey: ["unreadNotificationsCount"],
      });
      addToast({
        type: "success",
        title: "Success",
        message: "All notifications have been marked as read",
      });
    },
    onError: (error: Error) => {
      addToast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to mark all as read",
      });
    },
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: isAuthenticated,
  });

  const { data: unreadNotificationsCount } = useQuery({
    queryKey: ["unreadNotificationsCount"],
    queryFn: fetchUnreadNotificationsCount,
    enabled: isAuthenticated,
  });

  const handleLogout = () => {
    // Use the logout function from the user store
    logout();
    addToast({
      type: "info",
      title: "Logged out",
      message: "You have been successfully logged out",
    });
    // Redirect to home page
    router.push("/");
  };

  return (
    <div className="flex justify-between bg-darkGreyBackground px-4 lg:px-6 py-2 w-full relative h-20 lg:h-28">
      <div className="flex items-center">
        <Link href={isAuthenticated ? "/dashboard" : "/"}>
          <Image
            src="/logo_white.png"
            alt="Logo"
            width={94}
            height={94}
            className="w-12 h-12 lg:w-[94px] lg:h-[84px]"
            priority
          />
        </Link>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        {isAuthenticated && (
          <>
            {user && (
              <p className="text-customWhite text-sm lg:text-base">
                Welcome, {user.displayName}!
              </p>
            )}
            <Notifications
              notifications={notifications?.notifications}
              unreadCount={unreadNotificationsCount?.unreadCount}
              markAllAsRead={() => markAllAsReadMutation.mutate()}
            />
            <p
              onClick={handleLogout}
              className="text-customWhite underline cursor-pointer text-sm lg:text-base whitespace-nowrap"
            >
              Logout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
