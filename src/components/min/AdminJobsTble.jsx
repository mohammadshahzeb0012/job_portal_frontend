import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Popover } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Edit2, Eye, MoreHorizontal } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const AdminJobsTble = () => {
  const navigate = useNavigate()
  const { allAdminJobs, searchJobByText } = useSelector(store => store.jobs)
  const [filterjobs, setFilterjobs] = useState(allAdminJobs);
 

  useEffect(() => {
    if (allAdminJobs?.length > 0) {
      const filterd = allAdminJobs.filter((job) => {
        return job?.company?.name?.toUpperCase().includes(searchJobByText) || job?.title?.toUpperCase().includes(searchJobByText)
      })
      setFilterjobs(filterd)
    }
  }, [searchJobByText])

  console.log(filterjobs)





  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterjobs.map((job) => {
              return <tr key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>₹ {job?.salary}</TableCell>
                <TableCell>{job?.updatedAt}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32 ">
                      <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>
                      {/* /admin/jobs/:id/applicants */}
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                        <Eye className='w-4' />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTble
