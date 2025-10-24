import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값 설정
const initialState = {
    selectedLdNo: null,
    selectedMarker: null,
    axiosOption: { withCredentials: true }
};

// 2. Slice 함수 정의
const mapSlice = createSlice({
    name: "relatedMap",
    initialState,
    reducers: {
        selectedSigngu: (state, action) => {
            state.selectedLdNo = action.payload;
        }, // selectedCity end
        selectMarker: (state, action) => {
            state.selectedMarker = action.payload;
        } // selectMarker
    } // reducers end
}); // createSlice end

// 3. export
export default mapSlice.reducer;
export const { selectedSigngu, selectMarker } = mapSlice.actions;