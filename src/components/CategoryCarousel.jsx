import { Button } from "./ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import "./styles/index.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "@/redux/jobSlice"

const CategoryCarousel = () => {

    const { allJobs } = useSelector(store => store.jobs)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const newSet = new Set()
        if (allJobs && allJobs.length > 0) {
            allJobs.map((job) => {
                newSet.add(job.title)
            })
        }
        setCategories([...newSet])
    }, [allJobs])

    const handelClick = (qouery)=>{
        const searchQuary = qouery
        dispatch(setSearchedQuery(searchQuary))
        navigate("/browse")
    }


    return (
        <div className="CategoryCarousel">
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={() => handelClick(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}


export default CategoryCarousel