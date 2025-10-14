package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TourIntro 관광지 소개정보
 * <p>
 * CotentTypeID : 12
 * @author OngTK
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TourIntroDto {

    private int tNo;                // 관광지 소개번호 (PK)
    private int pNo;                // place 번호 (FK)
    private String accomcount;      // 수용인원
    private String chkBabyCarriage; // 유모차 대여 정보
    private String chkCreditCard;   // 신용카드 가능정보
    private String chkPet;          // 애완동물 동반 가능 정보
    private String expAgeRange;     // 체험가능연령
    private String expGuide;        // 체험안내
    private String heritage1;       // 세계문화유산 유무1
    private String heritage2;       // 세계문화유산 유무2
    private String heritage3;       // 세계문화유산 유무3
    private String infoCenter;      // 문의 및 안내
    private String openDate;        // 개장일
    private String parking;         // 주차시설
    private String restDate;        // 쉬는날
    private String useSeason;       // 이용시기
    private String useTime;         // 이용시간
    private String createdAt;       // 등록일
    private String updatedAt;       // 수정일
    
} // class end
