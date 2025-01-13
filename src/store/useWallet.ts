import { axiosInstance } from '@/lib/axiosInstance'
import { create } from 'zustand'

interface wallet {
  userWallets: any
  fetchWallets: () => void
}
const useWallet = create<wallet>(set => ({
  userWallets: [],
  async fetchWallets () {
    try {
      const wallets = await axiosInstance.get('/wallet/fetch-wallets')
      console.log(wallets)
      set({userWallets:wallets?.data})
    } catch (error) {
      console.log(error)
    }
  }
}))

export default useWallet
