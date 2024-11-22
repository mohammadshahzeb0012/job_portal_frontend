import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.jobs)
    return (
        <div className='max-w-7xl mx-auto my-20 sm:px-1'>
            <h1 className='text-4xl font-bold mx-2'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs