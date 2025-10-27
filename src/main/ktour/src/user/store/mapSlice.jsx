import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값 설정
const initialState = {
    selectedLdNo: null,         // 선택한 법정동코드
    selectedLeftMarker: null,       // 클릭한 마커
    selectedRigthMarker: null,
    axiosOption: { withCredentials: true },
    markers: []
};

// 2. Slice 함수 정의
const mapSlice = createSlice({
    name: "relatedMap",
    initialState,
    reducers: {
        selectedSigngu: (state, action) => {
            state.selectedLdNo = action.payload;
        }, // selectedCity end
        selectLeftMarker: (state, action) => {
            state.selectedLeftMarker = action.payload;
        }, // selectLeftMarker end
        selectRigthMarker: (state, action) => {
            state.selectedRigthMarker = action.payload;
        }, // selectRigthMarker end
        renderedMarker: (state, action) => {
            state.markers = action.payload;
        }, // renderedMarker end
    } // reducers end
}); // createSlice end

// 3. export
export default mapSlice.reducer;
export const { selectedSigngu, selectLeftMarker, selectRigthMarker, renderedMarker } = mapSlice.actions;