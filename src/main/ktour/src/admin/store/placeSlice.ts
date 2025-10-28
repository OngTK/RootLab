import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlaceDetail = createAsyncThunk(
  'place/fetchDetail',
  async (pno: number) => {
    const { data } = await axios.get(`http://localhost:8080/placeinfo/basic`, { params: { pno } });
    return data; // { placeInfo, MarkersGPSDto, PlaceImageDetail, TourIntro, RestaurantIntroDto, FestivalIntroDto, PlaceInfoDtoList }
  }
);

export const fetchPlaceList = createAsyncThunk(
  'place/fetchList',
  async (params: any) => {
    const { data } = await axios.get(`http://localhost:8080/placeinfo/searchPlaces`, { params });
    return { rows: data?.content ?? [], total: data?.totalElements ?? 0, raw: data };
  }
);

type PlaceState = {
  rows: any[];
  total: number;
  listRaw: any | null;

  detail: any | null;
  loading: boolean;
  error: string | null;

  // 상세 화면의 표시 타입(우선순위: 사용자 선택 > detail.placeInfo.ctNo > "1")
  contentType: string | null;
};

const initialState: PlaceState = {
  rows: [],
  total: 0,
  listRaw: null,

  detail: null,
  loading: false,
  error: null,

  contentType: null,
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setContentType: (s, a) => { s.contentType = (a.payload ?? null) && String(a.payload); },
    clearDetail: (s) => { s.detail = null; s.contentType = null; s.error = null; },
  },
  extraReducers: (b) => {
    b.addCase(fetchPlaceList.pending,  (s)=>{ s.loading = true; s.error = null; })
     .addCase(fetchPlaceList.fulfilled,(s,a)=>{ s.loading=false; s.rows=a.payload.rows; s.total=a.payload.total; s.listRaw=a.payload.raw; })
     .addCase(fetchPlaceList.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'list error'); });

    b.addCase(fetchPlaceDetail.pending,  (s)=>{ s.loading = true; s.error = null; })
     .addCase(fetchPlaceDetail.fulfilled,(s,a)=>{ s.loading=false; s.detail=a.payload; })
     .addCase(fetchPlaceDetail.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'detail error'); });
  }
});

export const { setContentType, clearDetail } = placeSlice.actions;
export default placeSlice.reducer;
