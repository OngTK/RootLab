package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ContentType
 * <p>
 * ContentTypeID 코드와 그에 해당하는 명칭 / 기본 마커를 관리
 * <p>
 * 12 : 관광지
 * <p>
 * 14 : 문화시설
 * <p>
 * 15 : 행사/공연/축제
 * <p>
 * 25 : 여행코스
 * <p>
 * 28 : 레포츠
 * <p>
 * 32 : 숙박
 * <p>
 * 38 : 쇼핑
 * <p>
 * 39 : 음식점
 * @author OngTK
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ContentTypeDto {

    private int ctNo;                   // 콘텐츠타입번호 (PK)
    private String contentTypeID;         // 콘텐츠타입
    private String contentTypeName;     // 타입명
    private String defaultMarker;       // 기본마커이미지
    private String createAt;       // 등록일
    private String updateAt;       // 수정일
    private String memo;                // 비고

} // class end
