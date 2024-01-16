import React from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from './ui/mode-toggle'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const Header = () => {
  return (
    <div className='flex items-center justify-between py-2'>
      <div className="flex items-center gap-1">
        <i className="uil uil-layers text-3xl text-blue-500"></i>
        <Link to={'/'}>the <span className=''>ladder</span> up</Link>
      </div>
      <div className="flex items-center gap-2">
        <Link to={'#'}>Archives</Link>
        <Popover>
          <PopoverTrigger>Legals</PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col">
              <Link className='hover:bg-accent px-2 py-1 rounded' to={'#'}>Privacy Policy</Link>
              <Link className='hover:bg-accent px-2 py-1 rounded' to={'#'}>Terms and Conditions</Link>
              <Link className='hover:bg-accent px-2 py-1 rounded' to={'#'}>FAQs</Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="">
        <ModeToggle />

      </div>
    </div>
  )
}

export default Header