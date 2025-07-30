import { Eraser, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

function RemoveBackground() {

  const [input, setInput] = useState('')
  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-wrap items-start gap-4 text-slate-700'>
      {/* Left Column: Blog Configuration */}
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
        <button className='flex w-full p-2 mt-4 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg cursor-pointer  justify-center gap-2'>
          <Eraser className='w-5' />
          Remove Background
        </button>
      </form >

      {/* Right Column: Generated Blog */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3 mb-4'>
          <Eraser className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        <div className='text-sm text-gray-600 flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Eraser className='w-9 h-9' />
            <p className='text-center'>Upload an aimage and click "Remove Background" to get started!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground
