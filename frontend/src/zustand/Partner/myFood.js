import axios from "axios";
import { create } from "zustand";

const myFood = create(set=>({
    loading: false,
    error: null,
    foods: [],

    getFoods : async()=>{
        set({loading: true});
        try {
            const response= await axios.get("http://localhost:3000/api/partner/myfood",
             {withCredentials: true});

            const data=response.data;
            set({foods: data});
        } catch (error) {
            set({error: "Error while fetching my food"});
            console.error("Error while fetching my food: ", error);
            
        }
        finally{
            set({loading: false});
        }
    }

}))

export default myFood 