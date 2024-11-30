import { Label } from '@radix-ui/react-label'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from './ui/checkbox'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { clearAllFilters, updateIndustryFilterArr, updateJobTypeFilterArr, updateLoctionFilterArr, updateSalaryFilterArr } from '@/redux/filterSlice'
import { toast } from 'react-toastify'


const FilterCard = () => {
    let { allJobs } = useSelector(store => store.jobs)
    const [fitlerData, setFilterdData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (allJobs && allJobs.length > 0) {
            const manipulatedData = [
                { fitlerType: "Location", array: new Set() },
                { fitlerType: "Industry", array: new Set() },
                { fitlerType: "Salary", array: new Set() },
                { fitlerType: "Job Type", array: new Set() }
            ]
            allJobs?.forEach((job) => {
                manipulatedData[0].array.add(job.location)
                manipulatedData[1].array.add(job.title)
                manipulatedData[3].array.add(job.jobType)
                if (job.salary <= 30000) {
                    manipulatedData[2].array.add("0-30K")
                }
                else if (job.salary <= 50000) {
                    manipulatedData[2].array.add("30K-50K")
                }
                else if (job.salary <= 70000) {
                    manipulatedData[2].array.add("50K-70K")
                }
                else if (job.salary <= 100000) {
                    manipulatedData[2].array.add("70k-1L")
                }

            })
            manipulatedData[0].array = Array.from(manipulatedData[0].array)
            manipulatedData[1].array = Array.from(manipulatedData[1].array)
            manipulatedData[2].array = Array.from(manipulatedData[2].array)
            manipulatedData[3].array = Array.from(manipulatedData[3].array)
            setFilterdData(manipulatedData)
        }
    }, [allJobs])

    const handelSelect = (isChecked, checkedValue, fitlerType) => {
        if (fitlerType === "Location") {
            dispatch(updateLoctionFilterArr({ checkedValue, isChecked }))
        } else if (fitlerType === "Industry") {
            dispatch(updateIndustryFilterArr({ checkedValue, isChecked }))
        } else if (fitlerType === "Salary") {
            dispatch(updateSalaryFilterArr({ checkedValue, isChecked }))
        } else {
            dispatch(updateJobTypeFilterArr({ checkedValue, isChecked }))
        }
    }

    const handelClearFilters = (e) => {
        e.preventDefault()
        e.target.reset()
        dispatch(clearAllFilters())
        toast.success("All Filter removed!")
    }

    return (
        <form onSubmit={handelClearFilters} className='fiter-card-wrraper w-full h-[100vh] overflow-y-scroll bg-yellow-50 p-3 rounded-md mt-0'>
            <h1 className='font-bold text-2xl'>Filters</h1>
            <hr className='mt-3' />
            {
                fitlerData?.map((data, index) => {
                    return <div key={index}>
                        <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div key={idx} className='flex items-center space-x-2 my-2'>
                                        <Checkbox onCheckedChange={(e) => handelSelect(e, item, data.fitlerType)} value={item} id={itemId} />
                                        <Label className='cursor-pointer hover:border-b-[1px] border-black' htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                })
            }
            <Button className="mt-1">Clear All</Button>
        </form>
    )
}

export default FilterCard