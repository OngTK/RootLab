package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import rootLab.model.dto.CategoryCodeDto;
import rootLab.model.dto.LDongCodeDto;
import rootLab.model.dto.PlaceInfoDto;

import java.util.List;

@Mapper
public interface SyncMapper {

    // [1] 카테고리 동기화
    List<CategoryCodeDto> selectCategoryCodesFromOrigin();
    int insertCategoryCodeBatch(@Param("list") List<CategoryCodeDto> list);

    // [2] 법정동 동기화
    List<LDongCodeDto> selectLDongCodesFromOrigin();
    int insertLDongCodeBatch(@Param("list") List<LDongCodeDto> list);

    // [3] Place정보·관광정보 동기화
    int insertPlaceInfoCodeFromOrigin();

    // [4] 지도마커GPS 동기화
    int insertMarkersGPSCodeFromOrigin();

} // interface end
