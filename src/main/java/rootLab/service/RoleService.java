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

    protected CommonRepository<RoleDto, Integer, RoleCriteria> repo() {
        return roleMapper;
    }  // func end

} // class end
