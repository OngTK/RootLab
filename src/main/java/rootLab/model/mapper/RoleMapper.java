package rootLab.model.mapper;

import org.apache.ibatis.annotations.*;
import rootLab.model.criteria.RoleCriteria;
import rootLab.model.dto.RoleDto;
import rootLab.model.repository.CommonRepository;
import rootLab.sqlProvider.RoleSqlProvider;
import rootLab.util.pagenation.PageRequest;

import java.util.List;
import java.util.Optional;

@Mapper
public interface RoleMapper extends CommonRepository<RoleDto, Integer, RoleCriteria> {

    /**
     * [1] 생성
     * <p>
     * option annotation
     * useGeneratedKeys = true : 자동 생성된 키를 반환 받을 것인가 / keyProperty = PK를 삽입할 dto의 멤버변수
     * 결론 : PK 값은 매개변수로 들어온 roleDto 의 rtNo에 삽입됨
     * */
    @Override
    @Insert("""
        INSERT INTO roletemplate (rtName, rtDescription, rtStatus, bnNo )
        VALUES ( #{rtName}, #{rtDescription}, #{rtStatus}, #{bnNo} )
    """)
    @Options(useGeneratedKeys = true, keyProperty = "rtNo")
    int create(RoleDto roleDto);

    /**
     * [2.1] 전체 조회 - 검색X, pageX
     * */
    @Override
    @Select("SELECT * FROM roletemplate")
    List<RoleDto> readAll();

    /**
     * [2.2] 개별 조회
     * */
    @Override
    @Select("SELECT * FROM roletemplate WHERE rtNo = #{id}")
    Optional<RoleDto> read(Integer id);

    /**
     * [3] 수정
     * */
    @Override
    @Update("""
        UPDATE roletemplate
        set rtName = #{rtName}, rtDescription = #{rtDescription}, rtStatus = #{rtStatus}
        WHERE rtNo = #{rtNo}
    """)
    boolean update(RoleDto roleDto);

    /**
     * [4] 삭제
     */
    @Override
    @Delete("DELETE FROM roletemplate WHERE rtNo = #{id}")
    boolean delete(Integer id);
    
    
    
    @Override
    @Select("SELECT COUNT(*) FROM roletemplate")
    int countAll();








    // --- 검색 / 페이징 ---
    @SelectProvider(type = RoleSqlProvider.class, method = "findAllPaged")
    List<RoleDto> findAllPaged(@Param("page") PageRequest page);

    @SelectProvider(type = RoleSqlProvider.class, method = "search")
    List<RoleDto> search(@Param("criteria") RoleCriteria criteria);

    @SelectProvider(type = RoleSqlProvider.class, method = "countForSearch")
    int countForSearch(@Param("criteria") RoleCriteria criteria);

    @SelectProvider(type = RoleSqlProvider.class, method = "searchPaged")
    List<RoleDto> searchPaged(@Param("criteria") RoleCriteria criteria,
                              @Param("page") PageRequest page);

} // class end
