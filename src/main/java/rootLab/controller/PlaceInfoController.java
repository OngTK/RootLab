package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.service.PlaceInfoService;
import rootLab.util.pagenation.PageRequest;
import rootLab.util.pagenation.Sort;

import java.util.Map;

/**
 * PlaceInfo
 * <p>
 * 관공·축제 등 모든 장소 공통 정보
 */
@RestController
@RequestMapping("/placeinfo")
@RequiredArgsConstructor
public class PlaceInfoController {

    private final PlaceInfoService placeInfoService;

    /**
     * [PI-01] 플레이스 검색
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchPlaces(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) int ctNo,
            @RequestParam(required = false) boolean showflag,
            @RequestParam(required = false) String ccName,
            @RequestParam(required = false) String ldName,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) int pNo
    ) {
        // [1.1] 페이지 처리 요청을 위한 PageRequest 개체 생성
        // 참고 정렬을 위한 sort 개체 생성 과정 생략
        PageRequest pr = new PageRequest(page, size);

        // [1.2] 검색조건 Criteria 객체 생성

        // [1.3] service

        return ResponseEntity.ok(0);
    } // func end

    /**
     * [PI-02] 플레이스 개별조회
     *
     * @param pno
     * @return Map<String, Object> : [{"placeinfo" : {dto} }, {"detailInfo":{dto}},{"placeInfoRepeat":{dto}}]
     * @author OngTK
     */
    @GetMapping("/get")
    public ResponseEntity<?> getPlace(@RequestParam int pno) {

        Map<String, Object> result = placeInfoService.getPlace(pno);
        return ResponseEntity.ok(result);
    }


} // class end
