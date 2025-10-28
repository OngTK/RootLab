package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.criteria.MemberCriteria;
import rootLab.model.dto.MemberDto;
import rootLab.model.mapper.MemberMapper;
import rootLab.util.pagenation.Page;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper memberMapper;
    /**
     * 검색 기준을 통해 검색한 결과를 반환한다.
     * @param MemberCriteria 회원 정보에 대한 검색 기준
     * @return 페이징처리된 검색 결과
     * @author KimJS
     */
    public Page<MemberDto> searchMembers(MemberCriteria MemberCriteria){
        // 1. 검색기준을 Mapper에게 전달하여 검색결과 받기
        List<MemberDto> searchedMembers = memberMapper.searchMembers(MemberCriteria);
        // 2. 검색결과를 토대로 Page 구성하여 반환하기
        return new Page<>(
                searchedMembers,
                searchedMembers.size(),
                MemberCriteria.getPage(),
                MemberCriteria.getPageSize()
        );
    } // func end
    
}//class end
