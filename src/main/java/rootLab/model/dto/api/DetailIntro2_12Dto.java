package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 DetailIntro2_12 테이블에 대한 클래스.
 * <p> DetailIntro2_12 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailIntro2_12Dto {
    // 기본적인 정보
    private int contentid;          // 콘텐츠ID
    private int contenttypeid;      // 관광타입ID
    private String heritage1;       // 세계문화유산 유무1
    private String heritage2;       // 세계문화유산 유무2
    private String heritage3;       // 세계문화유산 유무3
    private String infoCenter;      // 문의 및 안내
    private String openDate;        // 개장일
    private String restDate;        // 쉬는날
    private String expGuide;        // 체험안내
    private String expagerange;     // 체험가능연령
    private String accomcount;      // 수용인원
    private String useseason;       // 이용시기
    private String usetime;         // 이용시간
    private String parking;         // 주차시설
    private String chkbabycarriage; // 유모차 대여정보
    private String chkpet;          // 애완동물 동반 가능정보
    private String chkcreditcard;   // 신용카드 가능정보
} // class end