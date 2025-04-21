import { createAsyncThunk } from "@reduxjs/toolkit";

export const paymentThunk = createAsyncThunk(
   
    // הפונקציה מקבלת את השם 
    'paymentThunk',
    // פונקציה להפעלה 
   
    async (blPayment , blCreditCards  , lisencePlate , numOfPayments) => {
        const shiluv = {
            blPayment:blPayment,
            blCreditCards:blCreditCards
        }
        const response = await fetch(`https://localhost:7164/api/Payment/AddPayment/${lisencePlate}/${numOfPayments}`, {
            method: 'POST',
            body: JSON.stringify(shiluv),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            
            console.log("came to thunk");
            const data = await response.json();
            console.log(data);
            return data;
        }
        else { 
            throw new Error('faild to fetch');
        }
    }
)