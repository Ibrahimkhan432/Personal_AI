import { FileText, Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'
import FormData from 'form-data';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


function ReviewResume() {

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()
  const [content, setContent] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('resume', input);
      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      console.log(data)
      if (data.success) {
        setContent(data.content)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-wrap items-start gap-6 text-slate-700'>
      {/* Left Column: Upload Resume */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-6 bg-white rounded-xl border border-gray-200 shadow-md'
      >
        <div className='flex items-center gap-3 mb-4'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-2xl font-semibold'>Review Resume</h1>
        </div>

        <label className='text-sm font-medium'>Upload Your Resume (PDF)</label>
        <input
          type='file'
          accept='application/pdf'
          onChange={(e) => setInput(e.target.files[0])}
          disabled={loading}
          required
          className='w-full p-2 mt-2 rounded-md border border-gray-300 text-gray-500 cursor-pointer'
        />
        <p className='text-xs text-gray-400 mt-1'>Supported format: PDF only</p>

        <button
          type='submit'
          disabled={loading}
          className='flex w-full justify-center items-center gap-2 mt-6 p-3 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white font-medium rounded-lg shadow hover:shadow-lg transition'
        >
          {loading ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            <FileText className='w-5' />
          )}
          Review Resume
        </button>
      </form>

      {/* Right Column: Analysis Result */}
      <div className='w-full max-w-lg p-6 bg-white rounded-xl border border-gray-200 shadow-md flex flex-col min-h-[400px] max-h-[600px] overflow-y-auto'>
        <div className='flex items-center gap-3 mb-4'>
          <FileText className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-2xl font-semibold'>Analysis Results</h1>
        </div>

        {content ? (
          <div className='text-sm text-gray-700'>
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4 text-gray-400 h-full'>
            <FileText className='w-10 h-10' />
            <p className='text-center text-sm'>
              Upload your resume and click "Review Resume" to see the analysis!
            </p>
          </div>
        )}
      </div>
    </div>
  )

}

export default ReviewResume
