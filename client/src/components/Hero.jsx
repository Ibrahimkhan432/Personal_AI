import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';


const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full px-4 sm:px-20 xl:px-32  relative inline-flex flex-col justify-center bg-[url(../src/assets/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
            <div className='text-center mb-6'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl xl:text-7xl'>Create Anything with
                    <span className='text-primary font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
                        AI Tools
                    </span>
                </h1>
                <p className='text-xl sm:text-2xl md:text-3xl mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto text-gray-700'>Transform your content creation with our AI tool , write anything , any content and enhance your work</p>
            </div>
            <div className='flex justify-center items-center mt-8 flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-4'>
                <button
                    onClick={() => navigate('/ai')}
                    className='cursor-pointer bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out text-md'>Get Started</button>
                <button className='cursor-pointer bg-white text-primary hover:text-blue-500 transition duration-300 ease-in-out text-md shadow-lg border-gray-800 py-3 px-6 rounded-lg'>Learn More</button>
            </div>
            <div className='flex items-center gap-2 text-center items-center justify-center mt-8 text-gray-600 flex-col sm:flex-row'>
                <img src={assets.user_group} alt='user pic' className='h-8' />
                <p>
                    Trusted by 10K+ users
                </p>
            </div>
        </div>
    )
}
export default Hero
