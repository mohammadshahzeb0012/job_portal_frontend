import {  Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"
import EpochToHuman from "@/utils/EpochToHuman"

const Job = ({job,handelSveForLAter}) => {
    const navigate = useNavigate()
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{EpochToHuman(job?.createdAt)}</p>
                <Button  
                onClick={()=>handelSveForLAter(job._id)}
                variant="outline" 
                className="rounded-full" size="icon" 
                id={job._id}><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                    <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost"> {job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)}  variant="outline">Details</Button>
                <Button 
                onClick={()=>handelSveForLAter(job._id)}
                className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job