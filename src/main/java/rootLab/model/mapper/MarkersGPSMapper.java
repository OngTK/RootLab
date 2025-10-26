package rootLab.model.mapper;

import org.apache.ibatis.annotations.*;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.MarkersGPSDto;
import rootLab.model.repository.CommonRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * [ MarkersGPS ]
 * <p>
 * 마커GPS 위도, 경도, 마커이미지를 관리
 * @author OngTK
 */
@Mapper
public interface MarkersGPSMapper extends CommonRepository<MarkersGPSDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] pno 별 개별 조회
     */
    @Select("""
            select * from markersgps where pno = #{pno};
            """)
    @Override
    Optional<MarkersGPSDto> read(Integer pno);

    /**
     * [MG-01] 렌더링 기준 마커조회
     * 렌더링된 화면 기준으로 [동서남북] 좌표를 받아, 해당 범위 내의 마커를 조회한다.
     *
     * @param coordinates 동서남북 좌표가 들어있는 Map
     * @return 해당 범위에 있는 마커 리스트
     * @author AhnJH
     */
    @Select("SELECT kpi.pNo, kcc.lclsSystm1Nm, kcc.lclsSystm2Nm, kcc.lclsSystm3Nm, kpi.title, kct.defaultMarker, kmg.mkURL, kmg.mapx, kmg.mapy, kpi.title, kpi.addr1, kpi.addr2, kpi.firstimage, kct.contenttypename " +
            "FROM k_tour_headquarter.placeinfo kpi " +
            "JOIN k_tour_headquarter.contenttype kct " +
            "USING (ctNo) " +
            "JOIN k_tour_headquarter.markersgps kmg " +
            "USING (pNo) " +
            "JOIN k_tour_headquarter.categorycode kcc " +
            "USING (ccNo) " +
            "WHERE kmg.mapx >= #{west} " +
            "AND kmg.mapx <= #{east} " +
            "AND kmg.mapy >= #{south} " +
            "AND kmg.mapy <= #{north}")
    List<Map<String, Object>> getMarkersGpsByCurrentLatLng(Map<String, Object> coordinates);

    /**
     * [MG-02] 시군구 기준 마커조회
     * [법정동코드]를 입력받아, 해당하는 법정동코드No에 속하는 마커를 조회한다.
     *
     * @param ldNo 선택된 법정동코드
     * @return 해당 법정동코드No에 속한 마커 리스트
     * @author AhnJH
     */
    @Select("SELECT kpi.pNo, kmg.mapx, kmg.mapy, kmg.mkURL " +
            "FROM k_tour_headquarter.placeinfo kpi " +
            "JOIN k_tour_headquarter.ldongcode klc " +
            "USING (ldNo) " +
            "JOIN k_tour_headquarter.markersgps kmg " +
            "USING (pNo) " +
            "WHERE klc.ldNo = #{ldNo}")
    List<MarkersGPSDto> getMarkersGpsByCurrentLDong(int ldNo);


    /**
     * 신규 마커정보 저장
     */
    @Insert("""
        INSERT INTO markersGPS (pNo, mkURL, mapx, mapy)
        VALUES (#{pNo}, #{mkURL}, #{mapx}, #{mapy})
    """)
    @Options(useGeneratedKeys = true, keyProperty = "mkNo")
    int insert(MarkersGPSDto dto);

    /**
     * 마커정보 수정
     */
    @Update("""
        UPDATE markersGPS
           SET mkURL = #{mkURL},
               mapx  = #{mapx},
               mapy  = #{mapy},
         WHERE mkNo = #{mkNo}
    """)
    boolean update(MarkersGPSDto dto);

} // interface end
