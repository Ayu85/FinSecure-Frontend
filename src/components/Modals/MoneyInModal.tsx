import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { axiosInstance } from '@/lib/axiosInstance'

const MoneyInModal = ({ isOpen, onClose }) => {
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    fetchTransactions()
  }, [])
  const fetchTransactions = async () => {
    const res = await axiosInstance.get('/transaction/recvd-transactions')
    setTransactions(res.data)
    // console.log(res)
  }
 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Money In</DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-[500px] w-full rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>From Account</TableHead>
                <TableHead>To Account</TableHead>
                <TableHead className='w-[180px]'>Date & Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell className='font-mono'>{transaction.id}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell className='font-mono'>
                    {transaction.fromAccountNo}
                  </TableCell>
                  <TableCell className='font-mono'>
                    {transaction.toAccountNo}
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.time), 'MMM d, yyyy HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default MoneyInModal
