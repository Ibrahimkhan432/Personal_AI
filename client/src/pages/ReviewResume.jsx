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
    <div className='h-full overflow-y-scroll p-6 flex flex-wrap items-start gap-4 text-slate-700'>
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Review Resume</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>FileText Resume</p>
        <input
          disabled={loading}
          onChange={(e) => setInput(e.target.files[0])}
          type='file'
          accept='application/pdf'
          required
          className='w-full p-2 mt-2 px-3  rounded-md border  border-gray-300 text-gray-500 cursor-pointer'
        />
        <p className='text-sm text-gray-500 font-light mt-1 '>Support PDF redume only</p>
        <button disabled={loading} className='flex w-full p-2 mt-4 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg cursor-pointer  justify-center gap-2'>
          {loading ? <Loader2 className='w-5' /> : <FileText className='w-5' />}
          Review Resume
        </button>
      </form >

      {/* Right Column: Generated Blog */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3 mb-4'>
          <FileText className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>
        {content ? (
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <FileText className='w-9 h-9' />
            <p className='text-center'>Upload your resume and click "Review Resume" to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewResume
