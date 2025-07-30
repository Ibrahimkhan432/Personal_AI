import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Icon, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavLinks = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-articles', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users },
]



const Sidebar = ({ sidebar, setSidebar }) => {

    const navigate = useNavigate()
    const { user } = useUser()
    const { signOut, openUserProfile } = useClerk()


    return (
        <div className={`w-60  bg-white border-r border-gray-100 flex flex-col justify-between items-center max:sm-:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out `}>
            <div className=' flex flex-col item-center  p-4 h-full my-7 w-full font-medium'>
                <img src={user?.imageUrl} alt='avatar' className='w-13 mx-auto cursor-pointer mb-4 rounded-full'
                    onClick={() => navigate('/')} />
                <h1 className='mt-1 items-center text-center'>{user.fullName}</h1>

                <div className='px-2 py-4 flex flex-col gap-2 items-start w-full text-gray-600'>
                    {NavLinks?.map(({ to, label, Icon }) => (
                        <NavLink key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                                </>
                            )}
                            <Icon className='w-5 h-5' />
                            <span className='text-sm'>{label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div>
                <div className='flex gap-2 items-center cursor-pointer'
                    onClick={() => openUserProfile()}>
                    <img src={user.imageUrl} className='w-6 h-6 rounded-full cursor-pointer' />
                    <div>
                        <span className='ml-2 text-sm'>{user.fullName}</span>
                        <p className='ml-2 text-xs text-gray-500'>
                            <Protect plan='Premium' fallback='Free' > Premium </Protect> Plan
                        </p>
                    </div>
                    <div className='w-5 p-4 text-primary cursor-pointer'>
                        <LogOut onClick={signOut} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
