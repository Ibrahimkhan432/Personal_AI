import React, { use } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate()

    const { user } = useUser()
    const { openSignIn } = useClerk()


    return (
        <div className=" z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
 <h1 
                className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer tracking-wide"
                onClick={() => navigate('/')}
            >
                PersonalAi
            </h1>

            {
                user ? <UserButton /> : (
                    <button
                        onClick={openSignIn}
                        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get Started
                        <ArrowRight className='w-4 h-4' />
                    </button>
                )
            }


        </div>
    )
}

export default Navbar;
