package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import rootLab.model.criteria.SiteInfoCriteria;
import rootLab.model.dto.SiteInfoDto;

import java.util.List;

@Mapper
public interface SiteInfoMapper {
    /**
     * 검색기준을 통해 검색한 결과를 반환한다.
     * @param siteInfoCriteria 사이트정보 검색기준
     * @return 검색기준에 따른 검색결과
     */
    List<SiteInfoDto> searchSites(SiteInfoCriteria siteInfoCriteria);
} // interface end