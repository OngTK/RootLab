package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.MarkersGPSDto;
import rootLab.model.mapper.MarkersGPSMapper;
import rootLab.model.repository.CommonRepository;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MarkersGPSService extends AbstractService<MarkersGPSDto, Integer, PlaceInfoCriteria>{

    private final MarkersGPSMapper markersGPSMapper;

    @Override
    protected CommonRepository<MarkersGPSDto, Integer, PlaceInfoCriteria> repo() {
        return markersGPSMapper;
    }

    /**
     * [MG-01] 렌더링 기준 마커조회
     * 렌더링된 화면 기준으로 [동서남북] 좌표를 받아, 해당 범위 내의 마커를 조회한다.
     *
     * @param coordinates 동서남북 좌표가 들어있는 Map
     * @return 해당 범위에 있는 마커 리스트
     * @author AhnJH
     */
    public List<Map<String, Object>> getMarkersGpsByCurrentLatLng(Map<String, Object> coordinates){
        return markersGPSMapper.getMarkersGpsByCurrentLatLng(coordinates);
    } // func end

    /**
     * [MG-02] 시군구 기준 마커조회
     * [법정동코드]를 입력받아, 해당하는 법정동코드No에 속하는 마커를 조회한다.
     *
     * @param ldNo 선택된 법정동코드
     * @return 해당 법정동코드No에 속한 마커 리스트
     * @author AhnJH
     */
    public List<MarkersGPSDto> getMarkersGpsByCurrentLDong(int ldNo){
        return markersGPSMapper.getMarkersGpsByCurrentLDong(ldNo);
    } // func end

} // class end