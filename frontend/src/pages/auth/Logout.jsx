import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async() =>{
        try 
        {
        await axios.get("http://localhost:3000/api/auth/logout", {withCredentials: true});
        navigate("/");
        } 
        catch (error) 
        {
            console.error("error logging out: ",error);
        }
    }
    logout();
    }, [])
    
  return (
        <div> Logging you out... </div>
  )
}

export default Logout