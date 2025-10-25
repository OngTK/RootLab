package rootLab.model.mapper;

import org.apache.ibatis.annotations.*;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.PlaceInfoDto;
import rootLab.model.repository.CommonRepository;
import rootLab.util.pagenation.Page;
import rootLab.util.pagenation.PageRequest;

import java.util.List;
import java.util.Optional;

@Mapper
public interface PlaceInfoMapper extends CommonRepository<PlaceInfoDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] 생성
     * @author OngTK
     */
    @Override
    @Insert("""
            isnert into placeinfo( ctNo, ldNo , ccNo , contentid ,
            title , showflag ,firstimage,firstimage2,addr1 , addr2,
            zipcode,homepage,tel,telname,overview)
            values
            ( #{ctNo}, #{ldNo}, #{ccNo}, #{contentid}, #{title}, 
            #{showflag}, #{firstimage}, #{firstimage2}, #{addr1}, #{addr2}, 
            #{zipcode}, #{homepage}, #{tel}, #{telname}, #{overview})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "pNo")
    int create(PlaceInfoDto placeInfoDto);

    /**
     * [2.1] 전체 조회 - 검색X, pageX
     * @author OngTK
     */
    @Override
    @Select("""
            select * from placeinfo;
            """)
    List<PlaceInfoDto> readAll();

    /**
     * [2.2] 개별 조회
     * @author OngTK
     */
    @Override
    @Select("""
            SELECT kpi.*, kcc.lclsSystm2Nm, kcc.lclsSystm3Nm
            	FROM k_tour_headquarter.placeinfo kpi
                JOIN k_tour_headquarter.categorycode kcc
                USING (ccNo)
                WHERE kpi.pno = #{pno};
            """)
    Optional<PlaceInfoDto> read(Integer pno);
    
    /**
     * [4] 수정
     */
    @Update("""
        UPDATE placeInfo
           SET ctNo=#{ctNo}, ldNo=#{ldNo}, ccNo=#{ccNo}, isEditable=#{isEditable},
               contentid=#{contentid}, title=#{title}, showflag=#{showflag},
               addr1=#{addr1}, addr2=#{addr2}, zipcode=#{zipcode}, homepage=#{homepage},
               tel=#{tel}, telname=#{telname}, overview=#{overview}
         WHERE pNo=#{pNo}
    """)
    boolean update(PlaceInfoDto dto);

    // Page · Search ================================================================

    /**
     * [3.1] 전체조회 레코드 수
     * @author OngTK
     */
    @Override
    @Select("""
            select count(*) from placeinfo;
            """)
    int countAll();

    /**
     * [3.2] 페이지 처리 요청
     */
    @Override
    List<PlaceInfoDto> findAllPaged(PageRequest pageRequest);
    
    /**
     * [3.3] 검색결과 레코드를 반환
     */
    @Override
    int countForSearch(PlaceInfoCriteria criteria);

    /**
     * [3.4] 페이지에 해당하는 레코드를 List로 반환
     */
    @Override
    List<PlaceInfoDto> searchPaged(@Param("criteria") PlaceInfoCriteria criteria,
                                   @Param("page") PageRequest pageRequest);;


} // class end
