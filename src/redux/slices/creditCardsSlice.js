import { createSlice } from "@reduxjs/toolkit"
import { loginThunk } from "../Thunks/loginThunk";
import { addDriverThunk } from "../Thunks/addDriverThunk";
import { InsertLink } from "@mui/icons-material";
import { getDriversCardsThunk } from "../Thunks/getDriversCardsThunk";
import { addCreditCardThunk } from "../Thunks/addCreditCardThunk";


const INITIAL_STATE_CARDS = {
   creditCards:[{
    code:0,
    creditCardNum:"",
    validityCard:"",
    cvv:"",
    id:""
   }]
}
export const CreditCardsSlice = createSlice({
    name: 'cards',
    initialState: INITIAL_STATE_CARDS,
    reducers: {
       
    },
    extraReducers: (builder) => {

        builder.addCase(getDriversCardsThunk.fulfilled, (state, action) => {
            // state.creditCards.map(c=>c.validityCard=new Date(c.validityCard))
             

            console.log(action.payload,"action.payload");
            state.creditCards=action.payload
         
        })
        builder.addCase(getDriversCardsThunk.rejected, (state, action) => {
            state.isNew = true;
            console.log("noooooooooo");
        })
        builder.addCase(addCreditCardThunk.fulfilled, (state, action) => {
           
            console.log("yessss");
        })
        builder.addCase(addCreditCardThunk.rejected, (state, action) => {
            console.log("noooooooooo");
        })
    }
})
export const {} = CreditCardsSlice.actions;