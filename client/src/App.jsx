import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitle from './pages/BlogTitle'
import Layout from './pages/Layout'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import ReviewResume from './pages/ReviewResume'
import RemoveObject from './pages/RemoveObject'
import Community from './pages/Community'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
const App = () => {

  // get token
  const { getToken } = useAuth()
  useEffect(() => {
    getToken().then((token) => console.log(token))
  })

  return (
    <div>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="write-articles" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitle />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App