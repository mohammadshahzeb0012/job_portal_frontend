import Navbar from "./shared/Navbar"
import FilterCard from './FilterCard.jsx'
import Job from "./Job"
import { useSelector } from "react-redux"
import { useState } from "react"
import { Filter, X } from "lucide-react"
import Footer from "./shared/Footer"
import useGetAllJobs from "@/hooks/useGetAllJobs"

const Jobs = () => {
  useGetAllJobs()
  const { allJobs } = useSelector(store => store.jobs)
  const [open, setopen] = useState(false)
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 ' >
        <div className='flex gap-5 mobie-view-jobs'>
          <div className='w-20% FilterCard-wrraper '>
            <div className="filter-card-desktop">
              <FilterCard />
            </div>
            <div className="filter-card-mobile">
              <div className="flex justify-between p-2">
                <Filter className="cursor-pointer" onClick={() => setopen(!open)} />
                <h2 className="font-bold">Filters</h2>
                {
                  open &&
                  <div className="side-bar">
                    <span className="lucid-close-icon">
                      <X onClick={() => setopen(!open)} />
                    </span>
                    <FilterCard />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className='flex-1 h-[92vh] '>
            <h2 className='text-3xl font-bold p-3'>Latest <span className="text-[#F83002] ">Jobs</span></h2>
            <div className='h-[88vh]  overflow-y-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
              {
                allJobs.length <= 0 ? <span>No Job Available</span> :
                  allJobs.map((job) => {
                    return <Job key={job._id} job={job} />
                  })
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Jobs