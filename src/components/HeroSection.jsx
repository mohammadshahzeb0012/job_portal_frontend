import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"
import "./styles/index.css"

const HeroSection = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searhHandler = (e) => {
        e.preventDefault()
        const searchQuary = e.target.searchbar.value
        dispatch(setSearchedQuery(searchQuary))
        navigate("/browse")
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Embrace the journey of discovery, where every step brings you closer to the opportunities of your dreams!</p>
                <form onSubmit={searhHandler} className="hero-searchbar flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full'
                        required
                        name="searchbar"
                    />
                    <Button className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default HeroSection