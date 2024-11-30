import { createSlice } from "@reduxjs/toolkit"

const filterType = Object.freeze({
    location: "location",
    industry: "Industry",
    salary: "SalaryRange",
    jobType: "jobType"
})

const initialState = {
    [filterType.location]: [],
    [filterType.industry]: [],
    [filterType.salary]: [],
    [filterType.jobType]: [],
}

const filterSlice = createSlice({
    name: "filterSlice",
    initialState,
    reducers: {
        updateLoctionFilterArr: (state, action) => {
            if (action.payload.isChecked) {
                state[filterType.location].push(action.payload.checkedValue)
            } else {
                state[filterType.location] = state.location.filter(item => item !== action.payload.checkedValue)
            }
        },
        updateIndustryFilterArr: (state, action) => {
            // console.log(action.payload.checkedValue)
            if (action.payload.isChecked) {
                state.industry.push(action.payload.checkedValue)
            } else {
                state.industry = state.industry.filter(item => item !== action.payload.checkedValue)

            }
        },
        updateSalaryFilterArr: (state, action) => {
            if (action.payload.isChecked) {
                state[filterType.salary].push(action.payload.checkedValue)
            } else {
                state[filterType.salary] = state.salary.filter(item => item !== action.payload.checkedValue)
            }
        },
        updateJobTypeFilterArr: (state, action) => {
            if (action.payload.isChecked) {
                state[filterType.jobType].push(action.payload.checkedValue)
            } else {
                state[filterType.jobType] = state.jobType.filter(item => item !== action.payload.checkedValue)
            }
        },
        clearAllFilters: (state) => {
            state.location = []
            state.industry = []
            state.salary = []
            state.jobType = []
        }
    }
})


export const { updateLoctionFilterArr, updateIndustryFilterArr,
    updateSalaryFilterArr, updateJobTypeFilterArr, clearAllFilters
} = filterSlice.actions

export default filterSlice