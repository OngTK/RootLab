package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p> 본사 DB의 PlaceImageDetail 테이블에 대한 클래스.
 * <p> PlaceImageDetail 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceImageDetailDto {
    // 기본적인 정보
    private int pidNo;                          // 상세이미지번호
    private int pNo;                            // Place번호
    private boolean isEditable;                 // 수정가능여부
    private String serialnum;                   // 이미지 일련번호
    private String originimgurl;                // 원본 이미지 경로
    private String smallimageurl;               // 썸네일 이미지 경로
    private String imgname;                     // 이미지명
    private String createdAt;                   // 등록일
    private String updatedAt;                   // 수정일
    // 부가적인 정보
    private MultipartFile uploadedOriginImage;  // 업로드된 원본 이미지
    private MultipartFile uploadedSmallImage;   // 업로드된 썸네일 이미지
} // class end