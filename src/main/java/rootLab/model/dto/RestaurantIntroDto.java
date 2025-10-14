package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * RestaurantIntro 음식점 소개정보
 * <p>
 * CotentTypeID : 39
 * @author OngTK
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RestaurantIntroDto {

    private int riNo;                   // 음식점 소개 번호 (PK)
    private int pNo;                    // place 번호  (FK)
    private String chkCreditCardFood;   // 신용카드 정보
    private String discountInfoFood;    // 할인정보
    private String firstMenu;           // 대표메뉴
    private String infoCenterFood;      // 문의 및 안내
    private int kidsFacility ;          // 어린이 놀이방 여부
    private String lcnsNo;              // 인허가 번호
    private String openDateFood;        // 개업일
    private String openTimeFood;        // 영업시간
    private String packing;             // 포장가능
    private String parkingFood;         // 주차시설
    private String reservationFood;     // 예약안내
    private String restDateFood;        // 쉬는 날
    private String scaleFood;           // 규모
    private String seat;                // 좌석수
    private String smoking;             // 금연/흡연여부
    private String treatMenu;           // 취급메뉴
    private String createdAt;           // 등록일
    private String updatedAt;           // 수정일

} // class end
