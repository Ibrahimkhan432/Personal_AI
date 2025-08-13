import { Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import FormData from 'form-data';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function RemoveObject() {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      if (!input) {
        toast.error('Please select an image file');
        return;
      }

      if (!object.trim()) {
        toast.error('Please enter an object name to remove');
        return;
      }

      if (object.split(' ').length > 1) {
        toast.error('Please enter a single object name')
        return
      }

      console.log('Selected file:', input);
      console.log('Object to remove:', object);

      const formData = new FormData();
      formData.append('image', input);
      formData.append('object', object);

      console.log('FormData created, sending request...');
      const { data } = await axios.post('/api/ai/remove-image-object',
        formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      console.log('Response received:', data);
      
      if (data.success) {
        setContent(data.content)
        toast.success('Object removed successfully!');
      }
      else {
        toast.error(data.message);
        console.log(data.message);
      }

    } catch (error) {
      console.error('API Error:', error);
      console.error('Error response:', error.response);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-wrap items-start gap-4 text-slate-700'>
      {/* Left Column*/}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type='file'
          accept='image/*'
          required
          className='w-full p-2 mt-2 px-3  rounded-md border  border-gray-300 text-gray-500 cursor-pointer'
        />
        <p className='mt-6 text-sm font-medium'>Describe object name to remove </p>
        <textarea
          rows={5}
          onChange={(e) => setObject(e.target.value)}
          value={object}
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
          placeholder='only single object name' 
          required />
        <button
          disabled={loading}
          className='flex w-full p-2 mt-4 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg cursor-pointer  justify-center gap-2'>
          {loading ? <span className='animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full'>
          </span>
            :
            <Scissors className='w-5' />
          }
          Remove Object
        </button>
      </form >

      {/* Right Column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3 mb-4'>
          <Scissors className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        {!content ? (
          <div className='text-sm text-gray-600 flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Scissors className='w-9 h-9' />
              <p className='text-center'>Upload an image and click "Remove object" to get started!</p>
            </div>
          </div>
        ) : (
          <div className='text-sm text-gray-600 flex-1 flex justify-center items-center'>
            <div className='flex flex-col items-center gap-5'>
              <img 
                src={content} 
                alt="Processed image" 
                className="max-w-full max-h-80 object-contain rounded-lg shadow-md"
                onError={(e) => {
                  console.error('Image failed to load:', content);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RemoveObject
