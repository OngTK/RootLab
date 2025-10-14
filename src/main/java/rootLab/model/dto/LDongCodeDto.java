package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> 본사 DB의 IdongCode 테이블에 대한 클래스.
 * <p> IdongCode 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LDongCodeDto {
    // 기본적인 정보
    private int IdNo;               // 법정동 코드번호
    private int rnum;               // 일련번호
    private int lDongRegnCd;        // 시도코드
    private String lDongRegnNm;     // 시도명
    private int lDongSignguCd;      // 시군구코드
    private String lDongSignguNm;   // 시군구명
    private boolean isActivate;     // 활성화여부
    private double latitude;        // 위도
    private double longitude;       // 경도
    private String createdAt;       // 등록일
    private String updatedAt;       // 수정일
} // class end