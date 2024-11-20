import Endpoints from "@/network/endpoints"
import { setCompanies } from "@/redux/companySlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const UseGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${Endpoints.company_ednpoint}/get`, { withCredentials: true })
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