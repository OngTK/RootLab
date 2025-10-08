package rootLab.sqlProvider;

import org.apache.ibatis.annotations.Param;
import rootLab.model.criteria.RoleCriteria;
import rootLab.util.pagenation.PageRequest;
import rootLab.util.pagenation.Sort;

import java.util.Set;

public class RoleSqlProvider {

    private static final Set<String> ORDERABLE =
            Set.of("rtNo","rtName","createDate","updateDate");

    private static String orderByClause(Sort sort) {
        if (sort == null || sort.getOrderBy() == null || !ORDERABLE.contains(sort.getOrderBy())) {
            return " ORDER BY rtNo DESC ";
        }
        String dir = (sort.getDirection() == Sort.Direction.DESC) ? "DESC" : "ASC";
        return " ORDER BY " + sort.getOrderBy() + " " + dir + " ";
    }

    private static String whereClause(RoleCriteria c) {
        StringBuilder sb = new StringBuilder(" WHERE 1=1 ");
        if (c == null) return sb.toString();
        if (c.getRtName() != null && !c.getRtName().isBlank())
            sb.append(" AND rtName LIKE CONCAT('%', #{criteria.rtName}, '%') ");
        if (c.getRtStatus() != null)
            sb.append(" AND rtStatus = #{criteria.rtStatus} ");
        if (c.getBnNo() != null && !c.getBnNo().isBlank())
            sb.append(" AND bnNo = #{criteria.bnNo} ");
        return sb.toString();
    }

    // ✅ Mapper @Param("page")와 이름 일치
    public static String findAllPaged(@Param("page") PageRequest page) {
        return new StringBuilder()
                .append("SELECT rtNo, bnNo, rtName, rtDescription, rtStatus, createDate, updateDate ")
                .append("FROM roletemplate ")
                .append(orderByClause(page.getSort()))
                .append(" LIMIT #{page.limit} OFFSET #{page.offset} ")
                .toString();
    }

    public static String search(@Param("criteria") RoleCriteria criteria) {
        return new StringBuilder()
                .append("SELECT rtNo, bnNo, rtName, rtDescription, rtStatus, createDate, updateDate ")
                .append("FROM roletemplate ")
                .append(whereClause(criteria))
                .append(" ORDER BY rtNo DESC ")
                .toString();
    }

    public static String countForSearch(@Param("criteria") RoleCriteria criteria) {
        return "SELECT COUNT(*) FROM roletemplate " + whereClause(criteria);
    }

    public static String searchPaged(@Param("criteria") RoleCriteria criteria,
                                     @Param("page") PageRequest page) {
        return new StringBuilder()
                .append("SELECT rtNo, bnNo, rtName, rtDescription, rtStatus, createDate, updateDate ")
                .append("FROM roletemplate ")
                .append(whereClause(criteria))
                .append(orderByClause(page.getSort()))
                .append(" LIMIT #{page.limit} OFFSET #{page.offset} ")
                .toString();
    }
}