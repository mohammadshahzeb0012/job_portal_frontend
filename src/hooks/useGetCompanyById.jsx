import Endpoints from "@/network/endpoints"
import { setSingleCompany } from "@/redux/companySlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"


const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch()
    const token = Cookies.get("token")


    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${Endpoints.company_ednpoint}/get/${companyId}`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer: ${token}`
                        }
                    })
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