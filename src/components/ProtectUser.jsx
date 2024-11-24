import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie"

const ProtectUser = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get("token"))
  const [user, setUser] = useState(Cookies.get("user_data"))
  useEffect(() => {
    if (!token) {
      toast.info("Please login first!")
      navigate("/login");
    }
    if (token && user) {
      const objuser = JSON.parse(user)
      if (objuser.role !== "student") {
        navigate("/login");
      }
    }

  }, [token,user]);


  return (
    <>
      {children}
    </>
  )
}

export default ProtectUser