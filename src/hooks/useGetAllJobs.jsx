import Endpoints from "@/network/endpoints"
import { setAllJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import Cookies from "js-cookie"

const useGetAllJobs = () => {
  const dispatch = useDispatch()
  const { searchedQuery } = useSelector(store => store.jobs)
  const token = Cookies.get("token")

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${Endpoints.get_all_jobs}?keyword=${searchedQuery}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer: ${token}`
            }
          },
        )
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error)
        toast.error("something went wrong")
      }
    }
    fetchAllJobs()
  }, [])
}

export default useGetAllJobs