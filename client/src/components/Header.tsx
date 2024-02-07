import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ModeToggle } from './ui/mode-toggle'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'
import { useApp } from './app-provider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { loginSchema } from '@/lib/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { customBtn, destructive, ghost } from '@/lib/utils'

type Input = z.infer<typeof loginSchema>;

const Header = () => {
  const { user, handleLogout, handleLogin } = useApp();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<Input>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      value: '',
      password: ''
    }
  });

  const onSubmit = async(values: Input) => {
    setIsSubmitting(true);
    await handleLogin(values.value, values.password);
    setIsSubmitting(false);
  }

  return (
    <div className='flex items-center justify-between py-2'>
      <div className="flex items-center gap-1">
        <i className="uil uil-layers text-3xl text-blue-500"></i>
        <Link to={'/'} className='font-light'>the <span className='font-bold font-playfairDisplay italic'>ladder</span> up</Link>
      </div>
      <div className="flex items-center gap-2 mobile:hidden">
        {/* explore */}
        <Popover>
          <PopoverTrigger asChild>
            <button className={`${customBtn} ${ghost}`}>
              Explore
            </button>
          </PopoverTrigger>
          <PopoverContent className='grid grid-cols-2 gap-1 w-full'>
            <Explore />
          </PopoverContent>
        </Popover>

        {/* guidelines */}
        <Popover>
          <PopoverTrigger asChild>
            <button className={`${customBtn} ${ghost}`}>
              Guidelines
            </button>
          </PopoverTrigger>
          <PopoverContent className='grid grid-cols-2 gap-1 w-full'>
            <Guidelines />
          </PopoverContent>
        </Popover>

        {/* discover */}
      </div>
      <div className="flex items-center gap-2">
        {user ?
        <>
          <Button onClick={() => navigate('/write')}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </Button>
          <ModeToggle />
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="p-3">
              <div className="flex gap-4">
                <Avatar className=''>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="">
                  <p>{user.username}</p>
                  <p className='text-muted-foreground text-sm'>{user.email}</p>
                </div>      
              </div>
              <br />
              <hr />
              <button className={`${customBtn} ${destructive} flex items-center my-2 w-full gap-2 capitalize text-left`} onClick={handleLogout}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                Log out
              </button>
            </PopoverContent>
          </Popover>
        </>:
        <>
          <ModeToggle />
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Log into your account.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                  
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or email</FormLabel>
                        <FormControl>
                          <Input placeholder="Username or email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="password" {...field} type='password' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>Sign in</Button>
                </form>
              </Form>
              <DialogFooter className='text-center'>
                Don't have an account? 
                <Link className='text-slate-500' to={'/register'} onClick={() => setIsOpen(false)}>Sign Up</Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>}
      </div>
    </div>
  )
}

export default Header


const Explore = () => {
  return (
    <>
      <button className='bg-secondary w-full rounded p-2 flex flex-col items-baseline justify-center'>
        <i className="uil uil-layers text-3xl text-blue-500"></i>
        <div className='font-light mb-2'>the <span className='font-bold font-playfairDisplay italic'>ladder</span> up</div>
        <div className="text-muted-foreground leading-tight w-48 text-left text-sm">Dynamic blog app with stunning user interface. Built with React, Node JS Express and PostgreSQL.</div>
      </button>
      <div className="flex flex-col gap-2">
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm w-48 flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">Browse code</p>
          <p className="text-muted-foreground text-sm leading-tight">
            Check out project source code on github
          </p>
        </Link>
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm w-48 flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">Contact</p>
          <p className="text-muted-foreground text-sm leading-tight">
            Reach out, or just say hi
          </p>
        </Link>
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm w-48 flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">Contribute</p>
          <p className="text-muted-foreground text-sm leading-tight">
            Code contributions, bug reports, or feature suggestions.
          </p>
        </Link>
      </div>
    </>
  )
}

const Guidelines = () => {
  return (
    <>
      <div className="w-60 flex flex-col gap-2">
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">Privacy Policy</p>
          <p className="text-muted-foreground text-sm leading-tight">
            Everything privacy
          </p>
        </Link>
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">Terms & Conditions</p>
          <p className="text-muted-foreground text-sm leading-tight">
            Terms and conditions governing use.
          </p>
        </Link>
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">FAQs</p>
          <p className="text-muted-foreground text-sm leading-tight">
            Frequently asked questions about the project.
          </p>
        </Link>
      </div>
      <div className="w-60 flex flex-col gap-2">
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">GDPR Compliance</p>
          <p className="text-muted-foreground text-sm leading-tight">
            Project's compliance with GDPR.
          </p>
        </Link>
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">Data Retention Policy</p>
          <p className="text-muted-foreground text-sm leading-tight">
            Check out project source code on github
          </p>
        </Link>
        <Link to={'#'}
          className='flex flex-col items-baseline rounded-sm flex-wrap px-2 py-1 gap-1 hover:bg-secondary transition-colors'
        >
          <p className="">Data security</p>
          <p className="text-muted-foreground text-sm leading-tight">
            How user and post data is retained by the project.
          </p>
        </Link>
      </div>
    </>
  )
}