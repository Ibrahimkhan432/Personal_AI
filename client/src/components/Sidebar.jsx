"use client"

import { Protect, useClerk, useUser } from "@clerk/clerk-react"
import { Eraser, FileText, Hash, HomeIcon as House, ImageIcon, LogOut, Scissors, SquarePen, Users } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

const NavLinks = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-articles", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: ImageIcon },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div
      className={`w-64 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 shadow-xl ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out backdrop-blur-sm`}
    >
      <div className="flex flex-col items-center p-6 h-full w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img
              src={user?.imageUrl || "/placeholder.svg"}
              alt="avatar"
              className="w-16 h-16 rounded-full cursor-pointer border-3 border-white shadow-lg group-hover:shadow-xl transition-all duration-200"
              onClick={() => navigate("/")}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </div>
          <h1 className="mt-3 text-slate-800 font-semibold text-lg">{user?.fullName}</h1>
          <div className="mt-1 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
            <span className="text-xs font-medium text-slate-600">
              <Protect plan="Premium" fallback="Free Plan">
                Premium Plan
              </Protect>
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 w-full px-3">
          {NavLinks?.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${isActive ? "text-white" : "group-hover:scale-110"}`}
                  />
                  <span className="text-sm font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="w-full p-4 border-t border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white/50">
        <div
          className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/40 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
          onClick={() => openUserProfile()}
        >
          <img
            src={user?.imageUrl || "/placeholder.svg"}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            alt="Profile"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{user?.fullName}</p>
            <p className="text-xs text-slate-500">
              <Protect plan="Premium" fallback="Free Plan">
                Premium Plan
              </Protect>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              signOut()
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
