import Endpoints from "@/network/endpoints"
import { setAllJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetHighligthsJobs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${Endpoints.get_highlights_jobs}`, { withCredentials: true })
        if (res.data.success) {
            console.log(res.data)
          dispatch(setAllJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllJobs()
  }, [])
}

export default useGetHighligthsJobs