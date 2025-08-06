import { Eraser, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import FormData from 'form-data';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function RemoveBackground() {

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      const formData = new FormData();
      formData.append('image', input);

      const prompt = `Write an image of   ${input} in the style ${selectedStyle}`
      const { data } = await axios.post('/api/ai/remove-image-background',
        formData, {
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
      {/* Left Column*/}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>BackGround Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          value={input}
          type='file'
          accept='image/*'
          required
          className='w-full p-2 mt-2 px-3  rounded-md border  border-gray-300 text-gray-500 cursor-pointer'
        />
        <p className='text-sm text-gray-500 font-light mt-1 '>Support PNG,JPG and other image formats</p>
        <button
          disabled={loading}
          className='flex w-full p-2 mt-4 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg cursor-pointer  justify-center gap-2'>
          {loading ? <span className='animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full'>
          </span>
            :
            <Eraser className='w-5' />
          }
          Remove Background
        </button>
      </form >

      {/* Right Column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3 mb-4'>
          <Eraser className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        {!content ? (
          <div className='text-sm text-gray-600 flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Eraser className='w-9 h-9' />
              <p className='text-center'>Upload an aimage and click "Remove Background" to get started!</p>
            </div>
          </div>
        ) : (
          <div className='text-sm text-gray-600 flex-1 flex justify-center items-center'>
            <div className='reset-tw text-sm flex flex-col items-center gap-5 text-gray-400'>
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RemoveBackground
