package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 DetailImage2 테이블에 대한 클래스.
 * <p> DetailImage2 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailImage2Dto {
    // 기본적인 정보
    private int contentid;          // 콘텐츠ID
    private String originimgurl;    // 원본이미지
    private String imgname;         // 이미지명
    private String smallimageurl;   // 썸네일이미지
    private String cpyrhtDivCd;     // 저작권유형
    private String serialnum;       // 이미지 일련번호
} // class end