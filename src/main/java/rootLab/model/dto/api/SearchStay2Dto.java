package rootLab.model.dto.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> Api_Origin DB의 SearchStay2 테이블에 대한 클래스.
 * <p> SearchStay2 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchStay2Dto {
    // 기본적인 정보
    addr1 VARCHAR(255),
    addr2 VARCHAR(255),
    areacode VARCHAR(255),
    sigungucode VARCHAR(255),
    cat1 VARCHAR(255),
    cat2 VARCHAR(255),
    cat3 VARCHAR(255),
    contentid VARCHAR(255),
    contenttypeid VARCHAR(255),
    createdtime VARCHAR(255),
    firstimage VARCHAR(255),
    firstimage2 VARCHAR(255),
    cpyrhtDivCd VARCHAR(255),
    mapx VARCHAR(255),
    mapy VARCHAR(255),
    mlevel VARCHAR(255),
    modifiedtime VARCHAR(255),
    tel VARCHAR(255),
    title VARCHAR(255),
    zipcode VARCHAR(255),
    lDongRegnCd VARCHAR(255),
    lDongSignguCd VARCHAR(255),
    lclsSystm1 VARCHAR(255),
    lclsSystm2 VARCHAR(255),
    lclsSystm3 VARCHAR(255)
} // class end