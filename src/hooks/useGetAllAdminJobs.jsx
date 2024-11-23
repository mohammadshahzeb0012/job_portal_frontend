import Endpoints from "@/network/endpoints"
import { setAllAdminJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    const token = Cookies.get("token")

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${Endpoints.get_admin_jobs}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer: ${token}`
                    }
                })
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs()
    }, [])
}

export default useGetAllAdminJobs