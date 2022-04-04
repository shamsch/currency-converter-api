import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    fromCurr: "Euro",
    toCurr: "Bangladeshi taka",
    amount: 0,
    convertedAmount: 0, 
    conversionFactor: 0
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        fixFromCurr(state,action){
            console.log("dispatched from reducer")
            const curr= action.payload
            return {...state, fromCurr:curr}
        },
        fixToCurr(state,action){
            console.log("dispatched from reducer")
            const curr= action.payload
            return {...state, toCurr:curr}
        },
        fixAmount(state,action){
            console.log("dispatched from reducer")
            const newAmount = action.payload
            state.amount= newAmount
        },
        fixConvertedAmount(state,action){
            console.log("dispatched from reducer")
            const newAmount = action.payload
            state.convertedAmount= newAmount
        },
        fixConversionFacotr(state,action){
            console.log("dispatched from reducer")
            const newAmount = action.payload
            state.conversionFactor= newAmount
        },
    }
})

export const {fixAmount,fixConversionFacotr,fixFromCurr,fixToCurr,fixConvertedAmount}= dataSlice.actions
export default dataSlice.reducer