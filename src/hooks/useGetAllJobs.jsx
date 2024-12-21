import Endpoints from "@/network/endpoints"
import { setAllJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import Cookies from "js-cookie"

const useGetAllJobs = () => {
  const dispatch = useDispatch()
  const { searchedQuery } = useSelector(store => store.jobs)
  const token = Cookies.get("token")
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true)
      console.log("before fetching")
      try {
        const res = await axios.get(`${Endpoints.get_all_jobs}?keyword=${searchedQuery}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer: ${token}`
            }
          },
        )
        console.log("after fecthig")

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error)
        console.log("After error")
        toast.error(error?.response?.data?.message || "something went wrong")
      }finally{
        console.log("finaly")
        setLoading(false)
      }
    }
    fetchAllJobs()
  }, [])

  return [loading]
}

export default useGetAllJobs