package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.dto.PushPopupDto;
import rootLab.model.mapper.PushPopupMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PushPopupService {

    private final PushPopupMapper pushPopupMapper;

    //1. 검색
    public List<PushPopupDto> searchPush(Integer pNo, String ppType, String ppTitle){
        return pushPopupMapper.searchPush(pNo, ppType, ppTitle);
    }

    //2. 등록
    public boolean addPush(PushPopupDto dto){
        return pushPopupMapper.insertPush(dto) > 0;
    }

    //3. 삭제
    public boolean deletePush(int ppNo){
        return pushPopupMapper.deletePush(ppNo) > 0;
    }

    //4. 수정
    public boolean updatePush(PushPopupDto dto){
        if(dto.getPpNo() == 0) return false; // 키 누락 방지
        return pushPopupMapper.updatePush(dto) > 0;
    }

}
