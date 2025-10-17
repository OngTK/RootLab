package rootLab.model.criteria;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class SiteInfoCriteria {
    private Integer siIsPublic;     // 사이트 공개여부, null 여부 판단을 위해 int가 아닌 Integer
    private String siDomain;        // 도메인 URL
    private String siName;          // 사이트명
} // class end