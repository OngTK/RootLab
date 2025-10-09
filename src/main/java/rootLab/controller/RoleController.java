package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rootLab.model.criteria.RoleCriteria;
import rootLab.model.dto.RoleDto;
import rootLab.service.RoleService;
import rootLab.util.pagenation.Page;
import rootLab.util.pagenation.PageRequest;
import rootLab.util.pagenation.Sort;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    /**
     * [1] 생성
     *
     * @param dto talbe에 삽입하려는 dto
     * @author OngTk
     */
    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody RoleDto dto) {
        // 결과값 초기화
        int result = 0;
        try {
            // service에 insert 실행
            // 반환값 PK
            result = roleService.create(dto);
            // pk가 0, 즉 삽입을 실패하면
            if (result == 0) {
                // 560 반환
                return ResponseEntity.status(560).body(result);
            } else {
                // PK가 존재하면
                return ResponseEntity.ok(result);
            }
        } catch (Exception e) {
            // 예외 발생시 460 반환
            return ResponseEntity.status(460).body(result);
        }
    } // func end

    /**
     * [2.1] 전체 조회 - 검색X, pageX
     *
     * @author OngTk
     */
    @GetMapping
    public ResponseEntity<List<RoleDto>> readAll() {
        try {
            // service의 findAll 실행
            // 반환값 List<RoleDto>
            List<RoleDto> result = roleService.readAll();
            // 결과 반환
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            // 예외 발생시 460 반환
            return ResponseEntity.status(460).body(null);
        }
    } // func end

    /**
     * [2.2] 개별 조회
     *
     * @param rtNo : 조회하려는 pk
     *             "@OOOMapping(/{ })" : 일반적으로 사용하는 queryString 방식이 아닌 "/api/roles/2000001"와 같이 바로 URL에 매개변수를 작성하는 방법
     *             "@PathVariable" : URL의 마지막 값을 매개변수 값으로 가져옴
     * @author OngTk
     */
    @GetMapping("/{rtNo}")
    public ResponseEntity<RoleDto> read(@PathVariable int rtNo) {
        try {
            // service에 read 실행
            // 반환 Optional<RoleDto>
            Optional<RoleDto> result = roleService.read(rtNo);

            return result
                    // result 가 정상적으로 존재한다면 ok와 함께 result를 반환
                    .map(ResponseEntity::ok)
                    // result 가 존재하지 않으면 460을 반환
                    .orElse(ResponseEntity.status(460).build());
        } catch (Exception e) {
            // 예외 발생시 560 반환
            return ResponseEntity.status(560).body(null);
        }
    } // func end

    /**
     * [3] 수정
     *
     * @param dto 수정하려는 내용
     * @author OngTK
     */
    @PutMapping
    public ResponseEntity<Boolean> update(@RequestBody RoleDto dto) {
        // service 에 update 실행
        // 반환 T/F
        boolean result = roleService.update(dto);
        return (result)
                // 성공 시 ok(200) 에 true 반환
                ? ResponseEntity.ok(result)
                // 실패 시 460과  false 반환
                : ResponseEntity.status(460).body(result);
    } // func end

    /**
     * [4] 삭제
     *
     * @param rtNo 삭제 대상 PK
     * @author OngTK
     */
    @DeleteMapping("/{rtNo}")
    public ResponseEntity<Boolean> delete(@PathVariable int rtNo) {
        // service 의 delete 실행
        // 반환타입 T/F
        boolean result = roleService.delete(rtNo);
        return (result)
                // 성공 시
                ? ResponseEntity.ok(result)
                // 실패 시 460과  false 반환
                : ResponseEntity.status(460).body(result);
    } // func end

    // Page · Search ================================================================

    /**
     * [5] 검색 + 페이지네이션
     *
     * @param page      조회할 현재 페이지
     * @param size      한 페이지 당 게시물 수
     * @param orderBy   정렬 기준_column
     * @param direction 정렬 방향, ASC / DESC
     * @param rtName    검색할 rtName
     * @param rtStatus  검색할 상태값
     * @param bnNo      검색할 비즈니스 번호
     * @author OngTK
     */
    @GetMapping("/search")
    public Page<RoleDto> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) Sort.Direction direction,
            @RequestParam(required = false) String rtName,
            @RequestParam(required = false) Integer rtStatus,
            @RequestParam(required = false) String bnNo
    ) {
        System.out.println("page = " + page + ", size = " + size + ", orderBy = " + orderBy + ", direction = " + direction + ", rtName = " + rtName + ", rtStatus = " + rtStatus + ", bnNo = " + bnNo);

        // 페이지 처리를 위한 객체 PageRequest pr 생성
        // PageRequest(page, size, sort)
        PageRequest pr = new PageRequest(page, size,
                // Sort 객체 생성
                // orderBy와 direction이 null이 아니면
                (orderBy != null && direction != null)
                        // Sort 객체 생성
                        ? new Sort(orderBy, direction)
                        // Sort를 null로 처리
                        : null);

        // 매개변수 중 검색조건을 이용한 "역할 검색 객체" RoleCriteria 를 생성
        RoleCriteria criteria = new RoleCriteria();
        // 역할검색객체에 검색 조건 rtName, rtStatus, bnNo 삽입
        criteria.setRtName(rtName);
        criteria.setRtStatus(rtStatus);
        criteria.setBnNo(bnNo);

        // 검색 조건에 공란 여부에 따라 boolean 판단
        // T : 검색 조건 3개 중 하나라도 공란이 아니다.
        // F : 검색 조건 3개 모두 공란이다.
        boolean hasFilter =
                (rtName != null && !rtName.isBlank()) ||
                        (rtStatus != null) ||
                        (bnNo != null && !bnNo.isBlank());

        // 검색조건 공란 여부에 따른, 결과를 반환
        return hasFilter
                // true 이면 searchPage 실행 = 검색 O + 페이지 처리 O
                // 매개변수 = 역할 검색 객체, 페이지 요청 객체
                ? roleService.searchPage(criteria, pr)
                // false 이면 findPage 실행
                // 매개변수 = 페이지 요청 객체 = 검색 X + 페이지 처리 O
                : roleService.findPage(pr);
    } // func end
} // class end
