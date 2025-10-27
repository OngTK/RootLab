import mapSlice from './mapSlice';
import { configureStore } from "@reduxjs/toolkit";

// 1. Store 만들기
const store = configureStore({
    reducer : {
        // 2. Slice 등록
        relatedMap : mapSlice
    }
});

// 3. export
export default store;