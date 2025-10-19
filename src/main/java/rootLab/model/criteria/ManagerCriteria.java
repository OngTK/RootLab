package rootLab.model.criteria;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ManagerCriteria {
    private Integer mgAuth;         // 관리자유형 (1:시스템관리자, 2:지자체관리자)
    private String mName;           // 회원명
    private String mId;             // 관리자ID
    private String mPhone;          // 휴대전화
    private int page;               // 조회할 페이지
    private int pageSize;           // 페이지당 개수
    private int startRow;           // 시작할 게시물
} // class end