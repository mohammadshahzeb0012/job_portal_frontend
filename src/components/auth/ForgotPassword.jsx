import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import Endpoints from "@/network/endpoints";

const ForgotPassword = () => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

    const submitHanler = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const role = e.target.role.value

        if (!role) {
            toast.error("Role is Required")
            return
        }

        setLoading(true)
        const payLoad = {}
        payLoad.email = email
        payLoad.role = role
        e.target.reset()

        try {
            const res = await axios.post(`${Endpoints.send_forgot_link}`, payLoad)
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHanler} className='w-[90%] sm:w-[80%] md:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Forgot Password</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup defaultValue="option-one" className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading ? <Button disabled={loading} className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                            : <Button type="submit" className="w-full my-4">Send Link</Button>
                    }
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default ForgotPassword
