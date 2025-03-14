import React from 'react'

interface InvalidFormatProps {
    onClose: () => void;
}

export default function InvalidFormat({onClose}: InvalidFormatProps) {
  return (
    <div className='relative flex size-full h-10 mt-3 rounded-sm justify-center items-center bg-(--error-modal-background)'>
        <h1 className='text-(--error-modal-text)'>Nenhum formato selecionado.</h1>
        <button className='absolute -top-1 right-1 text-(--error-modal-close) cursor-pointer' onClick={onClose}>
          &times;
        </button>
    </div>
  )
}
