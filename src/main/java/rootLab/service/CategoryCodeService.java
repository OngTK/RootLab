package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.CategoryCodeDto;
import rootLab.model.mapper.CategoryCodeMapper;
import rootLab.model.repository.CommonRepository;

import java.util.List;

/**
 * [ 카테고리 코드 ]
 * 3단계로 구분한 카테고리
 * @author OngTK
 */

@Service
@RequiredArgsConstructor
public class CategoryCodeService extends AbstractService<CategoryCodeDto, Integer, PlaceInfoCriteria> {

    private final CategoryCodeMapper categoryCodeMapper;

    @Override
    protected CommonRepository<CategoryCodeDto, Integer, PlaceInfoCriteria> repo() {
        return categoryCodeMapper;
    }

} // class end
