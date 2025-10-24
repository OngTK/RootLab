package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import rootLab.model.dto.MarkersGPSDto;
import rootLab.model.dto.PlaceImageDetailDto;
import rootLab.model.dto.PlaceInfoDto;
import rootLab.util.file.FileUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
/**
 * [ PlaceAggregate ]
 * PlaceInfo 처리에 대하여
 * 복합 DTO + 복합 파일 업로드에 따라서 이를 관리하기 위한 별도의 도메인
 * @author OngTK
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PlaceAggregateService {

    private final PlaceInfoService placeInfoService;
    private final MarkersGPSService markersGPSService;
    private final PlaceImageDetailService placeImageDetailService;
    private final FileUtil fileUtil;


    /**
     * [PI-03] 플레이스 기본정보 등록
     * 대표이미지 1 + 마커이미지 1 + 상세이미지(<=10) + 3 DTO를 한 번에 저장합니다.
     * 1) 파일 임시저장
     * 2) PlaceInfo upsert (pNo 확보)
     * 3) 대표/상세 첫 이미지 URL 반영
     * 4) Marker upsert
     * 5) 상세이미지 bulk insert (pNo별 serialnum = MAX+1 ~)
     * 6) (선택) 커밋 후 파일 승격
     */
    public boolean savePlaceBasicInfo(
            PlaceInfoDto placeInfo,
            MarkersGPSDto marker,
            List<PlaceImageDetailDto> imagesMeta,
            MultipartFile markerImage,
            MultipartFile mainImage,
            List<MultipartFile> detailImages
    ) {
        // ---- [0] 유효성 ----
        if (placeInfo == null) return false;
        if (detailImages != null && detailImages.size() > 10) return false;

        // ---- [1] 파일 임시저장 (기존 FileUtil 사용) ----
        // FileUtil은 "컬럼명/분류" 기반으로 하위폴더를 나누는 스타일이므로, 의미있는 이름을 넘겨줍니다.
        String tmpMarkerFile = uploadNullable(markerImage, "marker");
        String tmpMainFile   = uploadNullable(mainImage,   "firstImage");
        List<String> tmpDetailFiles = uploadAllNullable(detailImages, "originImgUrl");

        // ---- [2] 파일명을 placeInfo에 삽입
        placeInfo.setFirstimage(tmpMainFile);
        placeInfo.setFirstimage2(tmpDetailFiles.get(0));

        // ---- [3] PlaceInfo upsert → pNo 확보 ----
        Integer pNo = upsertPlaceInfoAndGetPno(placeInfo);

        // ---- [4] Marker upsert ----
        if (tmpMarkerFile != null) marker.setMkURL(tmpMarkerFile);
        marker.setPNo(pNo);
        markersGPSServiceUpsert(marker);

        // ---- [5] 상세이미지 Bulk Insert ----
        // imagesMeta가 null이면 파일명만 저장
        List<PlaceImageDetailDto> rows = buildImageRows(pNo, imagesMeta, tmpDetailFiles);
        if (!rows.isEmpty()) placeImageDetailServiceBulkInsert(rows);

        return true;
    }

    // ===== 내부 헬퍼 =====

    /**
     * 단일 파일 저장 처리
     * */
    private String uploadNullable(MultipartFile file, String columnName) {
        try {
            if (file == null || file.isEmpty()) return null;
            return fileUtil.uploadFile(file, columnName, String.valueOf(1)); // siNo 처리 로직 구상 필요
        } catch (Exception e) {
            return null;
        }
    }
    
    /**
     * 복수 파일 저장 처리 > 상기의 단일 파일 저장 처리를 활용
     */
    private List<String> uploadAllNullable(List<MultipartFile> files, String columnName) {
        List<String> out = new ArrayList<>();
        if (files == null) return out;
        for (MultipartFile f : files) {
            String name = uploadNullable(f, columnName);
            if (name != null) out.add(name);
        }
        return out;
    }

    /**
     * PlaceInfo 저장 처리
     */
    private Integer upsertPlaceInfoAndGetPno(PlaceInfoDto placeInfo) {
        // 기존 파일에 upsert가 없다면: pNo==0이면 insert, 아니면 update
        if (placeInfo.getPNo() == 0) {
            // insert → @Options(useGeneratedKeys=true)로 pNo 세팅되도록 구성되어 있어야 합니다.
            placeInfoService.create(placeInfo);
            return placeInfo.getPNo();
        } else {
            placeInfoService.update(placeInfo);
            return placeInfo.getPNo();
        }
    }

    /**
     * 마커정보 저장
     */
    private void markersGPSServiceUpsert(MarkersGPSDto marker) {
        if (marker.getMkNo() == 0) {
            markersGPSService.create(marker);
        } else {
            markersGPSService.update(marker);
        }
    }

    /**
     * 상세 이미지 DTO - LIST 생성
     * */
    private List<PlaceImageDetailDto> buildImageRows(Integer pNo, List<PlaceImageDetailDto> metas, List<String> files) {
        List<PlaceImageDetailDto> rows = new ArrayList<>();
        if (files == null || files.isEmpty()) return rows;

        // pNo별 serialnum을 DB에서 계산하도록 Service에서 Max 이후 +i로 부여해도 되고,
        // 여기서는 파일명/메타만 묶어서 넘깁니다.
        for (int i = 0; i < files.size(); i++) {
            PlaceImageDetailDto d = new PlaceImageDetailDto();
            d.setPNo(pNo);
            d.setEditable(true);
            d.setOriginimgurl(files.get(i));
            d.setSmallimageurl(files.get(i)); // 썸네일 별도면 여기 교체
            if (metas != null && i < metas.size()) {
                PlaceImageDetailDto m = metas.get(i);
                d.setImgname(Objects.requireNonNullElse(m.getImgname(), null));
            }
            rows.add(d);
        }
        return rows;
    }

    /**
     * 상세이미지 DB 저장
     */
    private void placeImageDetailServiceBulkInsert(List<PlaceImageDetailDto> rows) {
        placeImageDetailService.bulkInsertWithSerial(rows);
    }
    
} // class end
