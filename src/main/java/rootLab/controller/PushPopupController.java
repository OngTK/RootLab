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

    //1. 검색
    @GetMapping("/search")
    public ResponseEntity<List<PushPopupDto>> searchPush(
            @RequestParam(required = false) Integer pNo,
            @RequestParam(required = false) String ppType,
            @RequestParam(required = false , name = "ppTitle") String ppTitleLike
    ){
        return ResponseEntity.ok(pushPopupService.searchPush(pNo, ppType, ppTitleLike));
    }

    //2. 등록
    @PostMapping("/add")
    public ResponseEntity<Boolean> addPush(@RequestBody PushPopupDto dto){
        boolean ok = pushPopupService.addPush(dto);
        return ResponseEntity.ok(ok);
    }

    //3. 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> deletePush(@RequestParam int ppNo){
        boolean ok = pushPopupService.deletePush(ppNo);
        return ResponseEntity.ok(ok);
    }

    //4. 수정
    @PutMapping("/update")
    public ResponseEntity<Boolean> updatePush(@RequestBody PushPopupDto dto){
        boolean ok = pushPopupService.updatePush(dto);
        return ResponseEntity.ok(ok);
    }

}
