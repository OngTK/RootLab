package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import rootLab.model.criteria.SiteInfoCriteria;
import rootLab.model.dto.SiteInfoDto;

import java.util.List;

@Mapper
public interface SiteInfoMapper {
    /**
     *
     * @param siteInfoCriteria 사이트정보 검색기준
     * @return
     */
    List<SiteInfoDto> searchSites(SiteInfoCriteria siteInfoCriteria);
} // interface end