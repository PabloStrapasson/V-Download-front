import React from 'react'

interface InvalidLinkProps {
    onClose: () => void;
}

export default function InvalidLink({onClose}: InvalidLinkProps) {
  return (
    <div className='flex size-full h-10 rounded-sm justify-center items-center bg-[#faf6d6]'>
        <h1>Opa! Link inválido. Por favor copie e cole novamente.</h1>
        <button className="relative -top-3 -right-25 text-[#c0b45e] cursor-pointer" onClick={onClose}>
          &times;
        </button>
    </div>
  )
}
