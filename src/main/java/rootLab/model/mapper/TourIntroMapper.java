package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.PlaceInfoDto;
import rootLab.model.dto.TourIntroDto;
import rootLab.model.repository.CommonRepository;

import java.util.Optional;

/**
 * [ TourIntroService ]
 * <p>
 * 관광지 상세정보 / ContentTypeID 12 / PK 1
 * @author OngTK
 */
@Mapper
public interface TourIntroMapper extends CommonRepository<TourIntroDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] pno별 개별 관광지 상세조회
     * @author OngTK
     */
    @Select("""
            select * from tourIntro where pno = #{pno};
            """)
    Optional<TourIntroDto> read(Integer pno);

} // Interface end
