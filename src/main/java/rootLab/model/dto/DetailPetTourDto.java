package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> 본사 DB의 DetailPetTour 테이블에 대한 클래스.
 * <p> DetailPetTour 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailPetTourDto {
    // 기본적인 정보
    private int dptNo;                  // 반려동물 동반여행번호
    private int pNo;                    // Place번호
    private String relaAcdntRiskMtr;    // 관련사고 대비사항
    private String acmpyTypeCd;         // 동반유형코드
    private String relaPosesFclty;      // 관련 구비시설
    private String relaFrnshPrdlst;     // 관련 비치품목
    private String etcAcmpyInfo;        // 기타 동반정보
    private String relaPurcPrdlst;      // 관련 구매품목
    private String acmpyPsblCpam;       // 동반가능 동물
    private String relaRntlPrdlst;      // 관련 렌탈품목
    private String acmpyNeedMtr;        // 동반시 필요사항
    private String petTursmInfo;        // 반려동물 관광정보
    private String createdAt;           // 등록일
    private String updatedAt;           // 수정일
} // class end