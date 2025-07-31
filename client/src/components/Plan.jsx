import { PricingTable } from '@clerk/clerk-react';
import React from 'react'

const Plan = () => {
    return (
        <div className='max-w-2xl mx-auto my-10 p-6 z-20 bg-white'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold '>Choose your Plan</h2>
                <p className='text-gray-600 mx-auto max-w-lg'>Start free services as grow your content , article . Find the perfect plan for your content</p>
            </div>
            <div className='mt-10 max-sm-:mx-8 flex flex-wrap justify-center items-center gap-4'>
                <PricingTable />
            </div>
        </div>
    )
}

export default Plan;
