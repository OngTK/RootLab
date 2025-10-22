package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.PlaceInfoRepeatDto;
import rootLab.model.mapper.PlaceInfoRepeatMapper;
import rootLab.model.repository.CommonRepository;

import java.util.List;

/**
 * PlaceInfoRepeat Place 반복정보
 * <p>
 * CotentTypeID : 12, 14, 15, 28, 38, 39
 * <p>
 * 25(여행코스),32(숙박)의 경우 반복정보를 사용하지 않음
 *
 * @author OngTK
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PlaceInfoRepeatService extends AbstractService<PlaceInfoRepeatDto, Integer, PlaceInfoCriteria> {

    private final PlaceInfoRepeatMapper placeInfoRepeatMapper;

    @Override
    protected CommonRepository<PlaceInfoRepeatDto, Integer, PlaceInfoCriteria> repo() {
        return placeInfoRepeatMapper;
    } // func end

    /**
     * [ PI-07 ] 플레이스 반복정보 일괄 저장
     * <p>
     * PlaceInfoRepeatDto 내의 pirStatus에 따라서 service에서 CRUD를 분산
     *
     * @author OngTK
     */
    public boolean savePlaceRepeatInfo(List<PlaceInfoRepeatDto> list) {
        int count = 0;
        for (PlaceInfoRepeatDto dto : list) {
            if (dto.getPirStatus() == 0) {          // 변경없음
            } else if (dto.getPirStatus() == 1) {   // Create
                placeInfoRepeatMapper.create(dto);
                // create 체크용
                if (dto.getPirNo() == 0) {
                    count++;
                }
            } else if (dto.getPirStatus() == 2) {   // Update
                placeInfoRepeatMapper.update(dto);
            } else if (dto.getPirStatus() == 3) {   // Delete
                placeInfoRepeatMapper.delete(dto.getPirNo());
            }
        } // for end

        // list에 든게 없는 경우도 false
        if (list.isEmpty()) return false;
        // count > 0 , 즉 저장되지 ㅇ않아서 pirNo 가 0인 경우가 1개라도 있는 경우
        if (count > 0) return false;

        return true;
    } // func end

    /***
     * [ PI-16 ] 플레이스 반복 정보 조회
     * @param pno 플레이스 번호
     * @author OngTK
     */
    public List<PlaceInfoRepeatDto> readAllToPno(int pno) {
        return placeInfoRepeatMapper.readAllToPno(pno);
    }

} // class end

