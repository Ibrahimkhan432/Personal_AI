import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className='relative w-full px-4 sm:px-20 xl:px-32 bg-[url(../src/assets/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen flex flex-col justify-center items-center'>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-transparent backdrop-blur-sm"></div>

            {/* Content */}
            <motion.div
                className='text-center mb-6 max-w-7xl'
                animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <motion.h1
                    className='text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight'
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Unleash Your Creativity with
                    <br />
                    <motion.span
                        className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Personal AI
                    </motion.span>
                </motion.h1>

                <motion.p
                    className='text-base sm:text-lg md:text-xl mt-5 max-w-xl mx-auto text-gray-700'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Write articles, generate images, remove backgrounds — all in one AI-powered platform.
                </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div
                className='flex flex-col sm:flex-row gap-4 mt-8 z-10'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
            >
                <button
                    onClick={() => navigate('/ai')}
                    className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer'
                >
                    Get Started
                </button>
                <button className='px-6 py-3 bg-white text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-100 hover:scale-105 transition-transform duration-300 cursor-pointer'>
                    Learn More
                </button>
            </motion.div>

            {/* Users */}
            <motion.div
                className='flex items-center gap-2 mt-8 text-gray-600 z-10'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <img src={assets.user_group} alt='user pic' className='h-8' />
                <p>Trusted by 10K+ creators worldwide</p>
            </motion.div>
        </div>
    );
};

export default Hero;
