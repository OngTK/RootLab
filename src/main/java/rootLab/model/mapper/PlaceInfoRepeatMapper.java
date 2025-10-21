package rootLab.model.mapper;

import org.apache.ibatis.annotations.*;
import rootLab.model.criteria.RoleCriteria;
import rootLab.model.dto.PlaceInfoRepeatDto;
import rootLab.model.repository.CommonRepository;

import java.util.List;

/**
 * PlaceInfoRepeat Place 반복정보
 * <p>
 * CotentTypeID : 12, 14, 15, 28, 38, 39
 * <p>
 * 25(여행코스),32(숙박)의 경우 반복정보를 사용하지 않음
 * <p>
 * CRUD를 위해 CommonRepository 를 extends
 * <p>
 * PlaceInfoRepeatDto : 반복정보 DTO
 * <p>
 * Integer : pirNo[PK]
 * <p>
 * RoleCriteria : 본 도메인에서는 검색 기능을 지원하지 않음으로 임의의 검색 객체를 삽입
 * @author OngTK
 */
@Mapper
public interface PlaceInfoRepeatMapper extends CommonRepository<PlaceInfoRepeatDto, Integer, RoleCriteria> {

    // todo OngTK 시리얼넘버 처리 관련 고려 필요
    
    // [1] 개별 등록
    @Insert("""
            insert into placeInfoRepeat( pNo, infoName , infoText, serialnum )
            values (#{pNo}, #{infoName}, #{infoText}, #{serialnum});
            """)
    @Override
    @Options(useGeneratedKeys = true, keyProperty = "pirNo")
    int create(PlaceInfoRepeatDto placeInfoRepeatDto);

    // [2] pno 별 전체 조회
    @Select("""
            select * from placeInfoRepeat where pNo = #{pNo};
            """)
    List<PlaceInfoRepeatDto> readAllToPno(int pno);

    // [3] 개별 수정
    @Update("""
            update placeinforepeat 
            set infoname = #{infoname}, infotext = #{infotext} 
            where pirNo = #{pirNo};
            """)
    @Override
    boolean update(PlaceInfoRepeatDto placeInfoRepeatDto);

    // [4] 개별 삭제
    // 레코드를 삭제할 경우
    @Override
    @Update("""
            UPDATE placeInfoRepeat
               SET infoname = NULL, infotext = NULL
             WHERE pirNo = #{pirNo};
            """)
    boolean delete(Integer integer);

} // class end

