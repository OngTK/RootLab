import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios';

export const fetchPlaceDetail = createAsyncThunk(
  'place/fetchDetail',
  async (pno: number) => {
    const { data } = await api.get('/placeinfo/basic', { params: { pno } });
    return data;
  }
);

export const fetchPlaceList = createAsyncThunk(
  'place/fetchList',
  async (params: any | undefined, thunkAPI) => {
    const state: any = (thunkAPI.getState() as any)?.place || {};
    const query = params ?? { ...(state.filters || {}), page: state.page ?? 1, size: state.size ?? 10 };
    const { data } = await api.get('/placeinfo/search', { params: query });
    return {
      rows: data?.content ?? [],
      total: data?.totalElements ?? 0,
      raw: data,
      page: data?.currentPage ?? query.page,
      size: data?.size ?? query.size,
      filters: query,
    };
  }
);

export const saveBasic = createAsyncThunk(
  'place/saveBasic',
  async (fd: FormData, thunkAPI) => {
    await api.post('/placeinfo/basic', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    try {
      // @ts-ignore
      const pno = (thunkAPI.getState()?.place?.selectedPno) as number | null;
      if (pno) thunkAPI.dispatch(fetchPlaceDetail(Number(pno)));
    } catch {}
    return true;
  }
);

export const saveTourIntro = createAsyncThunk(
  'place/saveTourIntro',
  async (dto: any, thunkAPI) => {
    await api.post('/placeinfo/tourIntro', dto);
    try {
      const pno = Number(dto?.pNo ?? dto?.pno ?? 0);
      if (pno) thunkAPI.dispatch(fetchPlaceDetail(pno));
    } catch {}
    return true;
  }
);

export const saveFestivalIntro = createAsyncThunk(
  'place/saveFestivalIntro',
  async (dto: any, thunkAPI) => {
    await api.post('/placeinfo/festivalintro', dto);
    try {
      const pno = Number(dto?.pNo ?? dto?.pno ?? 0);
      if (pno) thunkAPI.dispatch(fetchPlaceDetail(pno));
    } catch {}
    return true;
  }
);

export const saveRestaurantIntro = createAsyncThunk(
  'place/saveRestaurantIntro',
  async (dto: any, thunkAPI) => {
    await api.post('/placeinfo/restaurant', dto);
    try {
      const pno = Number(dto?.pNo ?? dto?.pno ?? 0);
      if (pno) thunkAPI.dispatch(fetchPlaceDetail(pno));
    } catch {}
    return true;
  }
);

export const saveRepeatInfo = createAsyncThunk(
  'place/saveRepeatInfo',
  async (payload: { pNo: number, rows: any[] }, thunkAPI) => {
    await api.post('/placeinfo/repeatinfo', payload.rows);
    try {
      const pno = Number(payload?.pNo ?? 0);
      if (pno) thunkAPI.dispatch(fetchPlaceDetail(pno));
    } catch {}
    return true;
  }
);

type PlaceState = {
  rows: any[];
  total: number;
  listRaw: any | null;
  filters: any | null;
  page: number;
  size: number;

  detail: any | null;
  loading: boolean;
  error: string | null;

  contentType: string | null;
  selectedPno: number | null;
};

const initialState: PlaceState = {
  rows: [],
  total: 0,
  listRaw: null,
  filters: null,
  page: 1,
  size: 10,

  detail: null,
  loading: false,
  error: null,

  contentType: null,
  selectedPno: null,
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setContentType: (s, a) => { s.contentType = (a.payload ?? null) && String(a.payload); },
    clearDetail: (s) => { s.detail = null; s.contentType = null; s.error = null; },
    setListFilters: (s, a) => { s.filters = a.payload || null; },
    setPage: (s, a) => { s.page = Number(a.payload) || 1; },
    setSize: (s, a) => { s.size = Number(a.payload) || 10; },
  },
  extraReducers: (b) => {
    b.addCase(fetchPlaceList.pending,  (s)=>{ s.loading = true; s.error = null; })
     .addCase(fetchPlaceList.fulfilled,(s,a)=>{ s.loading=false; s.rows=a.payload.rows; s.total=a.payload.total; s.listRaw=a.payload.raw; s.page = a.payload.page; s.size = a.payload.size; s.filters = a.payload.filters; })
      .addCase(fetchPlaceList.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'list error'); });

    b.addCase(fetchPlaceDetail.pending,  (s,a)=>{ s.loading = true; s.error = null; s.selectedPno = Number((a as any).meta?.arg ?? 0) || null; })
     .addCase(fetchPlaceDetail.fulfilled,(s,a)=>{ s.loading=false; s.detail=a.payload; })
     .addCase(fetchPlaceDetail.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'detail error'); });

    b.addCase(saveBasic.pending, (s)=>{ s.loading=true; s.error=null; })
     .addCase(saveBasic.fulfilled,(s)=>{ s.loading=false; })
     .addCase(saveBasic.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'save basic error'); });

    b.addCase(saveTourIntro.pending, (s)=>{ s.loading=true; s.error=null; })
     .addCase(saveTourIntro.fulfilled,(s)=>{ s.loading=false; })
     .addCase(saveTourIntro.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'save tour error'); });

    b.addCase(saveFestivalIntro.pending, (s)=>{ s.loading=true; s.error=null; })
     .addCase(saveFestivalIntro.fulfilled,(s)=>{ s.loading=false; })
     .addCase(saveFestivalIntro.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'save festival error'); });

    b.addCase(saveRestaurantIntro.pending, (s)=>{ s.loading=true; s.error=null; })
     .addCase(saveRestaurantIntro.fulfilled,(s)=>{ s.loading=false; })
     .addCase(saveRestaurantIntro.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'save restaurant error'); });

    b.addCase(saveRepeatInfo.pending, (s)=>{ s.loading=true; s.error=null; })
     .addCase(saveRepeatInfo.fulfilled,(s)=>{ s.loading=false; })
     .addCase(saveRepeatInfo.rejected, (s,a)=>{ s.loading=false; s.error=String(a.error.message||'save repeat error'); });
  }
});

export const { setContentType, clearDetail, setListFilters, setPage, setSize } = placeSlice.actions;
export default placeSlice.reducer;

