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
     * 렌더링된 화면을 기준으로 동서남북 좌표를 받아와 해당 범위 내의 마커를 반환하는 메소드
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
     * 선택한 시군구에 속하는 마커를 반환하는 메소드
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