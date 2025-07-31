import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '../button'

function Adminheader({setOpen}) {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block'>
      <AlignJustify />
      <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button className='inline-flex gap-2 items-center px-4 py-2 text-sm shadow font-medium rounded-b-md'>
        <LogOut />
          Logout</Button>
      </div>
    </header>
  )
}

export default Adminheader