import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
const Login = () => {
  return (
    <div className='flex justify-center items-center pt-44'>
      <div className='w-96 space-y-4 p-10 border border-zinc-600 rounded-md' >
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' id='email' placeholder='Email' />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='password'>Password</Label>
          <Input type='password' id='password' placeholder='Password' />
        </div>
        <Button className='w-full'>Submit</Button>
      </div>
    </div>
  )
}

export default Login
