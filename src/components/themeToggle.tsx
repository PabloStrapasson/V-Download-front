import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
  
    const [darkMode, setDarkMode] = useState(false);
    
  useEffect(() => {
    if (localStorage.getItem('theme') === 'true') {
      setDarkMode(true);
    }
  }, []);
    
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'true');
    } else { 
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'false');
    }
  }, [darkMode]);

  return (
    <div>
        <button onClick={() => {setDarkMode(!darkMode)}} className="mt-4 p-2 bg-gray-800 text-white rounded">
          {darkMode ? 'Modo Claro' : 'Modo Escuro'}
        </button>
    </div>
  )
}
