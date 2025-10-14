package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 LdongCode2 테이블에 대한 클래스.
 * <p> LdongCode2 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LdongCode2Dto {
    // 기본적인 정보
    private int lDongRegnCd;        // 시도코드
    private String lDongRegnNm;     // 시도명
    private int lDongSignguCd;      // 시군구코드
    private int lDongSignguNm;      // 시군구명
    private int rnum;               // 일련번호
} // class end