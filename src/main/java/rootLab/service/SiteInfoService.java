package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.SiteInfoCriteria;
import rootLab.model.dto.SiteInfoDto;
import rootLab.model.mapper.SiteInfoMapper;
import rootLab.util.pagenation.Page;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SiteInfoService {
    private final SiteInfoMapper siteInfoMapper;

    /**
     * 검색 기준을 통해 검색한 결과를 반환한다.
     * @param siteInfoCriteria 사이트 정보에 대한 검색 기준
     * @return 페이징처리된 검색 결과
     * @author AhnJH
     */
    public Page<SiteInfoDto> searchSites(SiteInfoCriteria siteInfoCriteria){
        List<SiteInfoDto> searchedSites = siteInfoMapper.searchSites(siteInfoCriteria);
        return new Page<>(
                searchedSites,
                searchedSites.size(),
                siteInfoCriteria.getPage(),
                siteInfoCriteria.getPageSize()
        );
    } // func end
} // class end