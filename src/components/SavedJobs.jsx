import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"
import SavedJobsTable from "./SavedJobsTable"

const SavedJobs = () => {

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5 px-2'>Saved Jobs</h1>
                <SavedJobsTable />
            </div>
            <Footer />
        </div>
    )
}

export default SavedJobs