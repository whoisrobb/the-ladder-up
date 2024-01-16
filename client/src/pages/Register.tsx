import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { serverUrl } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('Robbie');
  const [lastName, setLastName] = useState('Muchiri');
  const [username, setUsername] = useState('firstmate_rob');
  const [email, setEmail] = useState('developedbyrobbie@gmail.com');
  const [password, setPassword] = useState('iamkharri');

  const formData = { firstName, lastName, email, username, password }

  // const handleSubmit = async (): Promise<void> => {
  //   try {
  //       const response = await fetch(`${serverUrl}/auth/register`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           body: JSON.stringify(formData)
  //         }
  //       })
  //       .then((response) => {
  //           if (response.ok) {
  //               console.log('success');
  //           }
  //           return response.json();
  //       })
  //       .then((data) => {
  //         console.log(data)
  //       })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${serverUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.token);
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className='w-96'>
      <form className='mx-4' onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
        <p className='bg-gray-100 py-1 px-2 my-1 rounded'>{firstName}</p>
        <p className='bg-gray-100 py-1 px-2 my-1 rounded'>{lastName}</p>
        <p className='bg-gray-100 py-1 px-2 my-1 rounded'>{username}</p>
        <p className='bg-gray-100 py-1 px-2 my-1 rounded'>{email}</p>
        <p className='bg-gray-100 py-1 px-2 my-1 rounded'>{password}</p>
        <div className="flex items-center gap-2">
          <Button variant="secondary">cancel</Button>
          {/* <Button variant="outline">register</Button> */}
          <Button>register</Button>
        </div>
      </form>
    </div>
  )
}

export default Register