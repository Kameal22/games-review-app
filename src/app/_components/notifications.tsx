"use client";
import { useState, useRef, useEffect } from "react";
import { Notification } from "@/app/types/notification";

interface NotificationsProps {
  notifications?: Notification[];
  unreadCount?: number;
  markAllAsRead: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  notifications = [],
  unreadCount = 0,
  markAllAsRead,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-customWhite hover:bg-lightGray rounded-lg transition-colors duration-200"
        aria-label="Powiadomienia"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-darkGreyBackground rounded-xl shadow-lg border border-lightGray z-50 max-h-96 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-lightGray">
            <h3 className="text-lg font-semibold text-customWhite">
              Powiadomienia
            </h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-full">
                {unreadCount} nowych
              </span>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-80">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <p className="text-greyText text-sm">Brak powiadomień</p>
              </div>
            ) : (
              <div className="divide-y divide-lightGray">
                {notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <div
                      key={notification._id}
                      className="p-4 hover:bg-lightGray transition-colors duration-200 cursor-pointer bg-lightGray/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-customWhite text-sm font-medium mb-1">
                            {notification.message}
                          </p>
                          <p className="text-greyText text-xs">
                            {new Date(
                              notification.createdAt
                            ).toLocaleDateString("pl-PL", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {notifications.filter((notification) => !notification.read)
                  .length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <svg
                      className="w-16 h-16 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <p className="text-greyText text-sm">
                      Wszystkie powiadomienia zostały przeczytane
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.filter((notification) => !notification.read).length >
            0 && (
            <div className="p-3 border-t border-lightGray">
              <button
                onClick={markAllAsRead}
                className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Oznacz wszystkie jako przeczytane
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
