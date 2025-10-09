package rootLab.sqlProvider;

import org.apache.ibatis.annotations.Param;
import rootLab.model.criteria.RoleCriteria;
import rootLab.util.pagenation.PageRequest;
import rootLab.util.pagenation.Sort;

import java.util.Set;

/**
 * [ Role 도메인에 대한 동적 SQL Provider ]
 * <p>
 * RoleMapper에서 실행되지만, SQL문이 조건문 등을 통해 동적으로 변경될 때,
 * 메소드화 한 sql문을 정의하는 클래스
 * </p>
 *
 * @author OngTK
 * @since 2025.10.09
 */
public class RoleSqlProvider {

    /**
     * [1] 정렬을 허용할 column을 화이트리스트로 선언
     *
     * @author OngTK
     */
    private static final Set<String> ORDERABLE =
            Set.of("rtNo", "rtName", "orderBy", "rtStatus", "createDate", "updateDate");

    /**
     * [2] 검색 X, 페이지처리요청객체를 기반으로 레코드를 조회하는 SQL
     *
     * @param page 페이지 처리 요청 객체
     * @author OngTK
     */
    public static String findAllPaged(@Param("page") PageRequest page) {
        // StringBuilder = SQL 조회
        return new StringBuilder()
                .append("SELECT * FROM roletemplate ")
                // 정렬 SQL문 생성 메소드 실행
                // 아래 [7]번 참고
                .append(orderByClause(page.getSort()))
                // 페이지처리 요청객체에서 getLimit() 와 getOffset() 결과를 sql에 삽입
                .append(" LIMIT #{page.limit} OFFSET #{page.offset} ")
                // String 처리
                .toString();
    } // func end

    /**
     * [3] 검색 결과 레코드 수를 반환하는 SQL
     * whereClause()은 하단에 [6]번에서 정의
     *
     * @param criteria 검색 조건 객체
     * @author OngTK
     */
    public static String countForSearch(@Param("criteria") RoleCriteria criteria) {
        return "SELECT COUNT(*) FROM roletemplate " + whereClause(criteria);
    } // func end

    /**
     * [4] 페이지에 해당하는 레코드 조회 SQL
     *
     * @param criteria 검색 조건 객체
     * @param page     페이지 처리 요청 객체
     * @author OngTK
     */
    public static String searchPaged(@Param("criteria") RoleCriteria criteria,
                                     @Param("page") PageRequest page) {
        return new StringBuilder()
                .append("SELECT * FROM roletemplate ")
                // where sql 생성 method
                .append(whereClause(criteria))
                // sort sql 생성 method
                .append(orderByClause(page.getSort()))
                .append(" LIMIT #{page.limit} OFFSET #{page.offset} ")
                .toString();
    } // func end

    /**
     * [5] 검색O. 페이지X 조회 SQL
     *
     * @author OngTK
     */
    public static String search(@Param("criteria") RoleCriteria criteria) {
        return new StringBuilder()
                .append("SELECT * FROM roletemplate ")
                .append(whereClause(criteria))
                .append(" ORDER BY rtNo DESC ")
                .toString();
    } // func end

    /**
     * [6] 검색 조건 where sql 생성 메소드
     *
     * @param c 검색 조건 객체
     * @author OngTK
     */
    private static String whereClause(RoleCriteria c) {
        // WHERE로 시작하는 StringBuilder 객체 생성
        // where 1=1 : 무조건 참
        StringBuilder sb = new StringBuilder(" WHERE 1=1 ");
        // 검색조건객체가 null 이면, Where 1=1 을 반환
        if (c == null) return sb.toString();
        // 검색조건객체에 rtName이 존재하면
        if (c.getRtName() != null && !c.getRtName().isBlank())
            // sb에 sql 문 추가
            // CONCAT('','','') : 문자열을 합쳐줌
            sb.append(" AND rtName LIKE CONCAT('%', #{criteria.rtName}, '%') ");
        // 검색조건객체에 rtStatus가 존재하면
        if (c.getRtStatus() != null)
            // sb에 sql 문 추가
            sb.append(" AND rtStatus = #{criteria.rtStatus} ");
        // 검색조건객체에 bnNo가 존재하면
        if (c.getBnNo() != null && !c.getBnNo().isBlank())
            // sb에 sql 문 추가
            sb.append(" AND bnNo = #{criteria.bnNo} ");
        // 최종 StringBuilder 객체, 즉 SQL 문을 반환
        return sb.toString();
    } // func end

    /**
     * [7] 정렬 SQL
     *
     * @param sort 정렬 요청 객체
     * @author OngTK
     */
    private static String orderByClause(Sort sort) {
        // 정렬요청 객체가 비어으면
        if (sort == null || sort.getOrderBy() == null || !ORDERABLE.contains(sort.getOrderBy())) {
            // rtNo 기준 내림차순 정렬 SQL 문을 반환 (default)
            return " ORDER BY rtNo DESC ";
        }
        // 정렬 요청 객체가 비어있지 않으면
        // sort 객체에 direction 에 따라 DESC or ASC로 반환
        String dir = (sort.getDirection() == Sort.Direction.DESC) ? "DESC" : "ASC";
        // sort SQL 문을 반환
        return " ORDER BY " + sort.getOrderBy() + " " + dir + " ";
    } // func end

} // class end