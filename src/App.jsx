import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/min/Companies'
import CompanyCreate from './components/min/CompanyCreate'
import CompanySetup from './components/min/CompanySetup'
import Applicants from './components/min/Applicants'
import AdminJobs from './components/min/Jobs'
import PostJob from './components/min/PostJob'
import NotFound from './components/NotFound'
import ProtectAdmin from './components/min/ProtectAdmin'
import ProtectUser from './components/ProtectUser'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AppliedJobs from './components/AppliedJobs'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/profile',
    element: <ProtectUser>  <Profile /></ProtectUser>
  },
  {
    path: "/user/applidedjobs",
    element: <ProtectUser><AppliedJobs /></ProtectUser>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: '/browse',
    element: <ProtectUser><Browse /></ProtectUser>
  },
  {
    path: "/jobs",
    element: <ProtectUser><Jobs /></ProtectUser>
  },
  {
    path: '/description/:id',
    element: <ProtectUser> <JobDescription /></ProtectUser>

  },
  //admin section
  {
    path: '/admin/companies',
    element: <ProtectAdmin><Companies /></ProtectAdmin>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectAdmin> <CompanyCreate /></ProtectAdmin>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectAdmin><CompanySetup /></ProtectAdmin>

  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectAdmin> <Applicants /></ProtectAdmin>

  },
  {
    path: '/admin/jobs',
    element: <ProtectAdmin>  <AdminJobs /></ProtectAdmin>
  },
  {
    path: '/admin/job/post',
    element: <ProtectAdmin>  <PostJob /></ProtectAdmin>
  },
  {
    path: "*",
    element: <NotFound />
  }
])


function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={appRouter} />
      </Provider>
    </>
  )
}

export default App