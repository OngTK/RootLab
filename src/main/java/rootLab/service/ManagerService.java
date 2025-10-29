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
    public Page<ManagerDto> searchManagers(ManagerCriteria managerCriteria){
        // 1. 검색기준을 Mapper에게 전달하여 검색결과 받기
        List<ManagerDto> searchedManagers = managerMapper.searchManagers(managerCriteria);
        // 2. 검색결과를 토대로 Page 구성하여 반환하기
        return new Page<>(
                searchedManagers,
                searchedManagers.size(),
                managerCriteria.getPage(),
                managerCriteria.getPageSize()
        );
    } // func end
} // class end