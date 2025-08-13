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
    <div className="min-h-screen p-6 flex flex-col lg:flex-row gap-8 bg-gray-50">
      {/* Left Column: AI Image Generator */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-800">AI Image Generator</h1>
        </div>

        <label className="mt-4 text-sm font-medium text-gray-700">Describe Your Image</label>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what you want to see in the image"
          required
          className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
        />

        <label className="mt-4 text-sm font-medium text-gray-700">Style</label>
        <div className="flex gap-3 flex-wrap mt-2">
          {imageCategories.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`px-3 py-1 text-sm rounded-full cursor-pointer border transition-colors duration-200 ${selectedCategory === item
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'text-gray-500 border-gray-300 hover:bg-gray-100'
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Publish Toggle */}
        <div className="mt-6 flex items-center gap-3">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></span>
          </label>
          <p className="text-sm text-gray-700">Make this image Public</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Image className="w-5 h-5" />
          )}
          Generate Image
        </button>
      </form>

      {/* Right Column: Generated Image */}
      <div className="w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col min-h-[400px] max-h-[600px] overflow-y-auto items-center justify-center">
        <div className="flex items-center gap-3 mb-4">
          <Image className="w-5 h-5 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-800">Generated Image</h1>
        </div>

        {!content ? (
          <div className="flex flex-col items-center justify-center gap-4 text-gray-400 text-center">
            <GalleryHorizontal className="w-10 h-10" />
            <p>Enter an image description and click "Generate Image" to get started!</p>
          </div>
        ) : (
          <img src={content} alt="Generated Content" className="w-full h-full object-contain rounded-xl" />
        )}
      </div>
    </div>

  )
}

export default GenerateImages;
