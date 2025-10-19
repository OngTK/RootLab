package rootLab.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import rootLab.model.criteria.ManagerCriteria;
import rootLab.model.dto.ManagerDto;

import java.util.List;

@Mapper
public interface ManagerMapper {
    /**
     * 검색기준을 통해 검색한 결과를 반환한다.
     * @param managerCriteria 관리자정보 검색기준
     * @return 검색기준에 따른 검색결과
     */
    // todo 제네릭을 통해 하나로 통합할 수 있을 듯?
    List<ManagerDto> searchManagers(ManagerCriteria managerCriteria);
} // interface end