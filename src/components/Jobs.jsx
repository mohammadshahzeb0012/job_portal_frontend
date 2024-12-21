import Navbar from "./shared/Navbar"
import FilterCard from './FilterCard.jsx'
import Job from "./Job"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import { Filter, X } from "lucide-react"
import Footer from "./shared/Footer"
import useGetAllJobs from "@/hooks/useGetAllJobs"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { setSaveForLater } from "@/redux/jobSlice"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { allJobsSelector } from "@/redux/filTersSelectors"
import { clearAllFilters } from "@/redux/filterSlice"
import CustomLoader from "./CustomLoader"

const Jobs = () => {
  const [jobsLoading] = useGetAllJobs()
  const [open, setopen] = useState(false)
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const token = Cookies.get("token")

  useEffect(() => {
    return () => {
      dispatch(clearAllFilters())
    }
  }, [])

  const handelSveForLAter = useCallback(async (jobId, currentSaveForLaterStatus) => {
    try {
      setloading(true)
      const types = !currentSaveForLaterStatus;
      const res = await axios.post(`${Endpoints.save_for_later}`, {
        jobId: jobId
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer: ${token}`
        }
      })
      dispatch(setSaveForLater({ jobId, types }))
      if (res.status === 201) {
        toast.success("Job saved success!")
      } else if (res.status === 200) {
        toast.info("Job removed success!")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong")
    } finally {
      setloading(false)
    }

  }, [])

  const allJobsarr = useSelector(allJobsSelector)


  return (
    <div>
      <Navbar />
      {
        jobsLoading ? <CustomLoader />
          : <div className='w-auto' >
            <div className='flex gap-5 mobie-view-jobs'>
              <div className='w-20% FilterCard-wrraper '>
                <div className="filter-card-desktop">
                  <FilterCard />
                </div>
                <div className="filter-card-mobile mt-2">
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
              <div className='flex-1 h-[100vh] overflow-y-scroll'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                  {
                    allJobsarr?.length <= 0 ? <span>No Job Available</span> :
                      allJobsarr.map((job) => {
                        return <Job key={job._id} job={job} handelSveForLAter={handelSveForLAter} loading={loading} />
                      })
                  }
                </div>
              </div>
            </div>
          </div>
      }

      <Footer />
    </div>
  )
}

export default Jobs