import { axiosInstance } from '@/lib/axiosInstance'
import { create } from 'zustand'
interface auth {
  isAuth: boolean
  authUser: any
  login: (data: any) => void
  checkAuth: () => void
  isCheckingAuth: boolean
  logout: () => void
}
const useAuth = create<auth>(set => ({
  isAuth: false,
  authUser: null,
  isCheckingAuth: true,
  login: user => {
    set({ isAuth: true, authUser: user })
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post('/auth/logout')
      if (res) set({ authUser: null, isAuth: false })
    } catch (error) {}
    set({ isAuth: false, authUser: null })
  },
  checkAuth: async () => {
    try {
      const user = await axiosInstance.get('auth/check-auth')
      if (user)
        set({ isAuth: true, authUser: user.data, isCheckingAuth: false })
      else set({ isAuth: false, authUser: null, isCheckingAuth: false })
    } catch (error) {
      console.log('Auth check error', error)
      set({ isCheckingAuth: false })
    }
  }
}))

export default useAuth
