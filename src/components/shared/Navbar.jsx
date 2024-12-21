import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Briefcase, Chrome, File, House, LogOut, User, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { setUser } from "@/redux/authSlice"
import { toast } from "react-toastify"
import "./styles/index.css"

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
            toast.error(error?.response?.data?.message || "Something went worng")
        }

    }

    return (
        <div className='bg-[#F7F6E0]'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-5'>
                <div>
                    <Link to={'/'}><h1 className='text-2xl font-bold'>Dreamo<span className='text-[#F83002]'>Jobs</span></h1></Link>
                </div>     
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <Link className="hover:border-b-2 hover:border-black" to={'/admin/companies'}>Companies</Link>
                                    <Link className="hover:border-b-2 hover:border-black" to={'/admin/jobs'}>Jobs</Link>
                                </>
                            ) :
                                (
                                    <div className="deskop-nav-items flex items-center gap-5">
                                        <Link className="hover:border-b-2 hover:border-black" to={'/'}>Home</Link>
                                        <Link className="hover:border-b-2 hover:border-black" to={'/jobs'}>Jobs</Link>
                                        <Link className="hover:border-b-2 hover:border-black" to={'/browse'}>Browse</Link>
                                    </div>
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
                                    <Avatar className="cursor-pointer hover:border-2">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback><User /></AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-30 bg-yellow-50">
                                    <div className="flex gap-4 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback><User /></AvatarFallback>
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
                                                <div>
                                                    <div className="mobile-nav-items">
                                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                            <House />
                                                            <Link to={'/'}>   <Button variant="link">Home</Button></Link>
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
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                        <User2 />
                                                        <Link to={'/profile'}>   <Button variant="link">View Profile</Button></Link>
                                                    </div>
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                        <File />
                                                        <Link to={'/user/applidedjobs'}>   <Button variant="link">Applied Jobs</Button></Link>
                                                    </div>
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                        <Bookmark />
                                                        <Link to={'/user/savedjobs'}>   <Button variant="link">Saved Jobs</Button></Link>
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