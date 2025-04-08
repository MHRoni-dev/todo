"use client"

import { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'

export default function ToggleTheme() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    if(isDarkMode) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }

  }, [])

  const handleToggleDarkMode = () => {
    localStorage.setItem('darkMode', String(!darkMode))
    if(darkMode) {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }
    

  return (
    <div className='flex justify-end '>
      <p className='flex items-center gap-2'>Dark Mode: <Switch checked={darkMode} onClick={handleToggleDarkMode}/>  </p>
    </div>
  )
}
