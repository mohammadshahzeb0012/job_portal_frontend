import Endpoints from "@/network/endpoints"
import { setAllJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";

const useGetAllJobs = () => {
  const dispatch = useDispatch()
  const { searchedQuery } = useSelector(store => store.jobs)

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${Endpoints.get_all_jobs}?keyword=${searchedQuery}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs))
        }
      } catch (error) {
        toast.error("something went wrong")
      }
    }
    fetchAllJobs()
  }, [])
}

export default useGetAllJobs