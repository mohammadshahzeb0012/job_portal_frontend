import { useCallback, useState } from "react"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useSelector } from "react-redux"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

const PostJob = () => {
    const { companies } = useSelector(store => store.companies);
    const [loading, setLoading] = useState(false)
    const [selectCompany, setSelectCompany] = useState(null)
    const navigate = useNavigate()

    const handelSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (selectCompany === null) {
            toast.error("Please select a company!")
            return;
        }
        setLoading(true)
        const payload = {
            title: e.target.title.value,
            description: e.target.description.value,
            requirements: e.target.requirements.value,
            salary: e.target.salary.value,
            location: e.target.location.value,
            jobType: e.target.jobType.value,
            experienceLevel: e.target.experience.value,
            position: e.target.position.value,
            companyId: selectCompany
        }

        try {
            const postJob = await axios.post(`${Endpoints.post_job}`, payload, { withCredentials: true })
            if (postJob.data.success) {
                setLoading(false)
                toast.success("Job posted success!")
                navigate("/admin/jobs")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!")
            setLoading(false)
        }
    }, [selectCompany])


    const handelCompanySelect = (value) => {
        setSelectCompany(value)
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={handelSubmit} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                required
                                type="text"
                                name="title"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                required
                                type="text"
                                name="description"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                required
                                type="text"
                                name="requirements"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                required
                                type="text"
                                name="location"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                required
                                type="text"
                                name="jobType"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                required
                                type="number"
                                min="0"
                                name="experience"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                required
                                type="number"
                                min="0"
                                name="position"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            {
                                companies?.length > 0 &&
                                <Select onValueChange={handelCompanySelect}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>                
                                            {
                                                companies?.map((company) => {
                                                    return (
                                                        <SelectItem key={company._id} value={company?._id}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            }
                        </div>
                    </div>
                    {
                        loading ? <Button disabled className="w-full my-4 cursor-not-allowed"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob