package rootLab.model.mapper;

import org.apache.ibatis.annotations.*;
import rootLab.model.criteria.MemberCriteria;
import rootLab.model.dto.MemberDto;
import rootLab.model.dto.PlaceInfoDto;
import rootLab.model.repository.CommonRepository;
import rootLab.util.pagenation.PageRequest;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {

    /**
     * 검색기준을 통해 검색한 결과를 반환한다.
     * @param memberCriteria 회원정보 검색기준
     * @return 검색기준에 따른 검색결과
     */
    List<MemberDto> searchMembers(MemberCriteria memberCriteria);

}// interface end