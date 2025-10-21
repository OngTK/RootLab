package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.FestivalIntroDto;
import rootLab.model.dto.TourIntroDto;
import rootLab.model.repository.CommonRepository;

import java.util.Optional;

/**
 * [ FestivalIntroService ]
 * <p>
 * 축제 상세정보 / ContentTypeID 15 / PK 3
 * @author OngTK
 */
@Mapper
public interface FestivalIntroMapper extends CommonRepository<FestivalIntroDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] pno별 개별 관광지 상세조회
     * @author OngTK
     */
    @Select("""
            select * from festivalintro where pno = #{pno};
            """)
    Optional<FestivalIntroDto> read(Integer pno);

} // Interface end
