package rootLab.model.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.PlaceImageDetailDto;
import rootLab.model.dto.PlaceInfoRepeatDto;
import rootLab.model.repository.CommonRepository;

import java.util.List;

/**
 * [ PlaceImageDetail ]
 * <p>
 * 플레이스 상세 이미지
 * @author OngTK
 */
@Mapper
public interface PlaceImageDetailMapper extends CommonRepository<PlaceImageDetailDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] pno 별 전체 조회
     */
    @Select("""
            select * from placeimagedetail where pNo = #{pNo};
            """)
    List<PlaceImageDetailDto> readAllToPno(int pno);
} // interface end
