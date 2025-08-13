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
    <div className='flex-1 h-full flex flex-col gap-6 p-6'>
      <h1 className='text-2xl font-semibold text-slate-700 mb-4'>Creations</h1>

      <div className="bg-white w-full rounded-xl shadow-md p-4 overflow-y-auto h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {creations
            .filter(creation => creation.type === "image")
            .map((creation, index) => (
              <div
                key={index}
                className="relative w-full h-64 overflow-hidden rounded-xl shadow-lg cursor-pointer group"
              >
                {/* Image */}
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

                {/* Placeholder if image fails */}
                <div
                  className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-sm hidden"
                  style={{ display: 'none' }}
                >
                  Image not available
                </div>

                {/* Overlay on hover */}
                <div className='absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-b from-transparent to-black/70 text-white rounded-xl opacity-0 group-hover:opacity-100 transition'>
                  <p className='text-sm'>{creation.prompt}</p>
                  <div className='flex gap-2 items-center justify-end'>
                    <p>{creation.likes?.length || 0}</p>
                    <Heart
                      onClick={() => imageLikeToggle(creation.id)}
                      disabled={loading}
                      className={`w-5 h-5 cursor-pointer hover:scale-110 transition ${creation.likes?.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'
                        }`}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div className='flex-1 h-full flex items-center justify-center p-6'>
      <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
    </div>
  )

}

export default Community