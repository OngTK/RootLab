package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rootLab.model.criteria.SiteInfoCriteria;
import rootLab.service.SiteInfoService;

@RestController
@RequestMapping("/siteinfo")
@RequiredArgsConstructor
public class SiteInfoController {
    private final SiteInfoService siteInfoService;

    /**
     * [(공개여부), (도메인), (사이트명)]을 입력받아, 해당하는 사이트정보들을 조회한다.
     *
     * @param siIsPublic 사이트 공개여부, null 여부 판단을 위해 Integer
     * @param siDomain 도메인 URL
     * @param siName 사이트명
     * @param page 조회할 페이지
     * @param pageSize 페이지당 개수
     * @return 검색결과
     * @author AhnJH
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchSites(@RequestParam(required = false) Integer siIsPublic,
                                         @RequestParam(required = false) String siDomain,
                                         @RequestParam(required = false) String siName,
                                         @RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "10") int pageSize){
        // 1. 입력받은 매개변수를 통해 검색기준 구성하기
        SiteInfoCriteria siteInfoCriteria = new SiteInfoCriteria();
        if (siIsPublic != null) siteInfoCriteria.setSiIsPublic(siIsPublic);
        if (siDomain != null) siteInfoCriteria.setSiDomain(siDomain);
        if (siName != null) siteInfoCriteria.setSiName(siName);
        siteInfoCriteria.setPage(page);
        siteInfoCriteria.setPageSize(pageSize);
        siteInfoCriteria.setStartRow((page - 1) * pageSize);
        // 2. Service로부터 결과를 받아 반환하기
        return ResponseEntity.ok(siteInfoService.searchSites(siteInfoCriteria));
    } // func end
} // class end