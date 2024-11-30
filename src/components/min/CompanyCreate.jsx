import { Label } from "@radix-ui/react-label"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { toast } from "react-toastify";
import { setSingleCompany } from "@/redux/companySlice"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"


const CompanyCreate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState(null);
    const token = Cookies.get("token")


    const registerNewCompany = async (e) => {
        e.preventDefault()
        if (companyName !== null) {
            try {
                setLoading(true)
                const res = await axios.post(`${Endpoints.register_new_company}`, { companyName }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer: ${token}`
                    },
                    withCredentials: true
                })
                if (res?.data?.success) {
                    dispatch(setSingleCompany(res.data.company));
                    toast.success(res.data.message);
                    const companyId = res?.data?.company?._id;
                    setLoading(true)
                    navigate(`/admin/companies/${companyId}`);
                }
            } catch (error) {
                setLoading(false)
                toast.error(error?.response?.data?.message ? error.response.data.message : "Error occured")
            }
        }
    }
    
    return (
        <div>
            <Navbar />
            <form onSubmit={registerNewCompany}>
                <div className='max-w-4xl mx-auto'>
                    <div className='my-10'>
                        <h1 className='font-bold text-2xl'>Your Company Name</h1>
                        <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                    </div>

                    <Label>Company Name</Label>
                    <Input
                        type="text"
                        className="my-2"
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                    <div className='flex items-center gap-2 my-10'>
                        <Button disabled={loading} variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                        {
                            loading ? <Button disabled={loading} className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Refister</Button>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CompanyCreate