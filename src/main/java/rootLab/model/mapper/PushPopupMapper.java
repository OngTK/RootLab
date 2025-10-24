package rootLab.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import rootLab.model.dto.PushPopupDto;

import java.util.List;

@Mapper
public interface PushPopupMapper {

    /**
     * 1. 검색
     * @author juju95
     */
    List<PushPopupDto> searchPush(
            @Param("ppUse") String ppUse,
            @Param("ppType") String ppType,
            @Param("ppTitle") String ppTitle,
            @Param("status") String status // 진행전, 진행중, 진행완료
    );

    /**
     * 2. 등록
     * @author juju95
     */
    @Insert("""
    INSERT INTO pushPopup
    (pNo, mgNo, ppTitle, ppContent, ppImg, ppUse, ppType, ppStart, ppEnd, ppIterated)
    VALUES
    (#{pNo}, #{mgNo}, #{ppTitle}, #{ppContent}, #{ppImg},
    #{ppUse}, #{ppType}, #{ppStart}, #{ppEnd}, #{ppIterated})
    """)
    @Options(useGeneratedKeys = true, keyProperty = "ppNo") // AUTO_INCREMENT ppNo 주입
    int addPush(PushPopupDto pushPopupDto);

    /**
     * 3. 삭제
     * @author juju95
     */
    int deletePush (@Param("ppNo") int ppNo);

    /**
     * 4. 수정
     * @author juju95
     */
    int updatePush(PushPopupDto dto);
}
