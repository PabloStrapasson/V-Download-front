import React from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function FormatModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
      <div className="fixed inset-0 bg-(--modal-backdrop) backdrop-blur-md opacity-50" onClick={onClose}></div>
      <div className="bg-(--modal-background) p-8 rounded shadow-lg z-10 ">
        <button className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}