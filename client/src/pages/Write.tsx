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
import { useState } from 'react'
import { categories, serverUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { useApp } from '@/components/app-provider'


const Write = () => {
    const navigate = useNavigate();
    const { user } = useApp();

    const [category, setCategory] = useState('');
    const [summary, setTextareaValue] = useState('');
    const [title, setTextInputValue] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const onChange = (content: string) => {
        setContent(content)
    }
      

  const handleCategoryChange = (value: any) => {
    setCategory(value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('category', category);
    formData.append('content', content);
    if (file) {
        formData.append('file', file);
    }
      
    try {
        const response = await fetch(`${serverUrl}/user/post/create/${user?.userId}`, {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            const data = await response.json();
            toast({
              title: 'Success!',
              description: `Created a post: ${data.Title}`,
            });
            navigate('/');
        } else {
            const errorData = await response.json();
            console.error(errorData);
            toast({
                variant: 'destructive',
                title: 'Something went went wrong!',
                description: `${errorData}`,
            });
        }
    } catch (err) {
        console.error(err);
        toast({
            variant: 'destructive',
            title: 'Something went went wrong!',
            description: `${err}`,
        });
    }
  }
  return (
    <div className='flex flex-col items-center'>
        <form onSubmit={async(e) => {e.preventDefault(); setIsSubmitting(true); await handleSubmit(); setIsSubmitting(false)}} className="w-[56rem] flex flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input type="text" value={title} onChange={(e) => setTextInputValue(e.target.value)} required id="title" placeholder="Add post title" />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="summary">Post summary</Label>
                <Textarea value={summary} onChange={(e) => setTextareaValue(e.target.value)} required placeholder="Add a short summary for your post" id="summary" />
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
            <Button disabled={isSubmitting}>Submit post</Button>
        </form>
    </div>
  )
}

export default Write