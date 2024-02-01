import { useEffect, useState } from 'react'
import { categories, formatDate, serverUrl } from '@/lib/utils'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Post, Result } from '@/lib/types';


const Home = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Result[] | null>(null);
  const [inputActive, setInputActive] = useState(false)

  useEffect(() => {
    fetchPosts();
  }, [category]);

  useEffect(() => {
    if (searchTerm !== '') {
      searchQuery()
    }
  }, [searchTerm])

  const fetchPosts = async () => {
    if (category) {
      const response = await fetch(`${serverUrl}/user/posts?category=${category}`);
      const data = await response.json();
      setPostsData(data);
    } else {
      const response = await fetch(`${serverUrl}/user/posts?category}`);
      const data = await response.json();
      setPostsData(data);
    }
  };

  const searchQuery = async () => {
    try {
      const response = await fetch(`${serverUrl}/user/post/search?searchTerm=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=''>
      <div className="flex items-center gap-5 my-4">
        <i className="uil uil-layers text-9xl"></i>
        <div className="">
          <div className="text-5xl font-bold">Culture Canvas</div>
          <div className="text-muted-foreground">From soulful tunes to runway chic, blockbuster films to sports spectacles, chic interiors to culinary delights.</div>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <div className="relative z-10 w-80">
          <Input
            className='flex h-9 rounded-full w-80 border border-input bg-secondary px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='search'
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
          />
            
          {inputActive && searchTerm !== '' ?
          <div className='absolute bg-background w-80 flex p-1 border rounded flex-col my-1 gap-1'>
            {searchResults?.map((result) => (
              <Link to={`/post/${result.PostID}`} key={result.PostID} className='border hover:bg-secondary px-1 rounded'>
                {result.context.Title && <p className="text-sm"><span className='text-sm font-bold'>Title:</span>{result.context.Title}</p>}
                {result.context.Summary && <p className="text-sm"><span className='text-sm font-bold'>Summary:</span>{result.context.Summary}</p>}
                {result.context.Content && <p className="text-sm"><span className='text-sm font-bold'>Content:</span>{result.context.Content}</p>}
              </Link>
            ))}
          </div> : null}
        </div>
        <div className="flex items-center gap-4">
          {category === null ?
            <Button
              onClick={() => setCategory(null)}
            >
              All
            </Button>
            :
            <Button
              variant='outline'
              onClick={() => setCategory(null)}
            >
              All
            </Button>
          }
          {categories.map((cat, index) => (
            cat === category ? (
              <Button key={index} onClick={() => setCategory(cat)}>
                {cat}
              </Button>
            ) : (
              <Button
                key={index}
                variant="outline"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            )
          ))}
      
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 my-8">
        {postsData.map((post) => (
          <div className="relative flex flex-col gap-x-2" key={post.PostID}>
            <Link to={`/post/${post.PostID}`} className=''>
              <div className="bg-slate-200 w-full h-80 overflow-hidden flex items-center justify-center">
                <img src={`${serverUrl}/files/${post.CoverImage}`} alt="" className='relative w-full h-full object-cover hover:scale-105 transition duration-300' />
              </div>
            </Link>
            <p className='text-[#2563eb] bg-secondary px-2 absolute top-4 left-4 rounded'>{post.Category}</p>
            <div className="flex justify-between">
              <Link to={`#`} className='font-playfairDisplay text-muted-foreground italic hover:text-primary'>By {post.User.Username}</Link>
              <p className='font-playfairDisplay text-muted-foreground italic'>{formatDate(post.createdAt)}</p>
            </div>
            <Link to={`/edit/${post.PostID}`}>
              <p className='text-2xl font-bold'>{post.Title}</p>
              <p className='text-sm text-muted-foreground'>{post.Summary}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
