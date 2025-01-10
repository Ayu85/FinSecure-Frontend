import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar/Navbar'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
