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

const SelfTransferModal = ({ show, onClose }: any) => {
  const { userAccounts } = useAccount()
  const [selectedFromAccount, setSelectedFromAccount] = React.useState('')
  const [selectedToAccount, setSelectedToAccount] = React.useState('')
  const [amount, setAmount] = React.useState(0)
  const { toast } = useToast()

  const handleSend = async () => {
    try {
      const res = await axiosInstance.post(
        '/transaction/initiate-self-transfer',
        {
          fromAC: selectedFromAccount.accountNumber,
          toAC: selectedToAccount.accountNumber,
          amount
        }
      )
      console.log(res)
      toast({
        title: res.data.message || 'Self transfer success!',
        variant: 'success'
      })
      setSelectedFromAccount('')
      setSelectedToAccount('')
      setAmount(0)
    } catch (error) {
      console.log(error)

      toast({
        title: error.response.data.message || 'Account verification failed',
        variant: 'destructive'
      })
    }
  }
  return (
    <div>
      <Dialog open={show} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Self Transfer</DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <Select
              value={selectedFromAccount}
              onValueChange={setSelectedFromAccount}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select From Account' />
              </SelectTrigger>
              <SelectContent>
                {userAccounts.map((account, index) => (
                  <SelectItem key={index} value={account}>
                    {account.accountNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedToAccount}
              onValueChange={setSelectedToAccount}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select To Account' />
              </SelectTrigger>
              <SelectContent>
                {userAccounts.map((account, index) => (
                  <SelectItem key={index} value={account}>
                    {account.accountNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Amount Input */}
            <Input
              value={amount}
              type='number'
              onChange={e => setAmount(e.target.value)}
              placeholder='Enter amount'
              className='w-full'
            />
            <div className='flex flex-col gap-2 pt-4'>
              <Button
                onClick={handleSend}
                className='w-full disabled:cursor-not-allowed'
              >
                Send
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

export default SelfTransferModal
