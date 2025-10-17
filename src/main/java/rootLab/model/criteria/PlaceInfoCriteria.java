package rootLab.model.criteria;

import rootLab.util.search.BaseCriteria;

/**
 * [ PlaceInfoCriteria - 플레이스 검색 조건 ]
 *  @author OngTK
 *  @since 2025.10.17
 */
public class PlaceInfoCriteria extends BaseCriteria {

    private int ctNo;               // 콘텐츠 타입번호
    private boolean isEditable;     // 수정가능여부
    private String ccName ;               // 분류체계번호
    private String ldName ;               // 법정동 코드번호
    private String address;         // 주소
    private String title;           // 콘텐츠명(제목)
    private int pNo;                // Place번호

} // func end
