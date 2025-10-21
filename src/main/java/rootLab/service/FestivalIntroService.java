package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.FestivalIntroDto;
import rootLab.model.mapper.FestivalIntroMapper;
import rootLab.model.repository.CommonRepository;


/**
 * [ FestivalIntroService ]
 * <p>
 * 축제 상세정보 / ContentTypeID 15 / PK 3
 * @author OngTK
 */
@Service
@RequiredArgsConstructor
public class FestivalIntroService extends AbstractService<FestivalIntroDto, Integer, PlaceInfoCriteria> {

    private final FestivalIntroMapper festivalIntroMapper;

    @Override
    protected CommonRepository<FestivalIntroDto, Integer, PlaceInfoCriteria> repo() {
        return festivalIntroMapper;
    }
}
