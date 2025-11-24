import axios from "axios";
import { create } from "zustand";

const myCart = create((set) => ({
  loading: false,
  error: null,
  cart: [],

  getCart: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/cart/read",
        { withCredentials: true }
      );
      const data = response.data;
      set({ cart: data.cart });
      return;
    } catch (err) {
      console.error("Error while fetching: ", err.message);
      
      
    } finally {
      set({ loading: false });
    }
  },

  updateQty: async(foodId, action) => {
   set((state)=>{
    
    const updatedFood = state.cart.food.map((item)=>{
        if (item.foodId._id !== foodId) {
          return item;
        }
        const newQty = action === 'increase' ? item.qty + 1  : Math.max(1, item.qty - 1);
        return ({...item, qty: newQty})
      })

    return {
      cart:{
        ...state.cart,
        food: updatedFood,
      }}
   });

   try {
    const response = await axios.patch("http://localhost:3000/api/user/cart/updateQty",
                     {foodId, action}, {withCredentials: true})
    const data = response.data;
    if(data.success){
      console.log("updated successfullyyy");
      
    }
                      
   } catch (error) {
    set({error: "Error while updating food quantity in backend"});
    console.error("Error while updating food quantity in backend: ", error);
   }
   

  }
}));

export default myCart;
