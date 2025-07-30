import React, { useState } from 'react'
import Markdown from 'react-markdown'
const CreationItem = ({ item }) => {

    const [expaned, setExpand] = useState(false)

    return (
        <div
            onClick={() => setExpand(!expaned)}
            className='p-4 w-full bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200'>
            <div className='flex items-center justify-between gap-4'>
                <div>
                    <h3>{item.prompt}</h3>
                    <p className='text-gray-600 text-sm'>{item.type} - {new Date(item.created_at).toLocaleString()}</p>
                </div>
                <button className='bg-[#EFF6F] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full cursor-pointer'>{item.type}</button>
            </div>
            {expaned && (
                <div>
                    {item.type === 'image' ? (
                        <div>

                            <img src={item.content} alt='img' className='mt-4 w-full h-auto max-w-md rounded-lg' />
                        </div>
                    ) : (
                        <div className='mt-4 text-gray-700 text-sm overflow-y-scroll'>
                            <div className='reset-tw'>
                                <Markdown>{item.content}</Markdown>
                            </div>
                        </div>
                    )
                    }
                </div>
            )}
        </div>
    )
}

export default CreationItem
