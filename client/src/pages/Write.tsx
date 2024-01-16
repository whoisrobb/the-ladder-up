import Editor from '@/components/Editor'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect, useState } from 'react'
import { categories, serverUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

interface JwtPayload {
    userId: number;
    username: string;
    email: string;
}

const Write = () => {
    const navigate = useNavigate()

    const [category, setCategory] = useState('');
    const [userData, setUserData] = useState<JwtPayload | null>(null);
    const [summary, setTextareaValue] = useState('');
    const [title, setTextInputValue] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    
    const onChange = (content: string) => {
        setContent(content)
    }
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const data = jwtDecode(accessToken);
          setUserData(data as JwtPayload | null);
        }
    }, []);
      

  const handleCategoryChange = (value: any) => {
    setCategory(value);
  };

  const handleSubmit = async () => {
    try {
        const response = await fetch(`${serverUrl}/user/post/create/${userData?.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, summary, category, content })
        })
        if (response.ok) {
          navigate('/');
        } else {
          const errorData = await response.json();
          console.error(errorData);
        }
    } catch (err) {
        console.error(err);
    }
  }
  return (
    <div className='flex flex-col items-center'>
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}} className="w-[56rem] flex flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input type="text" value={title} onChange={(e) => setTextInputValue(e.target.value)} id="title" placeholder="Add post title" />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="summary">Post summary</Label>
                <Textarea value={summary} onChange={(e) => setTextareaValue(e.target.value)} placeholder="Add a short summary for your post" id="summary" />
            </div>
            <div className="flex gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="cover-image">Cover image</Label>
                    <Input type="file" id="cover-image"
                        onChange={(e) => {
                            if (e.target.files) {
                                setFile(e.target.files[0]);
                            }
                        }}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Set category</Label>
                    <Select onValueChange={handleCategoryChange} value={category}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat, index) => (
                                <SelectItem value={cat} key={index}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="border-black">
                <Label htmlFor="content">Post content</Label>
                <Editor
                    onChange={onChange}
                    initialContent={''}
                />
            </div>
            <Button>Submit post</Button>
        </form>
    </div>
  )
}

export default Write