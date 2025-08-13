import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const blogCategories = ["General", "Health", "Sport", "Technology", "Lifestyle", "Travel", "Food"]

function BlogTitle() {
  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the category  ${selectedCategory}.`
      const { data } = await axios.post('/api/ai/generate-blogTitle', { prompt }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      console.log(data)
      if (data.success) {
        setContent(data.content)
      }
      else {
        toast.error(data.message);
        console.log(data.message);
      }

    } catch (error) {
      console.error('API Error:', error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-wrap items-start gap-4 text-slate-700'>
      {/* Left Column: Blog Configuration */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Blog Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type='text' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of AI is... ' required />
        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {blogCategories.map((item) =>
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`text-sm px-2 py-1 border rounded-full cursor-pointer  ${selectedCategory === item ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`}
            >{item}</span>
          )}
        </div>
        <br />
        <button
          disabled={loading}
          className='flex w-full p-2 mt-4 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg cursor-pointer  justify-center gap-2'>
          {loading ? <span className='animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full'></span>
            :
            <Hash className='w-5' />
          }
          Generate Title
        </button>
      </form >

      {/* Right Column: Generated Blog */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3 mb-4'>
          <Hash className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Blog</h1>
        </div>
        {!content ? (
          <div className='text-sm text-gray-600 flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Hash className='w-9 h-9' />
              <p className='text-center'>Enter a topic and click "Generate Blog" to get started!</p>
            </div>
          </div>
        ) : (
          <div className='text-sm text-gray-600 flex-1 overflow-y-scroll'>
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogTitle;
