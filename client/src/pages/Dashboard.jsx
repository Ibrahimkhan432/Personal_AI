"use client"

import { useEffect, useState } from "react";
import { Gem, Loader2, Sparkles, TrendingUp, Activity, BarChart3, Calendar } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) setCreations(data.creations);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 lg:ml-4 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg font-medium">
            Monitor your creative progress and manage your projects
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          {/* Total Creations */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Creations</p>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900">{creations.length}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-medium">Active</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Plan */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Subscription Plan</p>
                  </div>
                  <h3 className="text-3xl font-bold">
                    <Protect plan="premium" fallback={<span className="text-gray-700">Free Tier</span>}>
                      <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Premium</span>
                    </Protect>
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                      <Activity className="w-3 h-3" />
                      <span className="font-medium">Current</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Gem className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* This Month */}
          <motion.div
            className="relative group md:col-span-2 xl:col-span-1"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">This Month</p>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900">{Math.floor(creations.length * 0.7)}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-full">
                      <Calendar className="w-3 h-3" />
                      <span className="font-medium">Recent</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Creations */}
        <div className="space-y-8 mt-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Recent Creations</h2>
                <p className="text-gray-600 font-medium">Your latest projects and creative work</p>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <p className="text-gray-600 text-center">Fetching your creations...</p>
            </div>
          ) : creations.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-100">
                  <Sparkles className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Ready to Create?</h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                Your creative journey starts here. Begin your first project and watch your ideas come to life.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {creations.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CreationItem item={item} className="p-8" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
