import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"


const Navbar = () => {
    const navigte = useNavigate()
    const dispatch = useDispatch()
    let user = useSelector(store => store.auth.user)
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${Endpoints.logout}`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigte("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }
    return (

        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>

                <div>
                    <Link to={'/'}><h1 className='text-2xl font-bold'>Dreamo<span className='text-[#F83002]'>Jobs</span></h1></Link>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <Link to={'/admin/companies'}>Companies</Link>
                                    <Link to={'/admin/jobs'}>Jobs</Link>
                                </>
                            ) :
                                (
                                    <>
                                        <Link to={'/'}>Home</Link>
                                        <Link to={'/jobs'}>Jobs</Link>
                                        <Link to={'/browse'}>Browse</Link>
                                    </>
                                )
                        }
                    </ul>
                    {
                        !user ? <div className="flex items-center gap-2">
                            <Link to={'/login'}>   <Button variant="outline">Login</Button></Link>
                            <Link to={'/signup'}><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Sign Up</Button></Link>
                        </div>
                            : <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer\">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="flex gap-4 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">lorem ipsum dollar seti</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            {
                                                user && user.role === 'student' &&
                                                <>
                                                    <User2 />
                                                    <Link to={'/profile'}>   <Button variant="link">View Profile</Button></Link>
                                                </>
                                            }
                                        </div>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Log Out</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                    }

                </div>
            </div>
        </div>

    )
}

export default Navbar