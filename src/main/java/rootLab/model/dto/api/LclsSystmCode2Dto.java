package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 LclsSystmCode2 테이블에 대한 클래스.
 * <p> LclsSystmCode2 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LclsSystmCode2Dto {
    // 기본적인 정보
    private int rnum;               // 일련번호
    private String lclsSystm1Cd;    // 대분류코드
    private String lclsSystm1Nm;    // 대분류명
    private String lclsSystm2Cd;    // 중분류코드
    private String lclsSystm2Nm;    // 중분류명
    private String lclsSystm3Cd;    // 소분류코드
    private String lclsSystm3Nm;    // 소분류명
} // class end