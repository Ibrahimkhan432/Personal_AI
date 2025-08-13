import { useAuth } from '@clerk/clerk-react'
import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Markdown from 'react-markdown'
import { motion } from 'framer-motion'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function WriteArticle() {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.length} words.`
      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )
      if (data.success) setContent(data.content)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col lg:flex-row gap-8 bg-gray-50">
      {/* Left: Configuration Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-800">Article Configuration</h1>
        </div>

        <label className="mt-4 text-sm font-medium text-gray-700">Article Topic</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="The future of AI is..."
          required
          className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
        />

        <label className="mt-4 text-sm font-medium text-gray-700">Article Length</label>
        <div className="flex gap-3 flex-wrap mt-2">
          {articleLength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`px-4 py-1 text-sm rounded-full cursor-pointer border transition-colors duration-200 ${
                selectedLength.text === item.text
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'text-gray-500 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {item.text}
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
            <Edit className="w-5 h-5" />
          )}
          Generate Article
        </button>
      </form>

      {/* Right: Generated Article */}
      <motion.div
        className="w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col min-h-[400px] max-h-[600px] overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Edit className="w-5 h-5 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-800">Generated Article</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4 text-center">
            <Edit className="w-10 h-10" />
            <p>Enter a topic and click "Generate Article" to get started!</p>
          </div>
        ) : (
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default WriteArticle
