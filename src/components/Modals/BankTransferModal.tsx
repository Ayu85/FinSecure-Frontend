import React, { useState } from 'react'
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

const BankTransferModal = ({ show, onClose }) => {
  const [accountNumber, setAccountNumber] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [amount, setAmount] = useState(0)
  const { userAccounts } = useAccount()
  const { toast } = useToast()

  const handleSend = async e => {
    // e.prevenDefault()
    // Logic to handle the transfer
    try {
      const transaction = await axiosInstance.post(
        '/transaction/initiate-transaction',
        {
          amount,
          fromAccountNo: selectedAccount.accountNumber,
          toAccountNo: accountNumber,
          toIFSC: ifscCode,
          toAccountName: recipientName
        }
      )
      if (transaction) {
        toast({
          title: transaction.data.message,
          variant: 'success'
        })
        onClose()
      }
    } catch (error) {
      console.log(error)

      toast({
        title: error.response.data.message || 'Login failed',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Bank Transfer</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Sender's Account Dropdown */}
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Select Sender's Account" />
            </SelectTrigger>
            <SelectContent>
              {userAccounts.map((account, index) => (
                <SelectItem key={index} value={account}>
                  {account.accountNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Account Number Input */}
          <Input
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            placeholder='Enter Account Number'
            className='w-full'
          />

          {/* IFSC Code Input */}
          <Input
            value={ifscCode}
            onChange={e => setIfscCode(e.target.value)}
            placeholder='Enter IFSC Code'
            className='w-full'
          />

          {/* Recipient Name Input */}
          <Input
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
            placeholder='Enter Recipient Name'
            className='w-full'
          />
          {/* Amount Input */}
          <Input
            value={amount}
            type='number'
            onChange={e => setAmount(e.target.value)}
            placeholder='Enter amount'
            className='w-full'
          />

          <div className='flex flex-col gap-2 pt-4'>
            <Button onClick={handleSend} className='w-full'>
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
  )
}

export default BankTransferModal
