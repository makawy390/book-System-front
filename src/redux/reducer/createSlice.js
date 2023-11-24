import { createSlice  } from "@reduxjs/toolkit";
const initialState = {
    login : '',
    check : false,
    token: '',
    id : ""
};
// export const fetchBought = createAsyncThunk('booksBought/fetchBought' , async ()=>{
//     const res = await fetch('https://codezone-books.onrender.com/api/bought/get_all_bought');
//     const data = await res.json();
//     return data;
// })

const dataSlice = createSlice({
    name: "login",
    initialState,
    reducers : {
        addData : (state , action) =>{
         state.login = action.payload;
        },
        addToken : (state , action) =>{
         state.token = action.payload;
        },
        addID : (state , action) =>{
         state.id = action.payload;
        },
        checkFunc : (state)=>{
            state.check = !state.check;

        }
    },

})

export const {addData , checkFunc , addToken , addID} = dataSlice.actions;
export default dataSlice.reducer;