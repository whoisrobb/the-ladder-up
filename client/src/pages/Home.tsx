import { useEffect, useState } from 'react'
import { categories, formatDate, serverUrl } from '@/lib/utils'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Post, Result } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Result[] | null>(null);
  const [inputActive, setInputActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [category, currentPage]);

  useEffect(() => {
    if (searchTerm !== '') {
      searchQuery()
    }
  }, [searchTerm])

  const fetchPosts = async () => {
    try {
      if (category) {
        const response = await fetch(`${serverUrl}/user/posts?category=${category}&page=${currentPage}`);
        const { page, posts, totalPages } = await response.json();
        setPostsData(posts);
        setCurrentPage(page);
        setTotalPages(totalPages);
      } else {
        const response = await fetch(`${serverUrl}/user/posts?category&page=${currentPage}}`);
        const { page, posts, totalPages } = await response.json();
        setPostsData(posts);
        setCurrentPage(page);
        setTotalPages(totalPages);
      }
    } catch (err) {
      console.error(err);
      toast({
          variant: 'destructive',
          title: 'Something went went wrong!',
          description: `${err}`,
      });
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
      {totalPages &&
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant={'ghost'} className='text-muted-foreground' onClick={() => setCurrentPage((prev) => prev -= 1)} disabled={currentPage == 1}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            Previous
          </Button>

          {currentPage > 1 &&
          <Button variant={'ghost'} disabled>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </Button>}

          <Button variant={'outline'}>{currentPage}</Button>

          {currentPage < totalPages &&
          <Button variant={'ghost'} disabled>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </Button>}

          <Button variant={'ghost'} className='text-muted-foreground' onClick={() => setCurrentPage((prev) => prev += 1)} disabled={currentPage == totalPages}>
            Next
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </Button>
        </div>
      </div>}
    </div>
  )
}

export default Home
