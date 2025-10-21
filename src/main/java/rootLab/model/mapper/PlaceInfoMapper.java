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
            select * from placeInfo where pno=#{pno};
            """)
    Optional<PlaceInfoDto> read(Integer pno);

} // class end
