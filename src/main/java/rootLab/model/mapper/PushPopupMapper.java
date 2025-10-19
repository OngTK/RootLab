package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import rootLab.model.dto.PushPopupDto;

import java.util.List;

@Mapper
public interface PushPopupMapper {

    // 1. 검색
    List<PushPopupDto> searchPush(
            @Param("pNo") Integer pNo,
            @Param("ppType") String ppType,
            @Param("ppTitle") String ppTitleLike
    );

    // 2. 등록
    int insertPush(PushPopupDto dto);

    // 3. 삭제
    int deletePush(@Param("ppNo") int ppNo);

    // 4. 수정
    int updatePush(PushPopupDto dto);
}
