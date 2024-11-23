import Endpoints from "@/network/endpoints"
import { setCompanies } from "@/redux/companySlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"


const UseGetAllCompanies = () => {
    const token = Cookies.get("token")
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${Endpoints.company_ednpoint}/get`, { 
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer: ${token}`
                      }
                })
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompanies()
    }, [])
}

export default UseGetAllCompanies