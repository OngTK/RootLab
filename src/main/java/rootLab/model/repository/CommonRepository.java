package rootLab.model.repository;

import rootLab.util.pagenation.Page;
import rootLab.util.pagenation.PageRequest;
import rootLab.util.search.BaseCriteria;

import java.util.List;
import java.util.Optional;

/**
 * CommonRepository
 * <p>
 * 반복 CRUD 메소드의 코드를 단축시키기 위한 공통 인터페이스
 * <p>
 * @author OngTK
 * @since 2025.10.08
 * @param <T> Dto
 * @param <ID> PK
 * @param <C> 검색 관련 매개변수
 */
public interface CommonRepository<T, ID, C extends BaseCriteria> {

    // CRUD ================================================================
    /**
     * [1] 생성
     */
    int create(T entity);

    /**
     * [2.1] 전체 조회 - 검색X, pageX
     */
    List<T> readAll();

    /**
     * [2.2] 개별 조회
     * <p>
     * Optional
     * <p>
     * null이 올 수 있는 값을 감싸는 Wrapper 클래스로,
     * 참조하더라도 NPE(NullPointerException)가 발생하지 않도록 도와줌
     * */
    Optional<T> read(ID id);

    /**
     * [3] 수정
     */
    boolean update(T entity);

    /**
     * [4] 삭제
     */
    boolean delete(ID id);


    // [2.3] 전체조회 결과 개수
    int countAll();



    // Search ================================================================
    // [5] 검색 조회
    List<T> search(C criteria);

    // [6] 검색 결과 수
    int countForSearch(C criteria);

    // Page ================================================================
    // [7] 페이지네이션 래퍼 
    default Page<T> findPage(PageRequest pageRequest) {
        int total = countAll();
        List<T> content = findAllPaged(pageRequest);
        return new Page<>(content, total, pageRequest.getPage(), pageRequest.getSize());
    }
    // [8] 페이지네이션 래퍼 
    default Page<T> searchPage(C criteria, PageRequest pageRequest) {
        int total = countForSearch(criteria);
        List<T> content = searchPaged(criteria, pageRequest);
        return new Page<>(content, total, pageRequest.getPage(), pageRequest.getSize());
    }

    // [9] 페이지 정보 생성
    List<T> findAllPaged(PageRequest pageRequest);
    
    // [10] 페이지 정보 검색
    List<T> searchPaged(C criteria, PageRequest pageRequest);
}
