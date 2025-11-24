import axios from "axios";
import { create } from "zustand";

const checkAuth = create(set=>({
    loading: false,
    user: null,
    error: null,

    getUser: async()=>{
        set({loading: true});
        try 
        {
            const response = await axios.get("http://localhost:3000/api/auth/loggedinuser",
                {withCredentials: true});
            const data=response.data;
            if (data.User === "Not logged in") {
                set({user: null});
            }
            else{
                set({user: data});
            }
            
            
            
        } 
        catch (error) 
        {
                set({error: "Error fetching the check auth data!!"});
                console.error(`Error fetching the check auth data: ${error}`);
            
        }
        finally
        {
            set({loading: false});
        }
    }
}))

export default checkAuth;