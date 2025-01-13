import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar/Navbar'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import useAuth from './store/useAuth'
import Dashboard from './pages/Dashboard'
import Loader from './components/Loader'
import Wallet from './pages/Wallet'

const App = () => {
  const { isAuth, checkAuth, isCheckingAuth } = useAuth()
  useEffect(() => {
    checkAuth()
  }, [])
  console.log(isCheckingAuth);
  
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster />
      {isCheckingAuth ? (
        <Loader/>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={!isAuth ? <Login /> : <Navigate to={'/dashboard'} />}
            />
            <Route
              path='/dashboard'
              element={isAuth ? <Dashboard /> : <Navigate to={'/'} />}
            />
            <Route
              path='/wallets'
              element={isAuth ? <Wallet /> : <Navigate to={'/'} />}
            />
          </Routes>
        </>
      )}
    </ThemeProvider>
  )
}

export default App
