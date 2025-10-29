package rootLab.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.RestaurantIntroDto;
import rootLab.model.dto.TourIntroDto;
import rootLab.model.mapper.TourIntroMapper;
import rootLab.model.repository.CommonRepository;

/**
 * [ TourIntroService ]
 * <p>
 * 관광지 상세정보 / ContentTypeID 12 / PK 1
 *
 * @author OngTK
 */
@Service
@RequiredArgsConstructor
@Log4j2
public class TourIntroService extends AbstractService<TourIntroDto, Integer, PlaceInfoCriteria> {

    private final TourIntroMapper tourIntroMapper;

    @Override
    protected CommonRepository<TourIntroDto, Integer, PlaceInfoCriteria> repo() {
        return tourIntroMapper;
    }

    /**
     * [ TI-01 ] 관광지 상세정보 저장
     * <p>
     * tiStatus 에 따라서 service에서 C/U를 수행
     * <p>
     * C 1 / U 2
     *
     * @author OngTK
     */
    public boolean saveTourIntro(TourIntroDto dto) {
        if (dto.getTiStatus() == 0) {             // 변경없음
        } else if (dto.getTiStatus() == 1) {      // Create
            tourIntroMapper.create(dto);
            if (dto.getTiNo() > 0) {
                return true;
            } else {
                return false;
            }
        } else if (dto.getTiStatus() == 2) {      // Update
            tourIntroMapper.update(dto);
            return true;
        }
        return false;
    } // func end

} // class end
