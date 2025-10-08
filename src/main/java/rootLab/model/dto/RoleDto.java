package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoleDto {

    // 멤버변수
    private int rtNo;               // 역할 템플릿 번호
    private String rtName;          // 역할 템플릿 명
    private String rtDescription;   // 역할 템플릿 설명
    private int rtStatus;           // 상태 : 0 - 비활성화 / 1 - 활성화
    private String createDate;      // 생성일
    private String updateDate;      // 수정일
    private String bnNo;            // 사업자등록번호 (FK-BusinessUser table)

} // class end
