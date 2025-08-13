import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { Heart, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const Community = () => {

  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false)

  const { getToken } = useAuth()
  const fetchCreations = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        console.log('Fetched creations:', data.creations);
        setCreations(data.creations)
      }
      else {
        console.log(data.message)
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error fetching creations:', error)
      toast.error(error.response?.data?.message || error.message || 'Failed to fetch creations')
    } finally {
      setLoading(false)
    }
  }


  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(`/api/user/toggle-like-creation`, { id }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        toast.success(data.message)
        await fetchCreations()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      toast.error(error.response?.data?.message || error.message || 'Failed to toggle like')
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])


  return !loading ? (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h1 className='p-2 text-xl font-semibold text-slate-700'>Creations</h1>
      <div className="bg-white w-full rounded-xl overflow-y-scroll p-4 h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {creations.filter(creation => creation.type === "image").map((creation, index) => (
            <div
              key={index}
              className="relative inline-block w-full h-full overflow-hidden rounded-lg shadow-md cursor-pointer group"
            >
              {creation.type === "image" && (
                <img
                  src={creation.content}
                  alt={creation.prompt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', creation.content);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              )}
              {creation.type === "image" && (
                <div 
                  className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm hidden"
                  style={{ display: 'none' }}
                >
                  Image not available
                </div>
              )}
              <div className='absolute bottom-0 top-0 right-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/90 text-white rounded-lg'>
                <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
                <div className='flex gap-1 items-center'>
                  <p>{creation.likes?.length || 0}</p>
                  <Heart
                    onClick={() => imageLikeToggle(creation.id)}
                    disabled={loading}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer${creation.likes?.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <Loader2 className='w-5 h-5 animate-spin' />
    </div>
  )
}

export default Community