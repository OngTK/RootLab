package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rootLab.service.MarkersGPSService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/markersgps")
@RequiredArgsConstructor
public class MarkersGPSController {
    private final MarkersGPSService markersGPSService;

    /**
     * 렌더링된 화면을 기준으로 동서남북 좌표를 받아와 해당 범위 내의 마커를 반환하는 메소드
     *
     * @param south 남쪽 좌표
     * @param north 북쪽 좌표
     * @param west  서쪽 좌표
     * @param east  동쪽 좌표
     * @return 해당 범위에 있는 마커 리스트
     * @author AhnJH
     */
    @GetMapping("/getbycurrentlatlng")
    public ResponseEntity<?> getMarkersGpsByCurrentLatLng(@RequestParam double south,
                                                          @RequestParam double north,
                                                          @RequestParam double west,
                                                          @RequestParam double east){
        System.out.println("south = " + south);
        System.out.print(", north = " + north);
        System.out.print(", west = " + west);
        System.out.print(", east = " + east);
        // 1. 동서남북 좌표를 담을 Map 선언
        Map<String, Object> coordinates = new HashMap<>();
        // 2. 선언한 Map에 좌표 담기
        coordinates.put("south", south);
        coordinates.put("north", north);
        coordinates.put("west", west);
        coordinates.put("east", east);
        // 3. 좌표를 Service에게 전달하여 값 반환하기
        return ResponseEntity.ok(markersGPSService.getMarkersGpsByCurrentLatLng(coordinates));
    } // func end

    @GetMapping("/getbycurrentldong")
    public ResponseEntity<?> getMarkersGpsByCurrentLDong(@RequestParam int lDongRegnCd,
                                                         @RequestParam int lDongSignguCd){
        System.out.println("lDongRegnCd = " + lDongRegnCd);
        System.out.print(", lDongSignguCd = " + lDongSignguCd);
        // 1. 코드를 담을 Map 선언
        Map<String, Object> lDongCode = new HashMap<>();
        // 2. 선언한 Map에 코드 담기
        lDongCode.put("lDongRegnCd", lDongRegnCd);
        lDongCode.put("lDongSignguCd", lDongSignguCd);
        // 3. 코드를 Service에게 전달하여 값 반환하기
        return ResponseEntity.ok(markersGPSService.getMarkersGpsByCurrentLDong(lDongCode));
    } // func end
} // class end