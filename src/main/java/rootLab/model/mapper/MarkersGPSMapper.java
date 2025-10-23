package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
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
     * 렌더링된 화면을 기준으로 동서남북 좌표를 받아와 해당 범위 내의 마커를 반환하는 메소드
     *
     * @param coordinates 동서남북 좌표가 들어있는 Map
     * @return 해당 범위에 있는 마커 리스트
     * @author AhnJH
     */
    @Select("SELECT kpi.pNo, kct.defaultMarker, kmg.mkURL, kmg.mapx, kmg.mapy " +
            "FROM k_tour_headquarter.placeinfo kpi " +
            "JOIN k_tour_headquarter.contenttype kct " +
            "USING (ctNo) " +
            "JOIN k_tour_headquarter.markersgps kmg " +
            "USING (pNo) " +
            "WHERE kmg.mapx >= #{west} " +
            "AND kmg.mapx <= #{east} " +
            "AND kmg.mapy >= #{south} " +
            "AND kmg.mapy <= #{north}")
    List<MarkersGPSDto> getMarkersGpsByCurrentLatLng(Map<String, Object> coordinates);

    /**
     * 선택한 시군구에 속하는 마커를 반환하는 메소드
     *
     * @param lDongCode 시도코드 + 시군구코드가 들어있는 Map
     * @return 해당 시군구에 속한 마커 리스트
     * @author AhnJH
     */
    @Select("SELECT kpi.pNo, kmg.mapx, kmg.mapy, kmg.mkURL " +
            "FROM k_tour_headquarter.placeinfo kpi " +
            "JOIN k_tour_headquarter.ldongcode klc " +
            "USING (ldNo) " +
            "JOIN k_tour_headquarter.markersgps kmg " +
            "USING (pNo) " +
            "WHERE klc.lDongRegnCd = #{lDongRegnCd} " +
            "AND klc.lDongSignguCd = #{lDongSignguCd}")
    List<MarkersGPSDto> getMarkersGpsByCurrentLDong(Map<String, Object> lDongCode);
} // interface end
