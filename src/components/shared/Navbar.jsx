import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Chrome, FileOutput, House, LogOut, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { setUser } from "@/redux/authSlice"
import "./styles/index.css"
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { useEffect, useState } from "react"


const Navbar = () => {
    const navigte = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const [cookieUser, setCookieUSer] = useState(Cookies.get("user_data"))
    const [token, setToken] = useState(Cookies.get("token"))

    useEffect(() => {
        if (token && cookieUser) {
            setUser(JSON.parse(cookieUser))
        }
    }, [token, cookieUser])

    const logoutHandler = async () => {
        Cookies.remove("token")
        Cookies.remove("user_data")
        setUser(null)
        toast.success("Logged out success")
        navigte("/")
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-5'>
                <div>
                    <Link to={'/'}><h1 className='text-2xl font-bold'>Dreamo<span className='text-[#F83002]'>Jobs</span></h1></Link>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user ?
                                user?.role === "recruiter" ? (
                                    <>
                                        <Link to={'/admin/companies'}>Companies</Link>
                                        <Link to={'/admin/jobs'}>Jobs</Link>
                                    </>
                                ) :
                                    (
                                        <div className="deskop-nav-items flex items-center gap-5">
                                            <Link to={'/'}>Home</Link>
                                            <Link to={'/jobs'}>Jobs</Link>
                                            <Link to={'/browse'}>Browse</Link>
                                            <Link to={'/user/applidedjobs'}>Applied</Link>
                                        </div>
                                    ) : null
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
                                <PopoverContent className="w-30">
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
                                            <User2 />
                                            <Link to={'/profile'}>   <Button variant="link">View Profile</Button></Link>
                                        </div>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            {
                                                user && user.role === 'student' &&
                                                <div>
                                                    <div className="mobile-nav-items">
                                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                            <FileOutput />
                                                            <Link to={'/user/applidedjobs'}><Button variant="link">Applied</Button></Link>
                                                        </div>
                                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                            <Briefcase />
                                                            <Link to={'/jobs'}>   <Button variant="link">Jobs</Button></Link>
                                                        </div>
                                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                            <Chrome />
                                                            <Link to={'/browse'}>   <Button variant="link">Browse</Button></Link>
                                                        </div>
                                                    </div>
                                                </div>
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