import AppliedJobTable from './AppliedJobTable'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'

const AppliedJobs = () => {
    return (<>
        <Navbar />
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-lg my-5 px-2'>Applied Jobs</h1>
            <AppliedJobTable />
        </div>
        <Footer />
    </>
    )
}

export default AppliedJobs
