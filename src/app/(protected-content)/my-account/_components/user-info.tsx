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
    <div className="flex flex-col items-center justify-center w-full gap-4 p-2">
      <div className="w-20 h-20 lg:w-24 lg:h-24">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="User Avatar"
          className="w-full h-full rounded-full object-cover"
          width={96}
          height={96}
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center w-full max-w-md">
        <p className="text-xl lg:text-2xl font-semibold text-customWhite">
          {data?.displayName}
        </p>

        <div className="w-full">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={bio}
                onChange={handleBioChange}
                onBlur={handleBioBlur}
                placeholder="Tell us about yourself..."
                className="w-full p-3 bg-darkGreyBackground border border-gray-600 rounded-lg text-customWhite placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                rows={3}
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
              className="w-full p-3 bg-darkGreyBackground border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors duration-200 min-h-[80px] flex items-center justify-center"
            >
              {bio ? (
                <p className="text-sm lg:text-base text-customWhite text-center">
                  {bio}
                </p>
              ) : (
                <p className="text-sm lg:text-base text-gray-400 text-center">
                  Click here to add your bio
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
