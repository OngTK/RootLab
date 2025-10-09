package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.RoleCriteria;
import rootLab.model.dto.RoleDto;
import rootLab.model.mapper.RoleMapper;
import rootLab.model.repository.CommonRepository;

@Service
@RequiredArgsConstructor
public class RoleService extends AbstractService<RoleDto, Integer, RoleCriteria> {

    private final RoleMapper roleMapper;

    /**
     * [1] AbstractService 의 추상메소드를 구현
     *
     * @return roleMapper : Service 에서 별도의 비지니스 로직이 없을 경우 바로 Mapper 로 연결
     * @author OngTK
     */
    protected CommonRepository<RoleDto, Integer, RoleCriteria> repo() {
        return roleMapper;
    }  // func end

} // class end
