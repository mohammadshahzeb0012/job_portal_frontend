import EpochToHuman from "@/utils/EpochToHuman"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import "./styles/index.css"

const SavedJobsTable = () => {
    const token = Cookies.get("token")
    const navigate = useNavigate()
    const [savedJob, setSavedJobs] = useState([])
    const [loading, setloading] = useState(false)

    const handelSveForLAter = async (jobId,objId) => {
        try {
            setloading(true)
            const res = await axios.post(`${Endpoints.save_for_later}`, {
                jobId: jobId
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer: ${token}`
                }
            })
         if (res.status === 200) {
                toast.info("Job removed success!")
                setSavedJobs(prevJobs => prevJobs.filter(job => job._id !== objId))
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong")
        } finally {
            setloading(false)
        }

    }

    useEffect(() => {
        const f = async () => {
            try {
                const res = await axios.get(`${Endpoints.get_saved_jobs}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer: ${token}`
                    }
                })
                setSavedJobs([...res.data.jobs])
            } catch (error) {
                console.log(error)
            }
        }
        f()
    }, [])

    return (
        <div>
            <Table className="applied-jobs-table">
                <TableCaption>A list of your Saved jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Saved</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>View</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="applied-job-table-boy">
                    {
                        savedJob?.length <= 0 ? <span>You havent any saved job yet.</span> : savedJob.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{EpochToHuman(appliedJob?.createdAt)}</TableCell>
                                <TableCell>{appliedJob?.jobId?.title}</TableCell>
                                <TableCell>{appliedJob?.jobId?.company?.name}</TableCell>
                                <TableCell className="text-blue-900 underline cursor-pointer" onClick={() => navigate(`/description/${appliedJob._id}`)} >View</TableCell>
                                <TableCell onClick={()=>handelSveForLAter(appliedJob?.jobId?._id,appliedJob._id)} disabled={loading} className="text-right cursor-pointer hover:text-red-600 hover:underline">Delete</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default SavedJobsTable
