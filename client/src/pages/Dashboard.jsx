import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Loader2, Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const Dashboard = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        setCreations(data.creations)
      }
      else {
        console.log(data.message)
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashboardData()
  }, [])


  return (
    <div className='h-full p-6 overflow-y-scroll'>
      <div className='flex justify-start gap-4 flex-wrap'>
        {/* total crearion card */}
        <div className='flex justify-between items-center sm:min-w-1/4 bg-white p-4 rounded-lg shadow-md border border-gray-200'>
          <div>
            <p>Total Creations</p>
            <h2>{creations.length}</h2>
          </div>
          <div>
            <Sparkles className='text-blue-500 w-8 h-8' />
          </div>
        </div>
        {/* Active Plan   card */}
        <div className='flex justify-between items-center sm:min-w-1/4 bg-white  p-4 rounded-lg shadow-md border border-gray-200'>
          <div>
            <p>Active Plan</p>
            <h2 className='text-blue-500 font-semibold'>
              <Protect plan='premium' fallback='Free'>Premium</Protect>
            </h2>
          </div>
          <div>
            <Gem className='text-blue-500 w-8 h-8' />
          </div>
        </div>
      </div>
      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <Loader2 className='w-8 h-8 animate-spin' />
        </div>
      ) : (
        <div className='space-y-6 mt-6'>
          <h2 className='text-xl font-semibold mt-6 mb-4'>Recent Creations</h2>
          {creations.map((item) => <CreationItem key={item.id} item={item} className='bg-white p-4 rounded-lg shadow-md border border-gray-200' />
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard
