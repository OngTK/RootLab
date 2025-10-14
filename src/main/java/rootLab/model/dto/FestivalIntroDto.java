package rootLab.model.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * festivalIntro 축제 소개정보
 * <p>
 * CotentTypeID : 15
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FestivalIntroDto {

    private int fiNo;                       // 축제 행사 번호 (PK)
    private int pNo;                        // place 번호  (FK)
    private String eventStartDate;          // 행사시작일
    private String eventEndDate;            // 행사 종료일
    private String progressType;            // 진행 상태 정보
    private String festivalType;            // 축제유형별
    private String ageLimit;                // 관람가능연령
    private String bookingPlace;            // 예매처
    private String discountInfoFestival;    // 할인정보
    private String eventHomepage;           // 홈페이지정보
    private String eventPlace;              // 행사장소
    private String festivalGrade;           // 축제 등급
    private String placeInfo;               // 행사장 위치 안내
    private String playTime;                // 공연시간
    private String program;                 // 행사 프로그램
    private String spendTimeFestival;       // 관람 소요시간
    private String sponsor1;                // 주최자정보
    private String sponsor1Tel;             // 주최자연락처
    private String sponsor2;                // 주관사정보
    private String sponsor2Tel;             // 주관사연락처
    private String subEvent;                // 부대행사
    private String useTimeFestival;         // 이용요금
    private String createdAt;               // 등록일
    private String updatedAt;               // 수정일

} // class end
