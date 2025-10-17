package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rootLab.service.SiteInfoService;

@RestController
@RequestMapping("/siteinfo")
@RequiredArgsConstructor
public class SiteInfoController {
    private final SiteInfoService siteInfoService;


} // class end