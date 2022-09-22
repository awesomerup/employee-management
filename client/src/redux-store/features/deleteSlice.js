import { createSlice } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
    name: 'update',
    initialState: [],
    reducers: {
        setEmp(state, actions) {
            return actions.payload
        },
        deleteEmp(state, actions) {
            return state.filter(item => item._id !== actions.payload)
        }

    }
})

export const { setEmp, deleteEmp } = deleteSlice.actions;
export default deleteSlice.reducer;