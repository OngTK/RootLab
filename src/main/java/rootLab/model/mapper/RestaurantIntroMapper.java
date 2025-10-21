package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.RestaurantIntroDto;
import rootLab.model.repository.CommonRepository;

import java.util.Optional;

/**
 * [ RestaurantIntroMapper ]
 * <p>
 * 음식점 상세정보 / ContentTypeID 39 / ctNo 8
 * @author OngTK
 */
@Mapper
public interface RestaurantIntroMapper extends CommonRepository<RestaurantIntroDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] pno별 음식점 정보 조회
     */
    @Select("""
            select * from RestaurantIntro where pno = #{pno};
            """)
    Optional<RestaurantIntroDto> read(Integer pno);

} // func end
