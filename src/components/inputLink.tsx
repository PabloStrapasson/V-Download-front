import React from 'react'

interface InputLinkProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLink({ value, onChange }: InputLinkProps) {
  return (
    <div className='flex flex-col gap-4'>
        <input 
            type='url' 
            placeholder='Ex: https://www.youtube.com/watch?v=abcdefghijk'
            value={value}
            onChange={onChange}
            className='w-150 h-10 p-3 border-2 border-black rounded-sm' 
        />
    </div>
  )
}
//'w-3xs h-4 border border-red-500'