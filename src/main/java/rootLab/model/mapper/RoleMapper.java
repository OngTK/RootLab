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
     *
     * @author OngTK
     */
    @Override
    @Insert("""
                INSERT INTO roletemplate (rtName, rtDescription, rtStatus, bnNo )
                VALUES ( #{rtName}, #{rtDescription}, #{rtStatus}, #{bnNo} )
            """)
    @Options(useGeneratedKeys = true, keyProperty = "rtNo")
    int create(RoleDto roleDto);

    /**
     * [2.1] 전체 조회 - 검색X, pageX
     *
     * @author OngTK
     */
    @Override
    @Select("SELECT * FROM roletemplate")
    List<RoleDto> readAll();

    /**
     * [2.2] 개별 조회
     *
     * @author OngTK
     */
    @Override
    @Select("SELECT * FROM roletemplate WHERE rtNo = #{id}")
    Optional<RoleDto> read(Integer id);

    /**
     * [3] 수정
     *
     * @author OngTK
     */
    @Override
    @Update("""
                UPDATE roletemplate
                set rtName = #{rtName}, rtDescription = #{rtDescription}, rtStatus = #{rtStatus}
                WHERE rtNo = #{rtNo}
            """)
    boolean update(RoleDto roleDto);

    /**
     * [4] 삭제
     *
     * @author OngTK
     */
    @Override
    @Delete("DELETE FROM roletemplate WHERE rtNo = #{id}")
    boolean delete(Integer id);

    // Page · Search ================================================================

    /**
     * [5.1] 전체조회 레코드 수
     *
     * @author OngTK
     */
    @Override
    @Select("SELECT COUNT(*) FROM roletemplate")
    int countAll();

    /**
     * [5.2] 페이지 처리 요청 후 해당 레코드만 List로 반환
     * RoleSqlProvider 클래스의 findAllPaged method 에서 sql을 생성
     *
     * @param page 페이지 처리 요청 객체
     * @SelectProvider - 동적 provider class를 지정하고, 해당하는 method를 지정
     * - 따라서, countForSearch를 통해 질행할 sql 을 [ RoleSqlProvider ]에서 정의
     * @author OngTK
     */
    @SelectProvider(type = RoleSqlProvider.class, method = "findAllPaged")
    List<RoleDto> findAllPaged(@Param("page") PageRequest page);

    /**
     * [6.1] 검색 결과 레코드 수를 반환
     *
     * @param criteria 검색 조건 객체
     * @author OngTK
     */
    @SelectProvider(type = RoleSqlProvider.class, method = "countForSearch")
    int countForSearch(@Param("criteria") RoleCriteria criteria);

    /**
     * [6.2] 페이지에 해당하는 레코드를 List로 반환
     *
     * @param page     페이지처리 요청 객체
     * @param criteria 검색 조건 객체
     * @author OngTK
     */
    @SelectProvider(type = RoleSqlProvider.class, method = "searchPaged")
    List<RoleDto> searchPaged(@Param("criteria") RoleCriteria criteria,
                              @Param("page") PageRequest page);

    /**
     * [7] 검색 O + 페이지 처리 X
     *
     * @param criteria 검색 조건 객체
     * @author OngTK
     */
    @SelectProvider(type = RoleSqlProvider.class, method = "search")
    List<RoleDto> search(@Param("criteria") RoleCriteria criteria);

} // interface end
