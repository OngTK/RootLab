package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> 본사 DB의 PlaceInfo 테이블에 대한 클래스.
 * <p> PlaceInfo 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceInfoDto {
    // 기본적인 정보
    private int pNo;                // Place번호
    private int ctNo;               // 콘텐츠 타입번호
    private int ldNo;               // 법정동 코드번호
    private int ccNo;               // 분류체계번호
    private boolean isEditable;     // 수정가능여부
    private int contentid;          // 콘텐츠 ID
    private String title;           // 플레이스명 (제목)
    private int showflag;           // 콘텐츠 표출여부
    private String firstimage;      // 원본이미지(대표)
    private String firstimage2;     // 썸네일(대표)
    private String addr1;           // 기본주소
    private String addr2;           // 상세주소
    private String zipcode;         // 우편번호
    private String homepage;        // 홈페이지링크
    private String tel;             // 전화
    private String telname;         // 전화번호명
    private String overview;        // 개요
    private String createdAt;       // 수정일
    private String updatedAt;       // 등록일
} // class end