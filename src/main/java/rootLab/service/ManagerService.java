package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.ManagerCriteria;
import rootLab.model.dto.ManagerDto;
import rootLab.model.mapper.ManagerMapper;
import rootLab.util.pagenation.Page;

import java.util.List;

/**
 * Manager Table과 관련된 Service
 * @author AhnJH
 */

@Service
@RequiredArgsConstructor
public class ManagerService {
    private final ManagerMapper managerMapper;

    /**
     * 검색 기준을 통해 검색한 결과를 반환한다.
     * @param managerCriteria 관리자 정보에 대한 검색 기준
     * @return 페이징처리된 검색 결과
     * @author AhnJH
     */
    public List<ManagerDto> searchManagers(ManagerCriteria managerCriteria){
        return managerMapper.searchManagers(managerCriteria);
    } // func end
} // class end