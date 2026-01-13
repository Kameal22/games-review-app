"use client";

import { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-red-600 hover:bg-red-700",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-darkGreyBackground rounded-xl p-6 max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-customWhite text-xl font-bold mb-4">{title}</h2>
        <p className="text-greyText mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-lightGray hover:bg-lightGrayHover text-customWhite rounded-lg transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${confirmButtonClass} text-white rounded-lg transition-colors duration-200`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
