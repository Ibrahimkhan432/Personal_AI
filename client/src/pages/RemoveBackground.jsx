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

      if (!input) {
        toast.error('Please select an image file');
        return;
      }

      console.log('Selected file:', input);
      console.log('File size:', input.size);
      console.log('File type:', input.type);

      const formData = new FormData();
      formData.append('image', input);

      console.log('FormData created, sending request...');
      const { data } = await axios.post('/api/ai/remove-image-background',
        formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      console.log(data)
      if (data.success) {
        setContent(data.content)
        toast.success('Background removed successfully!');
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
    <div className="min-h-screen p-6 flex flex-col lg:flex-row gap-8 bg-gray-50">
    {/* Left Column: Background Removal */}
    <form
      onSubmit={onSubmitHandler}
      className="w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <Eraser className="w-6 h-6 text-blue-500" />
        <h1 className="text-xl font-bold text-gray-800">Background Removal</h1>
      </div>
  
      <label className="mt-4 text-sm font-medium text-gray-700">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setInput(e.target.files[0])}
        required
        className="w-full p-3 mt-2 rounded-md border border-gray-300 cursor-pointer text-gray-500"
      />
      <p className="text-sm text-gray-500 font-light mt-1">Support PNG, JPG and other image formats</p>
  
      <button
        type="submit"
        disabled={loading}
        className="mt-4 flex items-center justify-center gap-2 w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <Eraser className="w-5 h-5" />
        )}
        Remove Background
      </button>
    </form>
  
    {/* Right Column: Processed Image */}
    <div className="w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col min-h-[400px] max-h-[600px] overflow-y-auto items-center justify-center">
      <div className="flex items-center gap-3 mb-4">
        <Eraser className="w-5 h-5 text-blue-500" />
        <h1 className="text-xl font-bold text-gray-800">Processed Image</h1>
      </div>
  
      {!content ? (
        <div className="flex flex-col items-center justify-center gap-4 text-gray-400 text-center">
          <Eraser className="w-10 h-10" />
          <p>Upload an image and click "Remove Background" to get started!</p>
        </div>
      ) : (
        <img
          src={content}
          alt="Processed"
          className="max-w-full max-h-96 object-contain rounded-xl shadow-md"
          onError={(e) => {
            console.error('Image failed to load:', content);
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
  </div>
  
  )
}

export default RemoveBackground
