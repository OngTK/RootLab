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
     * @param rtNo : 조회하려는 pk
     *              "@OOOMapping(/{ })" : 일반적으로 사용하는 queryString 방식이 아닌 "/api/roles/2000001"와 같이 바로 URL에 매개변수를 작성하는 방법
     *              "@PathVariable" : URL의 마지막 값을 매개변수 값으로 가져옴
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
        } catch (Exception e){
            // 예외 발생시 560 반환
            return ResponseEntity.status(560).body(null);
        }
    }

    /**
     * [3] 수정
     * @param dto 수정하려는 내용
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
    }

    /**
     * [4] 삭제
     * @param rtNo 삭제 대상 PK
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
    }

    // 목록: 조건부 검색 + 페이지네이션
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
        PageRequest pr = new PageRequest(page, size,
                (orderBy != null && direction != null) ? new Sort(orderBy, direction) : null);

        RoleCriteria criteria = new RoleCriteria();
        criteria.setRtName(rtName);
        criteria.setRtStatus(rtStatus);
        criteria.setBnNo(bnNo);

        boolean hasFilter =
                (rtName != null && !rtName.isBlank()) ||
                        (rtStatus != null) ||
                        (bnNo != null && !bnNo.isBlank());

        return hasFilter
                ? roleService.searchPage(criteria, pr)
                : roleService.findPage(pr);
    }








}
