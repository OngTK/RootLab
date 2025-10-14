package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 DetailIntro2_39 테이블에 대한 클래스.
 * <p> DetailIntro2_39 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailIntro2_39Dto {
    // 기본적인 정보
    private int contentid;              // 콘텐츠ID
    private int contenttypeid;          // 관광타입ID
    private String seat;                // 좌석수
    private String kidsfacility;        // 어린이놀이방 여부
    private String firstmenu;           // 대표메뉴
    private String treatmenu;           // 취급메뉴
    private String smoking;             // 금연/흡연 여부
    private String packing;             // 포장 가능여부
    private String infocenterfood;      // 문의 및 안내
    private String scalefood;           // 규모
    private String parkingfood;         // 주차시설
    private String opendatefood;        // 개업일
    private String opentimefood;        // 영업시간
    private String restdatefood;        // 쉬는날
    private String discountinfofood;    // 할인정보
    private String chkcreditcardfood;   // 신용카드 가능정보
    private String reservationfood;     // 예약 안내
    private String lcnsno;              // 인허가 번호
} // class end