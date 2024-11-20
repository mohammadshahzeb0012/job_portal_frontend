import useGetAllJobs from "@/hooks/useGetAllJobs";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./shared/Footer";
import { useEffect, useState } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import FilterCard from "./FilterCard";
import { Filter, X } from "lucide-react";
import axios from "axios";
import Endpoints from "@/network/endpoints";

const Browse = () => {
    useGetAllJobs()
    const dispatch = useDispatch()
    const { allJobs } = useSelector(store => store.jobs)
    const [open, setopen] = useState(false)

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [])

    const handelSveForLAter = async (jobId) => {
        try {
            const res = await axios.post(`${Endpoints.save_for_later}`, {
                jobId: jobId
            }, { withCredentials: true })
            console.log(res)
        } catch (error) {
           console.log(error)
        }

    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5 mobie-view-jobs'>
                    <div className='w-20% FilterCard-wrraper'>
                        <div className="filter-card-desktop">
                            <FilterCard />
                        </div>
                        <div className="filter-card-mobile">
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
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                            {
                                allJobs &&
                                allJobs?.map((job) => {
                                    return (
                                        <Job key={job._id} job={job} handelSveForLAter={handelSveForLAter} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>



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