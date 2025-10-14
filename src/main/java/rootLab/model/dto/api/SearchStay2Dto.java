package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 SearchStay2 테이블에 대한 클래스.
 * <p> SearchStay2 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchStay2Dto {
    // 기본적인 정보
    private String addr1;           // 기본주소
    private String addr2;           // 상세주소
    private int areacode;           // 지역코드
    private int sigungucode;        // 시군구코드
    private String cat1;            // (구)대분류코드
    private String cat2;            // (구)중분류코드
    private String cat3;            // (구)소분류코드
    private int contentid;          // 콘텐츠ID
    private int contenttypeid;      // 관광타입ID
    private String createdtime;     // 등록일
    private String firstimage;      // 원본이미지(대표)
    private String firstimage2;     // 썸네일(대표)
    private String cpyrhtDivCd;     // 저작권 유형
    private double mapx;            // GPS X좌표
    private double mapy;            // GPS Y좌표
    private int mlevel;             // Map Level 응답
    private String modifiedtime;    // 수정일
    private String tel;             // 전화번호
    private String title;           // 제목
    private int zipcode;            // 우편번호
    private int lDongRegnCd;        // 시도코드
    private int lDongSignguCd;      // 시군구코드
    private String lclsSystm1;      // 대분류코드
    private String lclsSystm2;      // 중분류코드
    private String lclsSystm3;      // 소분류코드
} // class end