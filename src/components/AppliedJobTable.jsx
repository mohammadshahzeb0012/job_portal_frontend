import { useEffect } from "react"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { setAllAppliedJobs, setJobLoading } from "@/redux/jobSlice"
import { toast } from "react-toastify";
import EpochToHuman from "@/utils/EpochToHuman"
import { useNavigate } from "react-router-dom"
import "./styles/index.css"
import Cookies from "js-cookie"
import CustomLoader from "./CustomLoader"


const AppliedJobTable = () => {
    const dispatch = useDispatch()
    const { allAppliedJobs,loading } = useSelector(store => store.jobs)
    const navigate = useNavigate()
    const token = Cookies.get("token")

    useEffect(() => {
        const fecthAppliedJobs = async () => {
            setJobLoading(true)
            try {
                const res = await axios.get(`${Endpoints.Applicants_end_point}/get`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer: ${token}`
                        }
                    })
                if (res.data.application) {
                    dispatch(setAllAppliedJobs(res?.data?.application))
                }
            } catch (error) {
                toast.error(error.response.cmessage || "Error occured while fetching")
            } finally {
                setJobLoading(false)
            }
        }
        fecthAppliedJobs()
    }, [])


    return (
        <div>
            {
                loading ? <CustomLoader /> :
                    <Table className="applied-jobs-table">
                        <TableCaption>A list of your applied jobs</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applied</TableHead>
                                <TableHead>Job Role</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="applied-job-table-boy">
                            {
                                allAppliedJobs?.length <= 0 ? <span>You havent applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                                    <TableRow onClick={() => navigate(`/description/${appliedJob._id}`)} className="cursor-pointer" key={appliedJob._id}>
                                        <TableCell>{EpochToHuman(appliedJob?.createdAt)}</TableCell>
                                        <TableCell>{appliedJob?.job?.title}</TableCell>
                                        <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                        <TableCell className="text-right"><Badge className={`${appliedJob.status === "rejected" ? "bg-red-400" : appliedJob.status == "pending" ? "bg-gray-400" : "bg-green-400"}`}>{appliedJob?.status}</Badge></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
            }
        </div>
    )
}

export default AppliedJobTable