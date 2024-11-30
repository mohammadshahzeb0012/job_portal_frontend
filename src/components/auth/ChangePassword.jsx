import { useState } from "react"
import Footer from "../shared/Footer"
import Navbar from "../shared/Navbar"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Endpoints from "@/network/endpoints"

const ChangePassword = () => {
  const { sendData } = useParams()
  const [loading, setLoading] = useState(false)

  const submitHanler = async (e) => {
    e.preventDefault()
    const password = e.target.password.value
    const confermPassword = e.target.confermPassword.value

    if (password !== confermPassword) {
      toast.error("Both password shoud be same!")
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${Endpoints.change_password}`, {
        password,
        token: sendData
      })
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  return <div>
    <Navbar />
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form onSubmit={submitHanler} className='w-[90%] sm:w-[80%] md:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className='font-bold text-xl mb-5'>Chnage Password</h1>
        <div className='my-2'>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="* * * * * * * *"
            required
          />
        </div>
        <div className='my-2'>
          <Label>Conferm Password</Label>
          <Input
            type="password"
            name="confermPassword"
            placeholder="* * * * * * * *"
            required
          />
        </div>
        {
          loading ? <Button disabled={loading} className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
          : <Button type="submit" className="w-full my-4">Change Password</Button>
        }
        <p>Link expired? <Link to={'/user/forgotpassword'} className="text-blue-800 hover:text-blue-900 hover:border-b-[1px] hover:border-blue-900">Send again</Link></p>
      </form>
    </div>
    <Footer />
  </div>
}

export default ChangePassword
