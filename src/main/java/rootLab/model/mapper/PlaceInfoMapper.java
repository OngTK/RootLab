package rootLab.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
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
            select * from placeInfo where #{pno};
            """)
    Optional<PlaceInfoDto> read(Integer pno);

    @Override
    boolean update(PlaceInfoDto placeInfoDto);

    @Override
    boolean delete(Integer pno);

    @Override
    default Page<PlaceInfoDto> findPage(PageRequest pageRequest) {
        return CommonRepository.super.findPage(pageRequest);
    }

    @Override
    int countAll();

    @Override
    List<PlaceInfoDto> findAllPaged(PageRequest pageRequest);

    @Override
    default Page<PlaceInfoDto> searchPage(PlaceInfoCriteria criteria, PageRequest pageRequest) {
        return CommonRepository.super.searchPage(criteria, pageRequest);
    }

    @Override
    int countForSearch(PlaceInfoCriteria criteria);

    @Override
    List<PlaceInfoDto> searchPaged(PlaceInfoCriteria criteria, PageRequest pageRequest);

    @Override
    List<PlaceInfoDto> search(PlaceInfoCriteria criteria);
} // class end
