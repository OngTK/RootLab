package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 DetailInfo2_12 테이블에 대한 클래스.
 * <p> DetailInfo2_12 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailInfo2_12Dto {
    // 기본적인 정보
    private int contentid;      // 콘텐츠ID
    private int contenttypeid;  // 관광타입ID
    private int serialnum;      // 반복일련번호
    private String infoname;    // 제목
    private String infoTEXT;    // 내용
    private int fldgubun;       // 일련번호
} // class end