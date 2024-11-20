import Endpoints from "@/network/endpoints"
import { setSingleCompany } from "@/redux/companySlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${Endpoints.company_ednpoint}/get/${companyId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany()
    }, [companyId])

}

export default useGetCompanyById