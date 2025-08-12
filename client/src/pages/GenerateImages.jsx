import { Edit, GalleryHorizontal, Hash, Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import Markdown from 'react-markdown'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const imageCategories = ["Basic style", "realistic style", "3D", "Cartoon style", "Fantasy style"]

function GenerateImages() {
  const [selectedStyle, setSelectedStyle] = useState('Basic style')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Basic style')

  const { getToken } = useAuth()
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an image of   ${input} in the style ${selectedStyle}`
      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });

      console.log(data)
      if (data.success) {
        setContent(data.content)
        setLoading(false)
      }
      else {
        toast.error(data.message);
        console.log(data.message);
        setLoading(false)
      }

    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false)
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-wrap items-start gap-4 text-slate-700'>
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>describe Your Image</p>
        <textarea
          rows={5}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type='' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you want to see in the image ' required />
        <p className='mt-6 text-sm font-medium'>Style</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {imageCategories.map((item) =>
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`text-sm px-2 py-1 border rounded-full cursor-pointer  ${selectedCategory === item ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`}
            >{item}</span>
          )}
        </div>
        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={(e) => setPublish(e.target.value)}
              checked={publish}
              className='sr-only peer'
            />
            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'>
            </div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'>
            </span>
          </label>
          <p className='text-sm'>Make this image Public</p>
        </div>
        <button
          disabled={loading}
          className='flex w-full p-2 mt-4 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg cursor-pointer  justify-center gap-2'>
          {loading ? <span className='animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full'>
          </span>
            :
            <Image className='w-5' />
          }
          Generate Image
        </button>
      </form >

      {/* Right Column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3 mb-4'>
          <Image className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Image</h1>
        </div>
        {!content ? (
          <div className='text-sm text-gray-600 flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <GalleryHorizontal className='w-9 h-9' />
              <p className='text-center'>Enter an aimage and click "Generate Image" to get started!</p>
            </div>
          </div>
        ) : (
          <img src={content} alt='content' className='w-full h-full object-contain' />
        )}
      </div>
    </div>
  )
}

export default GenerateImages;
