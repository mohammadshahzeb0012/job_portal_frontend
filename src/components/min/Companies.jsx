import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import CompaniesTable from "./CompaniesTable"
import UseGetAllCompanies from "@/hooks/useGetAllCompanies"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "@/redux/companySlice"

const Companies = () => {
  UseGetAllCompanies()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handelChange = (e) => {
    const searchVal = e.target.value;
    dispatch(setSearchCompanyByText(searchVal.toUpperCase()))
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={handelChange}
          />
          <Button onClick={() => navigate(`/admin/companies/create`)}>New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies