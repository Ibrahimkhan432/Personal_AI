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
    <div className="min-h-screen p-6 flex flex-col lg:flex-row gap-8 bg-gray-50">
    {/* Left Column: Blog Configuration */}
    <form
      onSubmit={onSubmitHandler}
      className="w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-blue-500" />
        <h1 className="text-xl font-bold text-gray-800">Blog Configuration</h1>
      </div>
  
      <label className="mt-4 text-sm font-medium text-gray-700">Keyword</label>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="The future of AI is..."
        required
        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
      />
  
      <label className="mt-4 text-sm font-medium text-gray-700">Category</label>
      <div className="flex gap-3 flex-wrap mt-2">
        {blogCategories.map((item) => (
          <span
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={`px-3 py-1 text-sm rounded-full cursor-pointer border transition-colors duration-200 ${
              selectedCategory === item
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'text-gray-500 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
  
      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex items-center justify-center gap-2 w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <Hash className="w-5 h-5" />
        )}
        Generate Title
      </button>
    </form>
  
    {/* Right Column: Generated Blog */}
    <div className="w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col min-h-[400px] max-h-[600px] overflow-y-auto">
      <div className="flex items-center gap-3 mb-4">
        <Hash className="w-5 h-5 text-blue-500" />
        <h1 className="text-xl font-bold text-gray-800">Generated Blog</h1>
      </div>
  
      {!content ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4 text-center">
          <Hash className="w-10 h-10" />
          <p>Enter a topic and click "Generate Blog" to get started!</p>
        </div>
      ) : (
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 flex-1 overflow-y-auto">
          <Markdown>{content}</Markdown>
        </div>
      )}
    </div>
  </div>
  
  )
}

export default BlogTitle;
