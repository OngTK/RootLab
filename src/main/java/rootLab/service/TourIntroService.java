package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.PlaceInfoDto;
import rootLab.model.dto.TourIntroDto;
import rootLab.model.mapper.TourIntroMapper;
import rootLab.model.repository.CommonRepository;

/**
 * [ TourIntroService ]
 * <p>
 * 관광지 상세정보 / ContentTypeID 12 / PK 1
 * @author OngTK
 */
@Service
@RequiredArgsConstructor
public class TourIntroService extends AbstractService<TourIntroDto, Integer, PlaceInfoCriteria>  {

    private final TourIntroMapper tourIntroMapper;

    @Override
    protected CommonRepository<TourIntroDto, Integer, PlaceInfoCriteria> repo() {
        return tourIntroMapper;
    }


} // class end
