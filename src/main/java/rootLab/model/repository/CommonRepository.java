package rootLab.model.repository;

import java.util.List;
import java.util.Optional;

/**
 * CommonRepository
 * <p>
 * 반복 CRUD 메소드의 코드를 단축시키기 위한 공통 인터페이스
 * <p>
 * @author OngTK
 * @since 2025.10.08
 */

public interface CommonRepository<T, ID> {

    // [0.1] 생성
    int insert(T entity);

    // [0.2.1] 개별 조회
    Optional<T> findById(ID id);

    // [0.2.2] 전체 조회
    List<T> findAll();

    // [0.3] 수정
    int update(T entity);

    // [0.4] 삭제
    int deleteById(ID id);

    // 선택: 페이지네이션 시그니처
    List<T> findPage(int offset, int limit);
    long countAll();
}
