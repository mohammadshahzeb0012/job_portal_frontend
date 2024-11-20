import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectUser = ({children}) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.role !== 'student') {
            navigate("/");
        }
    }, []);


  return (
    <>
    {children}
    </>
  )
}

export default ProtectUser