import React, { useEffect, useState } from 'react'
import { categories, formatDate, serverUrl } from '@/lib/utils'
import { Link } from 'react-router-dom';
// import EditorTest from '@/components/Editor'

type User = {
  Username: string;
};

type Post = {
  PostID: string;
  Title: string;
  Summary: string;
  content: any;
  User: User;
  Category: string;
  CoverImage: string;
  createdAt: string;
  updatedAt: string;
  UserUserID: string;
};

const Home = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(`${serverUrl}/user/posts`);
    const data = await response.json();
    setPostsData(data);
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
        <div className="">
          <input
            className='flex h-9 rounded-full w-80 border border-input bg-secondary px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
            type="text"
            placeholder='search'
          />
        </div>
        <div className="flex items-center gap-4">
          {categories.map((cat, index) => (
            <button className='bg-secondary px-4 py-1 capitalize' key={index}>{cat}</button>
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
