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
import { categories, serverUrl, testData } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { Trash } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface JwtPayload {
    userId: number;
    username: string;
    email: string;
}

const Edit = () => {
  const { postId } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [userData, setUserData] = useState<JwtPayload | null>(null);
    const [summary, setTextareaValue] = useState('');
    const [title, setTextInputValue] = useState('');
    const [content, setContent] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    
    const onChange = (content: string) => {
        setContent(content)
    }

    useEffect(() => {
      fetchPost()
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const data = jwtDecode(accessToken);
          setUserData(data as JwtPayload | null);
        }
    }, []);
    
  const fetchPost = async () => {
    try {
      const response = await fetch(`${serverUrl}/user/post/${postId}`);
      const data = await response.json();
      // console.log(data)
      setTextInputValue(data.Title);
      setTextareaValue(data.Summary);
      setCategory(data.Category);
      setContent(data.Content)
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = (value: any) => {
    setCategory(value);
  };

  const handleSubmit = async () => {      
    try {
        const response = await fetch(`${serverUrl}/user/post/edit/${postId}`, {
            method: 'PUT',
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

  const deletePost = async () => {
    try {
      const response = await fetch(`${serverUrl}/user/post/delete/${postId}`, {
        method: 'DELETE'
      })
      const res = await response.json();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col items-center'>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <button
          onClick={() => setIsOpen(true)}
          type='button' className='bg-[#ff00002f] text-destructive py-2 px-3 rounded'>
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this post
            and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button type='button' onClick={() => {deletePost(); setIsOpen(false)}}>Confirm</Button>
          <Button type='button' onClick={() => setIsOpen(false)} variant={'secondary'}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
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
              { content &&
              <>
                <Label htmlFor="content">Post content</Label>
                <div className='text-muted-foreground'>
                  <Editor
                      onChange={onChange}
                      initialContent={content}
                  />
                </div>
              </>}
            </div>
            <Button>Submit changes</Button>
        </form>
    </div>
  )
}

export default Edit