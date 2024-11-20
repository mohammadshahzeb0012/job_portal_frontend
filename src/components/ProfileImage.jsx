import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2, User } from "lucide-react"
import { Input } from "./ui/input"
import axios from "axios"
import Endpoints from "@/network/endpoints"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/redux/authSlice"

const ProfileImage = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState(null)
    const [loading, setLoading] = useState(false)

    const fileUri = user?.profile?.profilePhoto

    const changeFileHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.files[0] })
    }

    const subMitImageHAndel = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("fileIri", fileUri ? fileUri : null)
        if(input !== null){
            formData.append("file",input.file)
        }
    
        try {
            setLoading(true)
            const res = await axios.post(`${Endpoints.user_profile_pic}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            setOpen(false)
            console.log("Error",error)
            // toast.error(error.response.data.message);
        } finally {
            setLoading(false);
            setOpen(false)
        }
    }

    return (
        <div onClick={() => setOpen(true)}>
            <Avatar className="h-24 w-24">
                {
                    user?.profile?.profilePhoto ? <AvatarImage  src={user?.profile?.profilePhoto} alt="profile"/> :
                     <span>NA</span>

                }
            </Avatar>
            <Dialog open={open}>
                <DialogContent onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile Pic</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={subMitImageHAndel} className="flex items-center gap-2">
                        <Input
                            name="file"
                            type="file"
                            required
                            onChange={changeFileHandler}
                        />

                        {
                            loading ? <Button disabled={loading} className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                                : <Button className="w-full my-4">Update</Button>
                        }
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export default ProfileImage