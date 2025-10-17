package rootLab.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rootLab.model.dto.CategoryCodeDto;
import rootLab.model.dto.LDongCodeDto;
import rootLab.model.dto.PlaceInfoDto;
import rootLab.model.mapper.SyncMapper;

import java.util.List;
/**
 * [SyncServcie · 동기화 Service]
 * <p>
 * API 원본 DB 테이블 에서 본사의 정규화 DB 테이블로 정보를 동기화하는 기능을 정의
 * @author OngTK
 * */
@Service
@RequiredArgsConstructor
public class SyncService {

    private final SyncMapper syncMapper;

    /**
     * [1] 카테고리 동기화 (lclsSystmCode2 -> categoryCode)
     * <p>
     * - 원본 DTO 없이, 정규화 DTO로 즉시 매핑
     * @author OngTK
     */
    @Transactional
    public int syncCategoryCodes() {
        List<CategoryCodeDto> items = syncMapper.selectCategoryCodesFromOrigin();
        if (items == null || items.isEmpty()) return 0;
        return syncMapper.insertCategoryCodeBatch(items);
    }

    /**
     * [2] 법정동 동기화 (ldongCode2 -> ldongCode)
     * <p>
     * - 원본에는 위경도가 없어, 현재는 임시로 0.0 채움
     * <p>
     * - 추후 좌표 공급 전략 확정 시 교체 필요
     * @author OngTK
     */
    @Transactional
    public int syncLDongCodes() {
        List<LDongCodeDto> items = syncMapper.selectLDongCodesFromOrigin();
        if (items == null || items.isEmpty()) return 0;
        return syncMapper.insertLDongCodeBatch(items);
    }

    /**
     * [3] Place정보 · 관광정보 동기화 (areaBasedSyncList2 > placeInfo)
     * @author OngTK
     * */
    @Transactional
    public int syncPlaceInfo() {
        return syncMapper.insertPlaceInfoCodeFromOrigin();
    } // func end

    /** 베이스 */
    @Transactional
    public int syncBaseAndPlace() {
        int total = 0;
        total += syncCategoryCodes();
        total += syncLDongCodes();
        total += syncPlaceInfo();
        return total;
    }

} // class end