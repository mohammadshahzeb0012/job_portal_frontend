import { createSelector } from "reselect";

export const allJobsSelector = createSelector(
    [
        (state => state.filters.location),
        (state => state.filters.industry),
        (state => state.filters.salary),
        (state => state.filters.jobType),
        (state => state.jobs.allJobs),
    ],
    (location, industry, salary, jobType, allJobs) => {
        if (allJobs?.length > 0) {
            const filterdJobs = allJobs
                .filter((job) => {
                    if (location?.length === 0) return true
                    const locationString = location?.join("")
                    return locationString?.includes(job.location)
                })
                .filter((job) => {
                    if (industry?.length === 0) return true
                    const industryString = industry?.join("")
                    return industryString?.includes(job.title)
                })
                .filter((job) => {
                    if (jobType?.length === 0) return true
                    const jobTypeString = jobType?.join("")
                    return jobTypeString?.includes(job.jobType)
                })
            return filterdJobs
        }
        return []
    }
)