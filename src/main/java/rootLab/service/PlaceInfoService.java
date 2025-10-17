package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.PlaceInfoDto;
import rootLab.model.mapper.PlaceInfoMapper;
import rootLab.model.repository.CommonRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaceInfoService extends AbstractService<PlaceInfoDto, Integer, PlaceInfoCriteria> {

    private final PlaceInfoMapper placeInfoMapper;

    /**
     * [0] AbstreactServie 추상메소드 구현
     * @return Mapper : 특별한 Service 로직이 없는 경우, 바로 Mapper 경로를 수행함
     */
    @Override
    protected CommonRepository<PlaceInfoDto, Integer, PlaceInfoCriteria> repo() {
        return placeInfoMapper;
    }

    /**
     * [PI-02] 플레이스 개별조회
     * @param pno
     * @return Map<String, Object> :
     * {"placeinfo" : {dto} },
     * {"detailInfo":{dto} },
     * {"placeInfoRepeat":{dto} },
     * {"markerGPS":{dto} },
     * {"placeImg":{dto} }
     * @author OngTK
     */
    public Map<String,Object> getPlace(int pno){

        // 기본정보 조회
        Optional<PlaceInfoDto> placeInfoDto = placeInfoMapper.read(pno);
        
        // 기본정보에서 컨텐츠 타입 조회
        placeInfoDto.get().getCtNo();
        // 컨턴츠타입에 맞는 디테일정보 조회
        
        // 반복정보 조회
        
        // 상세 이미지 정보 조회
        
        // 마커 정보 조회
        
        // Map 구성
        Map<String, Object> result = new HashMap<>();
        // 반환

        return result;
    } // func end



} // class end
