package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.*;
import rootLab.model.mapper.*;
import rootLab.model.repository.CommonRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaceInfoService extends AbstractService<PlaceInfoDto, Integer, PlaceInfoCriteria> {

    private final PlaceInfoMapper placeInfoMapper;
    private final TourIntroMapper tourIntroMapper;
    private final FestivalIntroMapper festivalIntroMapper;
    private final RestaurantIntroMapper restaurantIntroMapper;
    private final PlaceInfoRepeatMapper placeInfoRepeatMapper;

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

        // return할 Map 구성
        Map<String, Object> result = new HashMap<>();

        // 기본정보 조회
        Optional<PlaceInfoDto> placeInfoDto = placeInfoMapper.read(pno);
        result.put("palceInfo",placeInfoDto);

        // 기본정보에서 컨텐츠 타입 조회
        int ctNo = placeInfoDto.get().getCtNo();

        // 컨턴츠타입에 맞는 디테일정보 조회
        if(ctNo == 1){
            // 관광지 ctNo 1 / contentTypeID 12  // testPno 6881
            Optional<TourIntroDto> tourIntroDto = tourIntroMapper.read(pno);
            result.put("TourIntro",tourIntroDto);
        } else if (ctNo == 3){
            // 행사/공연/축제 ctNo 3 / contentTypeID 15 //testPno 23405
            Optional<FestivalIntroDto> festivalIntroDto = festivalIntroMapper.read(pno);
            result.put("FestivalIntro",festivalIntroDto);
        } else if (ctNo == 8 ){
            //음식점 ctNo 8 / contentTypeID 39 // testPno 51385
            Optional<RestaurantIntroDto> restaurantIntroDto = restaurantIntroMapper.read(pno);
            result.put("RestaurantIntro",restaurantIntroDto);
        } // if end

        // 반복정보 조회
        List<PlaceInfoRepeatDto> placeInfoDtoList = placeInfoRepeatMapper.readAllToPno(pno);
        result.put("PlaceInfoDtoList",placeInfoDtoList);
        // 상세 이미지 정보 조회


        
        // 마커 정보 조회

        // 반환

        return result;
    } // func end



} // class end
