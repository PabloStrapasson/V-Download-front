import React from 'react'

interface InvalidLinkProps {
    onClose: () => void;
}

export default function InvalidLink({onClose}: InvalidLinkProps) {
  return (
    <div className='flex size-full h-10 rounded-sm mb-3 justify-center items-center bg-(--error-modal-background)'>
        <h1 className='text-(--error-modal-text)'>Ops! Link inválido. Por favor copie e cole novamente.</h1>
        <button className="relative -top-3 -right-25 text-(--error-modal-close) cursor-pointer" onClick={onClose}>
          &times;
        </button>
    </div>
  )
}
