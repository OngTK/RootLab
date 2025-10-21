package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.MarkersGPSDto;
import rootLab.model.repository.CommonRepository;

import java.util.Optional;

/**
 * [ MarkersGPS ]
 * <p>
 * 마커GPS 위도, 경도, 마커이미지를 관리
 * @author OngTK
 */
@Mapper
public interface MarkersGPSMapper extends CommonRepository<MarkersGPSDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] pno 별 개별 조회
     */
    @Select("""
            select * from markersgps where pno = #{pno};
            """)
    @Override
    Optional<MarkersGPSDto> read(Integer pno);

} // interface end
