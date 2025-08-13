import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full bg-gradient-to-t from-gray-100 via-white to-gray-50 text-gray-500 "
    >
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-t border-gray-300/40 pt-8">
        {/* Logo & Description */}
        <div className="md:max-w-lg">
          <h1
            onClick={() => navigate("/")}
            className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer tracking-wide hover:scale-105 transition-transform duration-300"
          >
            Personal AI
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Personal AI is a platform providing powerful AI tools to help you write articles, generate images, remove backgrounds, and enhance your content efficiently.
          </p>
        </div>

        {/* Company Links & Newsletter */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-12">
          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-semibold mb-4 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors duration-300">Privacy Policy</a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-xs"
          >
            <h2 className="font-semibold mb-4 text-gray-800">Subscribe</h2>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 placeholder-gray-500 focus:ring-2 ring-blue-500 outline-none w-full h-10 rounded px-3 transition-all duration-300 focus:scale-105"
              />
              <button className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded hover:scale-105 shadow-lg transition-transform duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.p
        className="pt-8 text-center text-xs sm:text-sm text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Copyright 2025 ©{" "}
        <a href="/" className="text-blue-500 hover:underline">
          Personal AI
        </a>
        . All rights reserved.
      </motion.p>

      {/* Background Gradient Accent */}
      <div className="absolute -top-20 left-0 w-full h-48 bg-gradient-to-t from-blue-200 via-purple-200 to-transparent opacity-20 rounded-full pointer-events-none"></div>
    </motion.footer>
  );
};

export default Footer;
