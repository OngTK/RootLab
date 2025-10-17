package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SyncMapper {

    // [1] 카테고리 동기화
    int insertCategoryCodeFromOrigin();

    // [2] 법정동 동기화
    int insertLDongCodeFromOrigin();

    // [3] Place정보·관광정보 동기화
    int insertPlaceInfoFromOrigin();

    // [4] 지도마커GPS 동기화
    int insertMarkersGPSFromOrigin();

    // [5] Place상세이미지 동기화
    int insertPlaceImageDetailFromOrigin();

} // interface end
