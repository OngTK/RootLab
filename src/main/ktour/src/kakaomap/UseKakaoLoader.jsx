import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function UseKakaoLoader() {
  useKakaoLoaderOrigin({

    appkey: "53b4906ec9f493e1dc366039f8462f0b",
    libraries: ["clusterer", "drawing", "services"],
  })
}