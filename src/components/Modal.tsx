import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-5 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-1/3">
        {children}
        <button className="mt-4 text-blue-600" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
