package rootLab.model.criteria;

import lombok.Data;
import lombok.EqualsAndHashCode;
import rootLab.util.search.BaseCriteria;


/**
 * 역할(Role) 검색 조건
 * - null 또는 빈 문자열은 검색 조건에서 제외
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class RoleCriteria extends BaseCriteria {
    private String rtName;       // 역할명(부분검색)
    private Integer rtStatus;    // 활성화 여부, null 여부 판단을 위해 int가 아닌 Integer
    private String bnNo;         // 사업자등록번호 (소속)
}