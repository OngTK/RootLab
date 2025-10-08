package rootLab.service;

import org.springframework.transaction.annotation.Transactional;
import rootLab.model.repository.CommonRepository;
import rootLab.util.pagenation.Page;
import rootLab.util.pagenation.PageRequest;
import rootLab.util.search.BaseCriteria;

import java.util.List;
import java.util.Optional;

/**
 * [ Service 공통 상위 추상 Class ]
 * <p>
 * CommonRepository 인터페이스를 주입받아 func 구현
 * <p>
 * 모든 호출을 repo()에 위임받음
 *
 * @author OngTK
 */
public abstract class AbstractService<T, ID, C extends BaseCriteria>
        implements CommonRepository<T, ID, C> {

    /**
     * [0] repo 추상 메소드
     * <p>
     * 각 Service 에서 repo()를 override 하여 각 Mapper에 연결되도록 선언하면,
     * 아래의 Override된 메소드를 이용하여 메소드가 실행
     * 추상 메소드
     */
    protected abstract CommonRepository<T, ID, C> repo();

    // CRUD ========================================================

    /**
     * [1.1] 생성
     * @param entity Dto
     */
    @Override
    @Transactional
    public int create(T entity) {
        repo().create(entity);
        return getGeneratedKey(entity);
    } // func end

    /**
     * [1.1] insert 후 PK 값을 추출하는 메소드
     * INSERT 이후 MyBatis가 DTO의 PK 필드(rtNo 등)에 채워 넣은 값을 꺼내 int로 반환
     * @param entity INSERT가 끝난 도메인 객체. MyBatis가 keyProperty에 지정한 필드에 PK가 삽입되어 있음
     * @return 생성된 PK(숫자). 찾지 못하면 0을 반환
     * @author OngTK
     */
    private int getGeneratedKey(T entity) {
        // List에 도메인별 PK 멤버변수 명을 작성
        // pk 명을 하나씩 keyName 으로 추출하여 반복문 실행
        for (String keyName : List.of("rtNo")) {
            try {
                // 리플렉션으로 entity 내에 PK명이 일치하는 "선언된 필드"를 조회
                var f = entity.getClass().getDeclaredField(keyName);
                // private/protected 필드 접근을 허용하도록 접근 제어를 해제
                f.setAccessible(true);
                // entity 인스턴스에서 해당 필드(pk명)의 현재 값을 읽어옴
                // Object로 반환
                Object val = f.get(entity);
                // 읽어온 값이 숫자 타입(Integer, Long 등 Number의 하위 타입)이면 int로 변환해 즉시 반환
                if (val instanceof Number) return ((Number) val).intValue();
            } catch (Exception ignore) {
                // 예외를 무시하고 다음 pk명에 대해서 조회
            }
        }
        // 모든 후보 필드에서 숫자 값을 찾지 못한 경우 기본값 0을 반환합니다.
        return 0;
    } // func end

    /**
     * [2.1] 전체조회
     * @author OngTK
     * */
    @Override
    @Transactional(readOnly = true)
    public List<T> readAll() {
        return repo().readAll();
    } // func end
    
    /**
     * [2.2] 개별조회
     * @author OngTK
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<T> read(ID id) {
        return repo().read(id);
    } // func end

    /**
     * [3] 수정
     * @author OngTK
     */
    @Override
    @Transactional
    public boolean update(T entity) {
        return repo().update(entity);
    } // func end

    /**
     * [4] 삭제
     * @author OngTK
     */
    @Override
    @Transactional
    public boolean delete(ID id) {
        return repo().delete(id);
    } // func end


    @Override
    @Transactional(readOnly = true)
    public int countAll() {
        return repo().countAll();
    } // func end

    // Search ========================================================

    @Override
    @Transactional(readOnly = true)
    public List<T> search(C criteria) {
        return repo().search(criteria);
    } // func end

    @Override
    @Transactional(readOnly = true)
    public int countForSearch(C criteria) {
        return repo().countForSearch(criteria);
    } // func end

    @Override
    @Transactional(readOnly = true)
    public List<T> findAllPaged(PageRequest pageRequest) {
        return repo().findAllPaged(pageRequest);
    } // func end

    // Page ========================================================

    @Override
    @Transactional(readOnly = true)
    public List<T> searchPaged(C criteria, PageRequest pageRequest) {
        return repo().searchPaged(criteria, pageRequest);
    } // func end

    @Override
    @Transactional(readOnly = true)
    public Page<T> findPage(PageRequest pageRequest) {
        return repo().findPage(pageRequest);
    } // func end

    @Override
    @Transactional(readOnly = true)
    public Page<T> searchPage(C criteria, PageRequest pageRequest) {
        return repo().searchPage(criteria, pageRequest);
    } // func end
} // class end