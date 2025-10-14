package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 DetailCommon2 테이블에 대한 클래스.
 * <p> DetailCommon2 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailCommon2Dto {
    // 기본적인 정보
    private int contentid;          // 콘텐츠ID
    private int contenttypeid;      // 관광타입ID
    private String title;           // 제목
    private long createdtime;       // 등록일
    private long modifiedtime;      // 수정일
    private String tel;             // 전화번호
    private String telname;         // 전화번호명
    private String homepage;        // 홈페이지 주소
    private String firstimage;      // 대표이미지(원본)
    private String firstimage2;     // 대표이미지(썸네일)
    private String cpyrhtDivCd;     // 저작권 유형
    private int areacode;           // 지역코드
    private int sigungucode;        // 시군구코드
    private int lDongRegnCd;        // 시도코드
    private int lDongSignguCd;      // 시군구코드
    private String lclsSystm1;      // 대분류코드
    private String lclsSystm2;      // 중분류코드
    private String lclsSystm3;      // 소분류코드
    private String cat1;            // (구)대분류코드
    private String cat2;            // (구)중분류코드
    private String cat3;            // (구)소분류코드
    private String addr1;           // 기본주소
    private String addr2;           // 상세주소
    private String zipcode;         // 우편번호
    private double mapx;            // GPS X좌표
    private double mapy;            // GPS Y좌표
    private int mlevel;             // Map Level 응답
    private String overview;        // 개요
} // class end