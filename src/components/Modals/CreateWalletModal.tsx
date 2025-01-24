import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import useAccount from '@/store/useAccount'
import { axiosInstance } from '@/lib/axiosInstance'
import { useToast } from '@/hooks/use-toast'

const CreateWalletModal = ({ show, onClose }: any) => {
  const walletName = React.useRef()
  const { toast } = useToast()

  const handleCreateWallet = async () => {
    try {
      const res = await axiosInstance.post('/wallet/create-wallet', {
        walletName: walletName.current.value
      })
      console.log(res)
      toast({
        title: res.data.message || 'Wallet Successfully Created!',
        variant: 'success'
      })
      onClose()
    } catch (error) {
      console.log(error)

      toast({
        title: error.response.data.message || 'Wallet Creation failed',
        variant: 'destructive'
      })
    }
  }
  return (
    <div>
      <Dialog open={show} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Create Wallet</DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <Input
              ref={walletName}
              // onChange={e => setRecipientName(e.target.value)}
              placeholder='Wallet Name'
              className='w-full'
            />
            <div className='flex flex-col gap-2 pt-4'>
              <Button
                onClick={handleCreateWallet}
                className='w-full disabled:cursor-not-allowed'
              >
                Create
              </Button>
              <DialogClose asChild>
                <Button variant='outline' className='w-full'>
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateWalletModal
