import { createSlice } from "@reduxjs/toolkit"
import { getAllParkingThunk } from "../Thunks/getParkingsThunk";
import { getCarExists } from "../Thunks/getCarExists";
import { paymentThunk } from "../Thunks/paymentThunk";



const INITIAL_STATE_PAYMENT = {
   shiluv:
    {
        blPayment: {
          creditCardCode: 0,
          sum: 0,
          date: Date.now()
        },
        blCreditCards: {
          creditCardNum: "",
          validityCard: "",
          id: "",
          cvv: "",
          driverCode: ""
        }
      
   }
}
export const PaymentSlice = createSlice({
    name: 'parking',
    initialState: INITIAL_STATE_PAYMENT,
    reducers: {
        
       
    },
    extraReducers: (builder) => {
        builder.addCase(paymentThunk.fulfilled, (state, action) => {
            console.log("yess",paymentThunk);

        })
        builder.addCase(paymentThunk.rejected, (state, action) => {
            console.log("noooooooooo",paymentThunk);
        })
       
    }
})
export const {  } = PaymentSlice.actions;