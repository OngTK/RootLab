package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.CategoryCodeDto;
import rootLab.model.repository.CommonRepository;

import java.util.List;

@Mapper
public interface CategoryCodeMapper extends CommonRepository<CategoryCodeDto, Integer, PlaceInfoCriteria> {

    @Select("""
            select * from categorycode;
            """)
    @Override
    List<CategoryCodeDto> readAll();

} // interface end
