"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@/app/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateBio } from "../utils";
import { useToastStore } from "@/stores/toast-store";

const UserInfo: React.FC<{ data: User }> = ({ data }) => {
  const [bio, setBio] = useState(data?.bio || "");
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const handleBioClick = () => {
    setIsEditing(true);
  };

  const handleBioBlur = () => {
    // Don't auto-close on blur, let user explicitly save or cancel
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const { mutate: updateBio } = useMutation({
    mutationFn: handleUpdateBio,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userData"] });
      addToast({
        type: "success",
        title: "Bio updated",
        message: "Your bio has been updated successfully",
      });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    updateBio(bio);
  };

  const handleCancel = () => {
    setBio(data?.bio || ""); // Reset to original value
    setIsEditing(false);
  };

  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-2 min-w-0 max-w-full">
      <div className="w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="User Avatar"
          className="w-full h-full rounded-full object-cover"
          width={96}
          height={96}
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center w-full max-w-md min-w-0">
        <p className="text-xl lg:text-2xl font-semibold text-customWhite truncate w-full px-2">
          {data?.displayName}
        </p>

        <div className="w-full min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={bio}
                onChange={handleBioChange}
                onBlur={handleBioBlur}
                placeholder="Tell us about yourself..."
                className="w-full max-w-full p-3 bg-darkGreyBackground border border-gray-600 rounded-lg text-customWhite placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                rows={2}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm text-gray-400 hover:text-customWhite transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={handleBioClick}
              className="w-full p-3 bg-darkGreyBackground border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition-all duration-200 min-h-[60px] flex items-center justify-center group relative"
            >
              {bio ? (
                <p className="text-sm text-customWhite text-center">{bio}</p>
              ) : (
                <p className="text-sm text-gray-400 text-center">
                  Click here to add your bio
                </p>
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
