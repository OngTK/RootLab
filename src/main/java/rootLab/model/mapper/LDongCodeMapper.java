package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import rootLab.model.dto.LDongCodeDto;

import java.util.List;

@Mapper
public interface LDongCodeMapper {

    /**
     * [LC-01] 시군구 전체조회
     * <p>
     * LDongCode 테이블의 모든 정보를 조회한다.
     *
     * @return LDongCode 테이블의 모든 정보
     * @author AhnJH
     */
    @Select("SELECT * FROM ldongcode")
    List<LDongCodeDto> getLDongCode();

    /**
     * [LC-02] 시군구 개별조회
     * <p>
     * [법정동코드No]를 입력받아, 해당하는 시군구 정보를 조회한다.
     *
     * @param ldNo 조회할 법정동코드No
     * @return 법정동코드No에 해당하는 시군구 정보
     * @author AhnJH
     */
    @Select("SELECT * FROM ldongcode WHERE ldNo = #{ldNo}")
    LDongCodeDto getLDongCodeByldNo(int ldNo);
} // interface end