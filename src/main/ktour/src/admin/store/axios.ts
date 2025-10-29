import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta as any)?.env?.VITE_API_BASE_URL || 'http://localhost:8080',
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  // 공통 헤더 설정 등 필요 시 확장
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // 공통 에러 로깅/메시지 변환 지점
    // console.error('[API ERROR]', error?.response?.status, error?.message);
    return Promise.reject(error);
  }
);

export default api;

