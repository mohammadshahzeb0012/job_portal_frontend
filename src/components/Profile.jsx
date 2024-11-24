import { Contact,  Mail, Pen } from "lucide-react"
import Navbar from "./shared/Navbar"
import { Button } from "./ui/button"
import { Label } from "@radix-ui/react-label"
import { useEffect, useState } from "react"
import UpdateProfileDialog from "./UpdateProfileDialog"
import { useDispatch, useSelector } from "react-redux"
import { Badge } from "./ui/badge"
import ProfileImage from "./ProfileImage"
import Footer from "./shared/Footer"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import Cookies from "js-cookie"
import { setLoading, setUser } from "@/redux/authSlice"
import { toast } from "react-toastify"
import "./styles/index.css"
import CustomLoader from "./CustomLoader"

const Profile = () => {
    const [open, setOpen] = useState(false)
    const { user, loading } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const token = Cookies.get("token")

    useEffect(() => {
        const fetchProfile = async () => {
            dispatch(setLoading(true))
            try {
                const res = await axios.get(`${Endpoints.user_profile_details}`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer: ${token}`
                        }
                    })
                if (res.data.success) {
                    dispatch(setUser(res.data.user))
                }
            } catch (error) {
                toast.error("Something went wrong")
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchProfile()
    }, [])

    return (
        <div>
            <Navbar />
            {loading ? <CustomLoader />
                : <div className='profile-details-wrrpaer max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                    <div className='flex justify-between'>
                        <div className='profile-details-img-bio flex justify-center items-center gap-4'>
                            <ProfileImage />
                            <div>
                                <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                                <p>{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <Button className="text-right" variant="outline" onClick={() => setOpen(!open)}><Pen /></Button>
                    </div>
                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className='my-5'>
                        <h1>Skills</h1>
                        <div className='profile-skills-wrrpaer flex items-center gap-1'>
                            {
                                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className="text-md font-bold">Resume</Label>
                        {
                            user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                        }
                    </div>
                </div>
            }

            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer />
        </div>
    )
}

export default Profile