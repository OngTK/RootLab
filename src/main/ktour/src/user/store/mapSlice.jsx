import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값 설정
const initialState = {
    selectedLdNo: null,                 // 선택한 법정동코드
    selectedLeftMarker: null,           // 클릭한 마커
    selectedRigthMarker: null,
    markers: [],
    selectedCategory: "all",            // 선택한 카테고리
    centeredLDong: null,                // 중심좌표 기준 법정동
    firstLDong: null,                   // 최초 렌더링된 법정동
    selectedLDong: null,
    axiosOption: { withCredentials: true },
    LdongName: [],
    activeLnbMenu: 'mySurroundings',    // 활성화된 Lnb 메뉴
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
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }, // selectCategory end
        centerLDong: (state, action) => {
            state.centeredLDong = action.payload;
        }, // centerLDong end
        ByLdongCode: (state, action) => {
            state.LdongName = action.payload;
        }, // ByLdongCode end
        firstLDongRegn: (state, action) => {
            state.firstLDong = action.payload;
        }, // firstLDongRegn end
        selectLDong: (state, action) => {
            state.selectedLDong = action.payload;
        }, // selectLDong end
        setActiveLnbMenu: (state, action) => {
            state.activeLnbMenu = action.payload;
        }, // setActiveLnbMenu end
    } // reducers end
}); // createSlice end

// 3. export
export default mapSlice.reducer;
export const { setActiveLnbMenu, selectLDong, firstLDongRegn, ByLdongCode, selectedSigngu, selectLeftMarker, selectRigthMarker, renderedMarker, selectCategory, centerLDong } = mapSlice.actions;