package rootLab.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.PlaceImageDetailDto;
import rootLab.model.mapper.PlaceImageDetailMapper;
import rootLab.model.repository.CommonRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceImageDetailService extends AbstractService<PlaceImageDetailDto, Integer, PlaceInfoCriteria> {

    private final PlaceImageDetailMapper placeImageDetailMapper;

    @Override
    protected CommonRepository<PlaceImageDetailDto, Integer, PlaceInfoCriteria> repo() {
        return placeImageDetailMapper;
    }

    @Transactional
    public void bulkInsertWithSerial(List<PlaceImageDetailDto> rows){
        if (rows == null || rows.isEmpty()) return;
        Integer pNo = rows.get(0).getPNo();
        int max = placeImageDetailMapper.findMaxSerial(pNo); // 없으면 -1
        int serial = (max < 0 ? 0 : max + 1);
        int i = 0;
        for (PlaceImageDetailDto d : rows) {
            if (d.getSerialnum() == null || d.getSerialnum().isBlank()) {
                d.setSerialnum(String.valueOf(serial + i));
            }
            i++;
        }
        placeImageDetailMapper.bulkInsert(rows);
    }

} // func end
