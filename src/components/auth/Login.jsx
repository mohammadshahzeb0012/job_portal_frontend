import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Endpoints from "@/network/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";



const Login = () => {
 
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [cookieUser, setCookieUSer] = useState(Cookies.get("token"))
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(cookieUser){
      navigate("/")
    }
   },[cookieUser])

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${Endpoints.login}`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        Cookies.set('user_data',JSON.stringify(res.data.user))
        navigate("/")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Someting went wrong")

    } finally {
      dispatch(setLoading(false));
    }
  }


  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-[90%] sm:w-[80%] md:w-1/2  border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="email@example.com"
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="password"
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup defaultValue="option-one" className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">recruiter</Label>

              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button disabled={loading} className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
              : <Button type="submit" className="w-full my-4">login</Button>

          }
          <span className='text-sm'>Dont't have an account? <Link to="/signup" className='text-blue-600'>signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login