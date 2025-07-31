import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';

const Community = () => {

  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData)

  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])


  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h1 className='p-2 text-xl font-semibold text-slate-700'>Creations</h1>
      <div className="bg-white w-full rounded-xl overflow-y-scroll p-4 h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative inline-block w-full h-full overflow-hidden rounded-lg shadow-md cursor-pointer group"
            >
              {creation.type === "image" && (
                <img
                  src={creation.content}
                  alt={creation.prompt}
                  className="w-full h-full object-cover"
                />
              )}
              <div className='absolute bottom-0 top-0 right-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/90 text-white rounded-lg'>
                <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
                <div className='flex gap-1 items-center'>
                  <p>{creation.likes.length}</p>
                  <Heart className={`min-w-5 h-5 hover:scale-110 cursor-pointer${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Community