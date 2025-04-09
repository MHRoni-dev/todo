"use client"

import { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'
import { useTour } from '@reactour/tour'

export default function ToggleTheme() {
  const [darkMode, setDarkMode] = useState(false)
  const {isOpen, currentStep} = useTour()

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    if(isDarkMode) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }

  }, [])

  const handleToggleDarkMode = () => {
    setDarkMode((darkMode) => {
      localStorage.setItem('darkMode', String(!darkMode))
      if(darkMode) {
        document.documentElement.classList.remove('dark')
        return false
      } else {
        document.documentElement.classList.add('dark')
        return true
      }
    })
  }

  //< tour setup
  useEffect(() => {
    if(isOpen && currentStep === 4) {
      setTimeout(() => {
        handleToggleDarkMode()
        
      }, 500)
       setTimeout(() => {
        handleToggleDarkMode()
      }, 1000)
      
    }
  }, [isOpen, currentStep])
  //>

  return (
    <div className='flex justify-end '>
      <p className='flex items-center gap-2' data-tour='toogole-theme'>Dark Mode: <Switch checked={darkMode} onClick={handleToggleDarkMode}/>  </p>
    </div>
  )
}
