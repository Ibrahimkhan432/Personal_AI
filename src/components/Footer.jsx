import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                    <div className="md:max-w-96">
                        <img className="h-9" src={assets.logo} alt="dummyLogoDark" />
                        <p className="mt-6 text-sm">
                            Smart Work is a platform that provides AI tools to help you create content, write articles, and enhance your work. Our tools are designed to make content creation easier and more efficient.
                        </p>
                    </div>
                    <div className="flex-1 flex items-start md:justify-end gap-20">
                        <div>
                            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                            <ul className="text-sm space-y-2">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Privacy policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 mb-5">
                            </h2>
                            <div className="text-sm space-y-2">
                                <p>

                                </p>
                                <div className="flex items-center gap-2 pt-4">
                                    <input className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email" />
                                    <button className="bg-primary cursor-pointer w-24 h-9 text-white rounded" >Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="pt-4 text-center text-xs md:text-sm pb-5">
                    Copyright 2025 © <a href="https://prebuiltui.com">Smart Work</a>. All Right Reserved.
                </p>
            </footer>
        </div>

    )
}
export default Footer