import {createAction, createReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Feature {
    id: number
    name: string
}

const initialState: Feature[] = []

const featureSlice = createSlice({
    name: 'feature',
    initialState,
    reducers: {
        setFeatures(state, action: PayloadAction<Feature[]>) {
            state = action.payload
        }
    }
})

export const {setFeatures} = featureSlice.actions
export default featureSlice.reducer