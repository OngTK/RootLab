package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.PlaceInfoDto;
import rootLab.service.PlaceInfoService;
import rootLab.util.pagenation.Page;
import rootLab.util.pagenation.PageRequest;

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
     * @param page          조회하려는 현재 페이지
     * @param size          한 페이지 당 노출되는 콘텐츠 수
     * @param ctNo          콘텐츠번호 FK
     * @param showflag      노출여부
     * @param ccName        분류체계 번호 : 3단계 카테고리
     * @param ldName        법정동 명칭
     * @param address       주소
     * @param title         플레이스명
     * @param pNo           플레이스 번호
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchPlaces(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String ccName,
            @RequestParam(required = false) String ldName,

            @RequestParam(required = false) Integer ctNo,     // int -> Integer
            @RequestParam(required = false) Boolean showflag, // boolean -> Boolean
            @RequestParam(required = false) Integer pNo       // int -> Integer
    ) {
        System.out.println("page = " + page + ", size = " + size + ", ctNo = " + ctNo + ", showflag = " + showflag + ", ccName = " + ccName + ", ldName = " + ldName + ", address = " + address + ", title = " + title + ", pNo = " + pNo);

        // [1.1] 페이지 처리 요청을 위한 PageRequest 개체 생성
        // 참고 정렬을 위한 sort 개체 생성 과정 생략
        PageRequest pageRequest = new PageRequest(page, size);

        // [1.2] 검색조건 Criteria 객체 생성
        PlaceInfoCriteria placeInfoCriteria = PlaceInfoCriteria
                .builder()
                .ctNo(ctNo)
                .showflag(showflag)
                .ccName(ccName)
                .ldName(ldName)
                .address(address)
                .title(title).pNo(pNo).build();

        // 검색조건으 모두 null이면 false / 하나라도 존재하면 true
        boolean filter = (!showflag) &&
                (ccName == null || ccName.isEmpty()) &&
                (ldName == null || ldName.isEmpty()) &&
                (address == null || address.isEmpty()) &&
                (title == null || title.isEmpty()) ? false : true;

        // [1.3] service
        Page<PlaceInfoDto> result;
        if(filter){
            result = placeInfoService.searchPage(placeInfoCriteria, pageRequest);
        } else {
            result = placeInfoService.findPage(pageRequest);
        }

        return ResponseEntity.ok(result);
    } // func end

    /**
     * [PI-02] 플레이스 개별조회
     *
     * @param pno
     * @return Map<String, Object> : [{"placeinfo" : {dto} }, {"detailInfo":{dto}},{"placeInfoRepeat":{dto}}]
     * @author OngTK
     */
    @GetMapping("/basic")
    public ResponseEntity<?> getPlace(@RequestParam int pno) {

        Map<String, Object> result = placeInfoService.getPlace(pno);
        return ResponseEntity.ok(result);
    }


} // class end
