import axios from "axios";
import { create } from "zustand";

const readFoodList = create(set=>({
    loading: false,
    error: null,
    foodList: [],

    getFoodList : async()=>{
        set({loading: true});
        try {
            const response= await axios.get("http://localhost:3000/api/partner/readfood");
            const data=response.data.foodList;
        
            set({foodList: data});
        } catch (error) {
            set({error: "Error while fetching foodlist"});
            console.error("Error while fetching foodlist: ", error);
        }
        finally{
            set({loading: false});
        }
    }
}))

export default readFoodList