import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar"
import ApplicantsTable from './ApplicantsTable.jsx'

function Applicants() {
  const { applicants } = useSelector(store => store.application);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants
