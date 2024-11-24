import Endpoints from "@/network/endpoints"
import { setAllJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"

const useGetHighligthsJobs = () => {
  const dispatch = useDispatch()
  const token = Cookies.get("token")


  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${Endpoints.get_highlights_jobs}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer: ${token}`
          }
        })
        if (res.data.success) {
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