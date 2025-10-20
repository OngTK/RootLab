package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rootLab.model.dto.PushPopupDto;
import rootLab.service.PushPopupService;

import java.util.List;

@RestController
@RequestMapping("/push")
@RequiredArgsConstructor
public class PushPopupController {

    private final PushPopupService pushPopupService;

    /**
     * 1. 검색
     * [(place번호), (카테고리), (제목)]를 입력받아, 해당하는 푸시알림팝업을 조회한다.
     * @param pNo
     * @param ppType
     * @param ppTitle
     * @return 검색결과
     * @author juju9595
     */
    @PostMapping("/search")
    public ResponseEntity<List<PushPopupDto>> searchPush(
            @RequestParam(required = false) Integer pNo,
            @RequestParam(required = false) String ppType,
            @RequestParam(required = false , name = "ppTitle") String ppTitle
    ){
        return ResponseEntity.ok(pushPopupService.searchPush(pNo, ppType, ppTitle));
    }

    /**
     * 2. 등록
     *
     * @author juju9595
     */
    @PostMapping("/add")
    public ResponseEntity<?> addPush(@RequestBody PushPopupDto pushPopupDto){
        int result = pushPopupService.addPush(pushPopupDto);
        return ResponseEntity.ok(result);
    }

    /**
     * 3. 삭제
     *
     * @author juju9595
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> deletePush(@RequestParam int ppNo){
        boolean result = pushPopupService.deletePush(ppNo);
        return ResponseEntity.ok(result);
    }

    /**
     * 4. 수정
     *
     * @author juju9595
     */
    @PutMapping("/update")
    public ResponseEntity<Boolean> updatePush(@RequestBody PushPopupDto dto){
        boolean result = pushPopupService.updatePush(dto);
        return ResponseEntity.ok(result);
    }

}
