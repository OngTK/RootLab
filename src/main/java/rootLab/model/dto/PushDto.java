package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * PUSH 와 배너 정보
 * <p>
 * @author OngTK
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PushDto {

    private int pbNo;           // 푸쉬 NO (PK)
    private int pNo;            // place 번호  (FK)
    private int mgNo;           // 작성자-관리자no (FK)
    private String pbTitle;     // 제목
    private String pbContent;   // 내용
    private String pbImg;       // 이미지
    private String pbType;      // 구분
    private String createdAt;   // 작성일
    private String updateAt;   // 수정일
    private String pbStart;     // 노출 시작일
    private String pbEnd;       // 노출 종료일
    private String pbIterated;  // 푸시알람 시간

} // class end
