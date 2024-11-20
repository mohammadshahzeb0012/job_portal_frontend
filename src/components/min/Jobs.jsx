import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import AdminJobsTble from "./AdminJobsTble"
import { Input } from "../ui/input"
import { setSearchJobByText } from "@/redux/jobSlice"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"

const AdminJobs = () => {
  useGetAllAdminJobs()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handelChange = (e) => {
    const searchVal = e.target.value;
    dispatch( setSearchJobByText(searchVal.toUpperCase()))
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={handelChange}
          />
          <Button onClick={() => navigate('/admin/job/post')}>New Job</Button>
        </div>
        <AdminJobsTble />
      </div>
    </div>
  )
}

export default AdminJobs