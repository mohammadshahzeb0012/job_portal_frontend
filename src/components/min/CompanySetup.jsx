import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { toast } from "sonner"
import useGetCompanyById from "@/hooks/useGetCompanyById"
import { useSelector } from "react-redux"

const CompanySetup = () => {
    const { id } = useParams()
    useGetCompanyById(id)
    const company = useSelector(store => store.companies.singleCompany)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInput({
            name: company?.name || "",
            description: company?.description || "",
            website: company?.website || "",
            location: company?.location || "",
            file: null
        })
    }, [company])

    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = useCallback(async (e) => {
        e.preventDefault()
        const formData = new FormData();
        if (input.name) formData.append("name", input.name)
        if (input.description) formData.append("description", input.description);
        if (input.website) formData.append("website", input.website);
        if (input.location) formData.append("location", input.location);
        if (input.file) formData.append("file", input.file)

        try {

            setLoading(true)
            const res = await axios.post(`${Endpoints.company_ednpoint}/update/${id}`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: true
            })
            setLoading(false)
            if (res.data.success) {
                toast.success(res.data.message);
                // navigate("/admin/companies")
            }
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message ? error.response.data.message : "Error occured")
        }
    }, [])


    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex justify-between items-center gap-5 p-8 px-0'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                className="cursor-not-allowed"
                                disabled
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button disabled={loading} className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup