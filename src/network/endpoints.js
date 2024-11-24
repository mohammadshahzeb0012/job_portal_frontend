
const bASE_URL = 'https://job-portal-backend-gwa2.onrender.com'
// const bASE_URL = 'http://localhost:8000'

const Endpoints = {
    register: `${bASE_URL}/api/v1/user/register`,
    login: `${bASE_URL}/api/v1/user/login`,
    logout: `${bASE_URL}/api/v1/user/logout`,
    user_api_end_point: `${bASE_URL}/api/v1/user/updateProfile`,
    user_profile_pic: `${bASE_URL}/api/v1/user/updateProfilepic`,
    user_profile_details: `${bASE_URL}/api/v1/user/profilesDetails`,
    get_all_jobs: `${bASE_URL}/api/v1/job/get`,
    get_highlights_jobs: `${bASE_URL}/api/v1/job/hightJobs`,
    get_single_job: `${bASE_URL}/api/v1/job/get`,
    apply_job: `${bASE_URL}/api/v1/application/apply`,
    register_new_company: `${bASE_URL}/api/v1/company/register`,
    company_ednpoint: `${bASE_URL}/api/v1/company`,
    get_admin_jobs: `${bASE_URL}/api/v1/job/getadminjobs`,
    save_for_later: `${bASE_URL}/api/v1/job/saveForLater`,
    get_saved_jobs: `${bASE_URL}/api/v1/job/getSavedJobs`,
    post_job: `${bASE_URL}/api/v1/job/post`,
    Applicants_end_point: `${bASE_URL}/api/v1/application`
}

export default Endpoints