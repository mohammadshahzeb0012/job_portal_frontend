import useGetAllJobs from "@/hooks/useGetAllJobs";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./shared/Footer";
import { useCallback, useEffect, useState } from "react";
import { setSaveForLater, setSearchedQuery } from "@/redux/jobSlice";
import FilterCard from "./FilterCard";
import { Filter, X } from "lucide-react";
import axios from "axios";
import Endpoints from "@/network/endpoints";
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { allJobsSelector } from "@/redux/filTersSelectors";
import { clearAllFilters } from "@/redux/filterSlice";
import CustomLoader from "./CustomLoader";

const Browse = () => {
  const [loading] =  useGetAllJobs()

    const dispatch = useDispatch()
    const { allJobs } = useSelector(store => store.jobs)
    const [open, setopen] = useState(false)
    const [btnDisbleID, setBtnDisbleID] = useState(false)
    const token = Cookies.get("token")

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
            dispatch(clearAllFilters())
        }
    }, [])

    const handelSveForLAter = useCallback(async (jobId, currentSaveForLaterStatus) => {
        try {
            setBtnDisbleID(jobId)
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
            setBtnDisbleID(null)
        }

    }, [])

    const allJobsarr = useSelector(allJobsSelector)


    return (
        <div>
            <Navbar />
            {
                loading ? <CustomLoader />
                :      <div className='w-auto'>
                <div className='flex gap-5 mobie-view-jobs'>
                    <div className='w-20% FilterCard-wrraper'>
                        <div className="filter-card-desktop">
                            <FilterCard />
                        </div>
                        <div className="filter-card-mobile mt-2">
                            <div className="flex justify-between p-2">
                                <Filter className="cursor-pointer" onClick={() => setopen(!open)} />
                                <h2 className="font-bold">Filters</h2>
                                {
                                    open &&
                                    <div className={`side-bar`}>
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
                                allJobs &&
                                allJobsarr?.map((job) => {
                                    return (
                                        <Job key={job._id} job={job} handelSveForLAter={handelSveForLAter} btnDisbleID={btnDisbleID} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div> 
            }
        
            



            {/* <div className='max-w-7xl mx-auto my-10 flex gap-5'>
                <div className="w-20">
                    <FilterCard />
                </div>
                <h1 className='font-bold text-xl my-10'>Search Results</h1>
                <div className='grid lg:grid-cols-3 gap-4 sm:grid-cols-2 sm:grid-cols-1'>
                    {
                        allJobs &&
                        allJobs?.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div> */}
            <Footer />
        </div>
    )
}

export default Browse