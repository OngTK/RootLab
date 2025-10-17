package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rootLab.service.SyncService;

@RestController
@RequestMapping("/api/sync")
@RequiredArgsConstructor
public class SyncController {

    private final SyncService syncService;

    /**
     * [1] 카테고리 동기화 (lclsSystmCode2 -> categoryCode)
     * <p>
     * - 원본 DTO 없이, 정규화 DTO로 즉시 매핑
     * @author OngTK
     */
    @PostMapping("/category")
    public ResponseEntity<Integer> syncCategory() {
        System.out.println("SyncController.syncCategory");
        int inserted = syncService.syncCategoryCodes();
        return ResponseEntity.ok(inserted);
    }

    /**
     * [2] 법정동 동기화 (ldongCode2 -> ldongCode)
     * <p>
     * - 원본에는 위경도가 없어, 현재는 임시로 0.0 채움
     * <p>
     * - 추후 좌표 공급 전략 확정 시 교체 필요
     * @author OngTK
     */
    @PostMapping("/ldong")
    public ResponseEntity<Integer> syncLDong() {
        int inserted = syncService.syncLDongCodes();
        return ResponseEntity.ok(inserted);
    }

    /**
     * [3] Place정보 · 관광정보 동기화 ( areaBasedSyncList2 > placeInfo)
     * @author OngTK
     * */
    @PostMapping("/place")
    public ResponseEntity<Integer> syncPlace() {
        int inserted = syncService.syncPlaceInfo();
        return ResponseEntity.ok(inserted);
    } // func end

    /**
     * [4] 지도마커GPS 동기화 (placeInfo + areaBasedSyncList2 + detailCommon2 > markersGPS)
     * @return 삽입된 레코드 수
     * @author AhnJH
     */
    @PostMapping("/markersgps")
    public ResponseEntity<Integer> syncMarkersGPS(){
        int inserted = syncService.syncMarkersGPS();
        return ResponseEntity.ok(inserted);
    } // func end

    /**
     * [5] Place상세이미지 동기화 (placeInfo + detailImage2 > placeimagedetail)
     * @return 삽입된 레코드 수
     * @author AhnJH
     */
    @PostMapping("/placeimagedetail")
    public ResponseEntity<Integer> syncPlaceImageDetail(){
        int inserted = syncService.syncPlaceImageDetail();
        return ResponseEntity.ok(inserted);
    } // func end

    /** 기본 마스터 일괄 */
    @PostMapping("/base")
    public ResponseEntity<Integer> syncBase() {
        int inserted = syncService.syncBaseAndPlace();
        return ResponseEntity.ok(inserted);
    }
} // class end