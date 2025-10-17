package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rootLab.service.PlaceInfoService;

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
     * [PI-02] 플레이스 개별조회
     * @param pno
     * @return Map<String, Object> : [{"placeinfo" : {dto} }, {"detailInfo":{dto}},{"placeInfoRepeat":{dto}}]
     * @author OngTK
     */
    @GetMapping
    public ResponseEntity<?> getPlace(int pno){

        Map<String, Object> reuslt = placeInfoService.getPlace(pno);

        return ResponseEntity.ok(0);
    }


} // class end
