package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * PlaceInfoRepeat Place 반복정보
 * <p>
 * CotentTypeID : 12, 14, 15, 28, 38, 39
 * 25,32의 경우 이 DTO를 사용하지 않음
 * @author OngTK
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PlaceInfoRepeatDto {

    private int pirNo;          // place 반복 번호 (PK)
    private int pNo;            // place 번호  (FK)
    private int fldgubun;       // 구분일련번호
    private String infoName;    // 제목
    private String infoText;    // 내용
    private int serialNum;      // 반복일련번호
    private String createdAt;   // 등록일
    private String updatedAt;   // 수정일

} // class end
