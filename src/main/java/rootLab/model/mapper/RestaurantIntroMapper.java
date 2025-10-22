package rootLab.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.RestaurantIntroDto;
import rootLab.model.repository.CommonRepository;

import java.util.Optional;

/**
 * [ RestaurantIntroMapper ]
 * <p>
 * 음식점 상세정보 / ContentTypeID 39 / ctNo 8
 *
 * @author OngTK
 */
@Mapper
public interface RestaurantIntroMapper extends CommonRepository<RestaurantIntroDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] pno별 음식점 정보 조회
     *
     * @author OngTK
     */
    @Override
    @Select("""
            select * from RestaurantIntro where pno = #{pno};
            """)
    Optional<RestaurantIntroDto> read(Integer pno);

    
    //TODO OngTK 음식점정보 SQL 작업 필요
    /**
     * [2] 음식점 정보 생성
     * @author OngTK
     */
    @Insert("""
            """)
    @Override
    int create(RestaurantIntroDto restaurantIntroDto);

    /**
     * [3] 음식점 정보 업데이트
     * @author OngTK
     */
    @Update("""
            """)
    @Override
    boolean update(RestaurantIntroDto restaurantIntroDto);

} // func end
