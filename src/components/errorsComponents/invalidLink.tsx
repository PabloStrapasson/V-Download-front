import React from 'react'

interface InvalidLinkProps {
    onClose: () => void;
}

export default function InvalidLink({onClose}: InvalidLinkProps) {
  return (
    <div className='relative flex w-70 h-auto md:size-full md:h-10 rounded-sm mb-3 justify-center items-center bg-(--error-modal-background) p-2'>
        <h1 className='text-(--error-modal-text) text-[14px] md:text-[16px] text-center'>Ops! Link inválido. Por favor copie e cole novamente.</h1>
        <button className="absolute -top-1 right-1 text-(--error-modal-close) cursor-pointer" onClick={onClose}>
          &times;
        </button>
    </div>
  )
}
