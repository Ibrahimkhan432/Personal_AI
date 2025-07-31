import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import { Protect } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
const Dashboard = () => {

  const [creations, setCreations] = useState([])

  const getDashboardData = () => {
    setCreations(dummyCreationData)
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
      <div className='space-y-6 mt-6'>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Recent Creations</h2>
        {creations.map((item) => <CreationItem key={item.id} item={item} className='bg-white p-4 rounded-lg shadow-md border border-gray-200' />
        )}
      </div>
    </div>
  )
}

export default Dashboard
