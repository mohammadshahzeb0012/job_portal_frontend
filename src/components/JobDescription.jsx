import { useParams } from "react-router-dom"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { setSingleJob } from "@/redux/jobSlice"
import Endpoints from "@/network/endpoints"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./shared/Navbar"
import { toast } from "react-toastify";
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import "./styles/index.css"
import Cookies from "js-cookie"

const JobDescription = () => {
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth);
    const { singleJob } = useSelector(store => store.jobs)
    const [isApplied, setIsApplied] = useState(singleJob?.applications?.length > 0 ? singleJob?.applications?.some(application => application.applicant == user?._id) : false)
    const token = Cookies.get("token")

    const applyJobHandler = useCallback(async () => {
        try {
            const res = await axios.get(`${Endpoints.apply_job}/${jobId}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer: ${token}`
                    }
                })
            if (res.data.success) {
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                setIsApplied(true)
                toast.success('Application submited!');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Soething went wrong");
        }
    }, [jobId])

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${Endpoints.get_single_job}/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId]);

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className=' job-description-head flex items-center justify-between p-3'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost"> {singleJob?.position}</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className={'text-[#7209b7] font-bold'} variant="ghost"> {singleJob?.salary ? `₹ ${singleJob.salary}` : "NA" }  </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4 px-3'>Job Description</h1>
                <div className='my-4 p-3'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Company: <span className='pl-4 font-normal text-gray-800'>{singleJob?.company?.name}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Requirements: <span className='pl-4 font-normal text-gray-800'>{singleJob?.requirements.join(" ")}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'> {singleJob?.salary ? `₹ ${singleJob.salary}` : "NA" }  </span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>
            </div>
            <LatestJobs />
            <Footer />
        </>
    )
}

export default JobDescription