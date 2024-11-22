import Navbar from "./shared/Navbar"
import HeroSection from "./HeroSection"
import Footer from "./shared/Footer"
import CategoryCarousel from "./CategoryCarousel"
import LatestJobs from './LatestJobs'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useGetHighligthsJobs from "@/hooks/useGetHighligthsJobs"

const Home = () => {
  useGetHighligthsJobs()
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (user?.role === 'recruiter') navigate("/admin/companies")
  }, [])

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home