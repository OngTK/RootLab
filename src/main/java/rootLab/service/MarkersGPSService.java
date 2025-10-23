package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.dto.MarkersGPSDto;
import rootLab.model.mapper.MarkersGPSMapper;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MarkersGPSService {
    private final MarkersGPSMapper markersGPSMapper;

    /**
     * [MG-01] 렌더링 기준 마커조회
     * 렌더링된 화면 기준으로 [동서남북] 좌표를 받아, 해당 범위 내의 마커를 조회한다.
     *
     * @param coordinates 동서남북 좌표가 들어있는 Map
     * @return 해당 범위에 있는 마커 리스트
     * @author AhnJH
     */
    public List<MarkersGPSDto> getMarkersGpsByCurrentLatLng(Map<String, Object> coordinates){
        System.out.println("coordinates = " + coordinates);
        return markersGPSMapper.getMarkersGpsByCurrentLatLng(coordinates);
    } // func end

    /**
     * [MG-02] 시군구 기준 마커조회
     * [시군코드, 시군구코드]를 입력받아, 해당하는 시군구에 속하는 마커를 조회한다.
     *
     * @param lDongCode 시도코드 + 시군구코드가 들어있는 Map
     * @return 해당 시군구에 속한 마커 리스트
     * @author AhnJH
     */
    public List<MarkersGPSDto> getMarkersGpsByCurrentLDong(Map<String, Object> lDongCode){
        System.out.println("lDongCode = " + lDongCode);
        return markersGPSMapper.getMarkersGpsByCurrentLDong(lDongCode);
    } // func end
} // class end