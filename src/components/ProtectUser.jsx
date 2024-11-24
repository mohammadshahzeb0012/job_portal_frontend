import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectUser = ({children}) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
      if (user === null || user.role !== 'student') {
          toast.info("Please login first!")
            navigate("/login");
        }
    }, []);


  return (
    <>
    {children}
    </>
  )
}

export default ProtectUser